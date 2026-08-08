namespace EduPlatform.API.DTOs;

public record MarkInterviewProgressDto(
    string Category,
    string QuestionId
);

public record InterviewProgressDto(
    int Id,
    string Category,
    string QuestionId,
    DateTime ReadAt
);

public record InterviewProgressSummaryDto(
    string Category,
    int TotalRead,
    List<string> ReadQuestionIds
);
