using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class CodeSnippetService : ICodeSnippetService
{
    private readonly AppDbContext _db;

    public CodeSnippetService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<CodeSnippetDto>> GetSnippetsAsync(int userId)
    {
        return await _db.CodeSnippets
            .Where(cs => cs.UserId == userId)
            .OrderByDescending(cs => cs.UpdatedAt)
            .Select(cs => new CodeSnippetDto
            {
                Id = cs.Id,
                Name = cs.Name,
                Code = cs.Code,
                Language = cs.Language,
                ShareId = cs.ShareId,
                CreatedAt = cs.CreatedAt,
                UpdatedAt = cs.UpdatedAt
            })
            .ToListAsync();
    }

    public async Task<CodeSnippetDto?> GetSnippetAsync(int userId, int id)
    {
        return await _db.CodeSnippets
            .Where(cs => cs.UserId == userId && cs.Id == id)
            .Select(cs => new CodeSnippetDto
            {
                Id = cs.Id,
                Name = cs.Name,
                Code = cs.Code,
                Language = cs.Language,
                ShareId = cs.ShareId,
                CreatedAt = cs.CreatedAt,
                UpdatedAt = cs.UpdatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<CodeSnippetDto> CreateSnippetAsync(int userId, CreateCodeSnippetDto dto)
    {
        // Generate unique share ID
        var shareId = GenerateShareId();

        var snippet = new CodeSnippet
        {
            UserId = userId,
            Name = dto.Name,
            Code = dto.Code,
            Language = dto.Language,
            ShareId = shareId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.CodeSnippets.Add(snippet);
        await _db.SaveChangesAsync();

        return new CodeSnippetDto
        {
            Id = snippet.Id,
            Name = snippet.Name,
            Code = snippet.Code,
            Language = snippet.Language,
            ShareId = snippet.ShareId,
            CreatedAt = snippet.CreatedAt,
            UpdatedAt = snippet.UpdatedAt
        };
    }

    public async Task<CodeSnippetDto?> UpdateSnippetAsync(int userId, int id, UpdateCodeSnippetDto dto)
    {
        var snippet = await _db.CodeSnippets
            .FirstOrDefaultAsync(cs => cs.UserId == userId && cs.Id == id);

        if (snippet == null)
            return null;

        snippet.Name = dto.Name;
        snippet.Code = dto.Code;
        snippet.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return new CodeSnippetDto
        {
            Id = snippet.Id,
            Name = snippet.Name,
            Code = snippet.Code,
            Language = snippet.Language,
            ShareId = snippet.ShareId,
            CreatedAt = snippet.CreatedAt,
            UpdatedAt = snippet.UpdatedAt
        };
    }

    public async Task<bool> DeleteSnippetAsync(int userId, int id)
    {
        var snippet = await _db.CodeSnippets
            .FirstOrDefaultAsync(cs => cs.UserId == userId && cs.Id == id);

        if (snippet == null)
            return false;

        _db.CodeSnippets.Remove(snippet);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<CodeSnippetDto?> GetSnippetByShareIdAsync(string shareId)
    {
        return await _db.CodeSnippets
            .Where(cs => cs.ShareId == shareId)
            .Select(cs => new CodeSnippetDto
            {
                Id = cs.Id,
                Name = cs.Name,
                Code = cs.Code,
                Language = cs.Language,
                ShareId = cs.ShareId,
                CreatedAt = cs.CreatedAt,
                UpdatedAt = cs.UpdatedAt
            })
            .FirstOrDefaultAsync();
    }

    private string GenerateShareId()
    {
        // Generate a random 8-character string
        const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        var random = new Random();
        var result = new char[8];
        
        // Ensure uniqueness
        string shareId;
        do
        {
            for (int i = 0; i < 8; i++)
            {
                result[i] = chars[random.Next(chars.Length)];
            }
            shareId = new string(result);
        } while (_db.CodeSnippets.Any(cs => cs.ShareId == shareId));

        return shareId;
    }
}
