namespace EduPlatform.API.DTOs;

public class SkillsDto
{
    public string Skills { get; set; } = string.Empty;
}

public class SkillCategoryDto
{
    public string Category { get; set; } = string.Empty;
    public int Level { get; set; } // 1-5
    public string[] Tags { get; set; } = Array.Empty<string>();
}

public class UserSkillsDto
{
    public int UserId { get; set; }
    public string? Skills { get; set; }
    public List<SkillCategoryDto> ParsedSkills { get; set; } = new();
}

public class SkillsSearchDto
{
    public string Category { get; set; } = string.Empty;
    public int MinLevel { get; set; } = 1;
    public int MaxLevel { get; set; } = 5;
}