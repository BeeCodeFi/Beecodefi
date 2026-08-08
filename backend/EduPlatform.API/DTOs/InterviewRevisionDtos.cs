namespace EduPlatform.API.DTOs;

public record MarkRevisionDto(
    string Category,
    string QuestionId
);

public record RevisionDto(
    int Id,
    string Category,
    string QuestionId,
    DateTime MarkedAt
);
