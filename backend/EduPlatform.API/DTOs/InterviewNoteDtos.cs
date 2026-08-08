namespace EduPlatform.API.DTOs;

public record SaveInterviewNoteDto(
    string Category,
    string QuestionId,
    string NoteText
);

public record InterviewNoteDto(
    int Id,
    string Category,
    string QuestionId,
    string NoteText,
    DateTime UpdatedAt
);

public record InterviewNotesSummaryDto(
    string Category,
    List<InterviewNoteDto> Notes
);
