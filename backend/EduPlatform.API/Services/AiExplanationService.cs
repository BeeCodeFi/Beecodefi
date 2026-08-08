using EduPlatform.API.DTOs;
using System.Text.Json;

namespace EduPlatform.API.Services;

public class AiExplanationService : IAiExplanationService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public AiExplanationService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<AiExplanationResponseDto> GenerateExplanationAsync(AiExplanationDto dto)
    {
        // Check if OpenAI API key is configured
        var apiKey = _configuration["OpenAI:ApiKey"];
        
        if (!string.IsNullOrEmpty(apiKey))
        {
            return await GenerateOpenAIExplanationAsync(dto, apiKey);
        }
        
        // Fallback to mock responses if no API key
        return GenerateMockExplanation(dto);
    }

    private async Task<AiExplanationResponseDto> GenerateOpenAIExplanationAsync(AiExplanationDto dto, string apiKey)
    {
        try
        {
            var request = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new
                    {
                        role = "system",
                        content = "You are a helpful programming tutor. Provide clear, concise explanations with code examples. Focus on practical understanding."
                    },
                    new
                    {
                        role = "user",
                        content = $"Context: {dto.Context}\n\nQuestion: {dto.Question}\n\nProvide a clear explanation with a code example."
                    }
                },
                max_tokens = 500,
                temperature = 0.7
            };

            var jsonRequest = JsonSerializer.Serialize(request);
            var content = new StringContent(jsonRequest, System.Text.Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            
            if (!response.IsSuccessStatusCode)
            {
                // Fallback to mock if API fails
                return GenerateMockExplanation(dto);
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<JsonElement>(jsonResponse);
            
            var explanation = result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
            
            return new AiExplanationResponseDto
            {
                Explanation = explanation ?? "I apologize, but I couldn't generate an explanation at this time.",
                CodeExample = ExtractCodeExample(explanation ?? ""),
                RelatedTopics = ExtractRelatedTopics(dto.Question)
            };
        }
        catch
        {
            // Fallback to mock on any error
            return GenerateMockExplanation(dto);
        }
    }

    private AiExplanationResponseDto GenerateMockExplanation(AiExplanationDto dto)
    {
        // Generate contextual mock responses based on the question
        var questionLower = dto.Question.ToLower();
        string explanation = "";
        string codeExample = "";

        if (questionLower.Contains("react") || questionLower.Contains("hook"))
        {
            explanation = "React Hooks are functions that let you use state and other React features in functional components. The most common hooks are useState for managing component state and useEffect for handling side effects like data fetching or subscriptions.";
            codeExample = "const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);";
        }
        else if (questionLower.Contains("async") || questionLower.Contains("await"))
        {
            explanation = "Async/await is a syntax for handling asynchronous operations in JavaScript. The 'async' keyword marks a function as asynchronous, and 'await' pauses the execution until a Promise is resolved. This makes asynchronous code look and behave more like synchronous code.";
            codeExample = "async function fetchData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}";
        }
        else if (questionLower.Contains("array") || questionLower.Contains("map") || questionLower.Contains("filter"))
        {
            explanation = "Array methods like map(), filter(), and reduce() are powerful tools for transforming and manipulating arrays in JavaScript. Map creates a new array by transforming each element, filter creates a new array with elements that pass a test, and reduce reduces an array to a single value.";
            codeExample = "const numbers = [1, 2, 3, 4, 5];\n\n// Map: double each number\nconst doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]\n\n// Filter: get even numbers\nconst evens = numbers.filter(n => n % 2 === 0); // [2, 4]\n\n// Reduce: sum all numbers\nconst sum = numbers.reduce((acc, n) => acc + n, 0); // 15";
        }
        else if (questionLower.Contains("css") || questionLower.Contains("flexbox") || questionLower.Contains("grid"))
        {
            explanation = "CSS Flexbox and Grid are powerful layout systems. Flexbox is designed for one-dimensional layouts (rows or columns), while Grid is designed for two-dimensional layouts (rows and columns together). Flexbox excels at aligning items and distributing space, while Grid provides precise control over layout structure.";
            codeExample = "/* Flexbox Example */\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n/* Grid Example */\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}";
        }
        else
        {
            explanation = $"Based on your question about \"{dto.Question}\", here's a helpful explanation: This concept is fundamental to modern web development. Understanding this will help you write more efficient and maintainable code. The key is to practice and apply these concepts in real projects.";
            codeExample = "// Example implementation\nfunction solution(input) {\n  // Your logic here\n  return result;\n}";
        }

        return new AiExplanationResponseDto
        {
            Explanation = explanation,
            CodeExample = codeExample,
            RelatedTopics = ExtractRelatedTopics(dto.Question)
        };
    }

    private string ExtractCodeExample(string explanation)
    {
        // Try to extract code blocks from markdown-style explanation
        var codeStart = explanation.IndexOf("```");
        if (codeStart >= 0)
        {
            var codeEnd = explanation.IndexOf("```", codeStart + 3);
            if (codeEnd > codeStart)
            {
                return explanation.Substring(codeStart + 3, codeEnd - codeStart - 3)
                    .Replace("javascript", "")
                    .Replace("js", "")
                    .Replace("typescript", "")
                    .Replace("ts", "")
                    .Trim();
            }
        }
        return "";
    }

    private string[] ExtractRelatedTopics(string question)
    {
        var topics = new List<string>();
        var questionLower = question.ToLower();

        if (questionLower.Contains("react"))
        {
            topics.AddRange(new[] { "Components", "State Management", "JSX", "Virtual DOM" });
        }
        else if (questionLower.Contains("javascript") || questionLower.Contains("js"))
        {
            topics.AddRange(new[] { "ES6+", "DOM Manipulation", "Promises", "Closures" });
        }
        else if (questionLower.Contains("css"))
        {
            topics.AddRange(new[] { "Flexbox", "Grid", "Responsive Design", "Animations" });
        }
        else if (questionLower.Contains("html"))
        {
            topics.AddRange(new[] { "Semantic HTML", "Forms", "Accessibility", "SEO" });
        }
        else
        {
            topics.AddRange(new[] { "Best Practices", "Performance", "Debugging", "Testing" });
        }

        return topics.Take(3).ToArray();
    }
}