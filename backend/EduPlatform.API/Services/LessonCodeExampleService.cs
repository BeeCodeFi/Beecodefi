using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class LessonCodeExampleService : ILessonCodeExampleService
{
    private readonly AppDbContext _db;

    public LessonCodeExampleService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LessonCodeExampleDto>> GetCodeExamplesAsync(string tutorialSlug, string lessonSlug, int? userId = null)
    {
        var query = _db.LessonCodeExamples
            .Where(c => c.TutorialSlug == tutorialSlug && c.LessonSlug == lessonSlug && c.IsApproved)
            .Include(c => c.User)
            .OrderByDescending(c => c.Upvotes - c.Downvotes)
            .ThenByDescending(c => c.CreatedAt);

        var examples = await query.Select(c => new LessonCodeExampleDto
        {
            Id = c.Id,
            UserId = c.UserId,
            UserName = c.User.Name,
            TutorialSlug = c.TutorialSlug,
            LessonSlug = c.LessonSlug,
            Title = c.Title,
            Description = c.Description,
            Code = c.Code,
            Language = c.Language,
            Upvotes = c.Upvotes,
            Downvotes = c.Downvotes,
            IsApproved = c.IsApproved,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt,
            UserVote = userId.HasValue ? c.Votes.Any(v => v.UserId == userId.Value) ? c.Votes.First(v => v.UserId == userId.Value).IsUpvote : (bool?)null : null,
            IsOwner = userId.HasValue && c.UserId == userId.Value
        }).ToListAsync();

        return examples;
    }

    public async Task<LessonCodeExampleDto?> GetCodeExampleAsync(int id, int? userId = null)
    {
        var example = await _db.LessonCodeExamples
            .Include(c => c.User)
            .Include(c => c.Votes)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (example == null)
            return null;

        return new LessonCodeExampleDto
        {
            Id = example.Id,
            UserId = example.UserId,
            UserName = example.User.Name,
            TutorialSlug = example.TutorialSlug,
            LessonSlug = example.LessonSlug,
            Title = example.Title,
            Description = example.Description,
            Code = example.Code,
            Language = example.Language,
            Upvotes = example.Upvotes,
            Downvotes = example.Downvotes,
            IsApproved = example.IsApproved,
            CreatedAt = example.CreatedAt,
            UpdatedAt = example.UpdatedAt,
            UserVote = userId.HasValue ? example.Votes.Any(v => v.UserId == userId.Value) ? example.Votes.First(v => v.UserId == userId.Value).IsUpvote : (bool?)null : null,
            IsOwner = userId.HasValue && example.UserId == userId.Value
        };
    }

    public async Task<LessonCodeExampleDto> CreateCodeExampleAsync(int userId, CreateLessonCodeExampleDto dto)
    {
        var example = new LessonCodeExample
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            Title = dto.Title,
            Description = dto.Description,
            Code = dto.Code,
            Language = dto.Language,
            Upvotes = 0,
            Downvotes = 0,
            IsApproved = false, // Requires admin approval
            CreatedAt = DateTime.UtcNow
        };

        _db.LessonCodeExamples.Add(example);
        await _db.SaveChangesAsync();

        // Reload with user data
        await _db.Entry(example).Reference(c => c.User).LoadAsync();

        return new LessonCodeExampleDto
        {
            Id = example.Id,
            UserId = example.UserId,
            UserName = example.User.Name,
            TutorialSlug = example.TutorialSlug,
            LessonSlug = example.LessonSlug,
            Title = example.Title,
            Description = example.Description,
            Code = example.Code,
            Language = example.Language,
            Upvotes = example.Upvotes,
            Downvotes = example.Downvotes,
            IsApproved = example.IsApproved,
            CreatedAt = example.CreatedAt,
            UpdatedAt = example.UpdatedAt,
            UserVote = null,
            IsOwner = true
        };
    }

    public async Task<LessonCodeExampleDto?> UpdateCodeExampleAsync(int userId, int id, UpdateLessonCodeExampleDto dto)
    {
        var example = await _db.LessonCodeExamples
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (example == null)
            return null;

        example.Title = dto.Title;
        example.Description = dto.Description;
        example.Code = dto.Code;
        example.Language = dto.Language;
        example.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return new LessonCodeExampleDto
        {
            Id = example.Id,
            UserId = example.UserId,
            UserName = example.User.Name,
            TutorialSlug = example.TutorialSlug,
            LessonSlug = example.LessonSlug,
            Title = example.Title,
            Description = example.Description,
            Code = example.Code,
            Language = example.Language,
            Upvotes = example.Upvotes,
            Downvotes = example.Downvotes,
            IsApproved = example.IsApproved,
            CreatedAt = example.CreatedAt,
            UpdatedAt = example.UpdatedAt,
            UserVote = null,
            IsOwner = true
        };
    }

    public async Task<bool> DeleteCodeExampleAsync(int userId, int id)
    {
        var example = await _db.LessonCodeExamples
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (example == null)
            return false;

        _db.LessonCodeExamples.Remove(example);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<LessonCodeExampleDto?> VoteCodeExampleAsync(int userId, int codeExampleId, bool isUpvote)
    {
        var example = await _db.LessonCodeExamples
            .Include(c => c.User)
            .Include(c => c.Votes)
            .FirstOrDefaultAsync(c => c.Id == codeExampleId);

        if (example == null)
            return null;

        // Check if user already voted
        var existingVote = example.Votes.FirstOrDefault(v => v.UserId == userId);
        
        if (existingVote != null)
        {
            // Update existing vote
            if (existingVote.IsUpvote != isUpvote)
            {
                // Remove old vote impact
                if (existingVote.IsUpvote)
                    example.Upvotes--;
                else
                    example.Downvotes--;

                // Update vote
                existingVote.IsUpvote = isUpvote;

                // Add new vote impact
                if (isUpvote)
                    example.Upvotes++;
                else
                    example.Downvotes++;

                await _db.SaveChangesAsync();
            }
        }
        else
        {
            // Add new vote
            var vote = new LessonCodeExampleVote
            {
                UserId = userId,
                CodeExampleId = codeExampleId,
                IsUpvote = isUpvote,
                VotedAt = DateTime.UtcNow
            };

            _db.LessonCodeExampleVotes.Add(vote);

            if (isUpvote)
                example.Upvotes++;
            else
                example.Downvotes++;

            await _db.SaveChangesAsync();
        }

        return new LessonCodeExampleDto
        {
            Id = example.Id,
            UserId = example.UserId,
            UserName = example.User.Name,
            TutorialSlug = example.TutorialSlug,
            LessonSlug = example.LessonSlug,
            Title = example.Title,
            Description = example.Description,
            Code = example.Code,
            Language = example.Language,
            Upvotes = example.Upvotes,
            Downvotes = example.Downvotes,
            IsApproved = example.IsApproved,
            CreatedAt = example.CreatedAt,
            UpdatedAt = example.UpdatedAt,
            UserVote = isUpvote,
            IsOwner = false
        };
    }

    public async Task<bool> RemoveVoteAsync(int userId, int codeExampleId)
    {
        var example = await _db.LessonCodeExamples
            .FirstOrDefaultAsync(c => c.Id == codeExampleId);

        if (example == null)
            return false;

        var vote = await _db.LessonCodeExampleVotes
            .FirstOrDefaultAsync(v => v.UserId == userId && v.CodeExampleId == codeExampleId);

        if (vote == null)
            return false;

        // Remove vote impact
        if (vote.IsUpvote)
            example.Upvotes--;
        else
            example.Downvotes--;

        _db.LessonCodeExampleVotes.Remove(vote);
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ApproveCodeExampleAsync(int codeExampleId)
    {
        var example = await _db.LessonCodeExamples
            .FirstOrDefaultAsync(c => c.Id == codeExampleId);

        if (example == null)
            return false;

        example.IsApproved = true;
        await _db.SaveChangesAsync();

        return true;
    }
}