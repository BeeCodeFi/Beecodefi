namespace EduPlatform.API.DTOs;

public class AiExplanationDto
{
    public string Question { get; set; } = string.Empty;
    public string Context { get; set; } = string.Empty; // Lesson content or specific section
    public string TutorialSlug { get; set; } = string.Empty;
    public string LessonSlug { get; set; } = string.Empty;
}

public class AiExplanationResponseDto
{
    public string Explanation { get; set; } = string.Empty;
    public string CodeExample { get; set; } = string.Empty;
    public string[] RelatedTopics { get; set; } = Array.Empty<string>();
}