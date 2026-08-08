namespace EduPlatform.API.DTOs;

public class CodeSnippetDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public string? ShareId { get; set; }
    public string? Files { get; set; } // JSON string for multi-file support
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateCodeSnippetDto
{
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
    public string? Files { get; set; } // JSON string for multi-file support
}

public class UpdateCodeSnippetDto
{
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string? Files { get; set; } // JSON string for multi-file support
}
