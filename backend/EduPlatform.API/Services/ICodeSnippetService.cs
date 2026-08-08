using EduPlatform.API.DTOs;

namespace EduPlatform.API.Services;

public interface ICodeSnippetService
{
    Task<List<CodeSnippetDto>> GetSnippetsAsync(int userId);
    Task<CodeSnippetDto?> GetSnippetAsync(int userId, int id);
    Task<CodeSnippetDto> CreateSnippetAsync(int userId, CreateCodeSnippetDto dto);
    Task<CodeSnippetDto?> UpdateSnippetAsync(int userId, int id, UpdateCodeSnippetDto dto);
    Task<bool> DeleteSnippetAsync(int userId, int id);
    Task<CodeSnippetDto?> GetSnippetByShareIdAsync(string shareId);
}
