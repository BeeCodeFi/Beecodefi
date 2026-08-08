using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class LessonTipService : ILessonTipService
{
    private readonly AppDbContext _db;

    public LessonTipService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LessonTipDto>> GetTipsAsync(string tutorialSlug, string lessonSlug, int? userId = null)
    {
        var query = _db.LessonTips
            .Where(t => t.TutorialSlug == tutorialSlug && t.LessonSlug == lessonSlug && t.IsApproved)
            .Include(t => t.User)
            .OrderByDescending(t => t.Upvotes - t.Downvotes)
            .ThenByDescending(t => t.CreatedAt);

        var tips = await query.Select(t => new LessonTipDto
        {
            Id = t.Id,
            UserId = t.UserId,
            UserName = t.User.Name,
            TutorialSlug = t.TutorialSlug,
            LessonSlug = t.LessonSlug,
            Tip = t.Tip,
            Upvotes = t.Upvotes,
            Downvotes = t.Downvotes,
            IsApproved = t.IsApproved,
            CreatedAt = t.CreatedAt,
            UpdatedAt = t.UpdatedAt,
            UserVote = userId.HasValue ? t.Votes.Any(v => v.UserId == userId.Value) ? t.Votes.First(v => v.UserId == userId.Value).IsUpvote : (bool?)null : null,
            IsOwner = userId.HasValue && t.UserId == userId.Value
        }).ToListAsync();

        return tips;
    }

    public async Task<LessonTipDto?> GetTipAsync(int id, int? userId = null)
    {
        var tip = await _db.LessonTips
            .Include(t => t.User)
            .Include(t => t.Votes)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (tip == null)
            return null;

        return new LessonTipDto
        {
            Id = tip.Id,
            UserId = tip.UserId,
            UserName = tip.User.Name,
            TutorialSlug = tip.TutorialSlug,
            LessonSlug = tip.LessonSlug,
            Tip = tip.Tip,
            Upvotes = tip.Upvotes,
            Downvotes = tip.Downvotes,
            IsApproved = tip.IsApproved,
            CreatedAt = tip.CreatedAt,
            UpdatedAt = tip.UpdatedAt,
            UserVote = userId.HasValue ? tip.Votes.Any(v => v.UserId == userId.Value) ? tip.Votes.First(v => v.UserId == userId.Value).IsUpvote : (bool?)null : null,
            IsOwner = userId.HasValue && tip.UserId == userId.Value
        };
    }

    public async Task<LessonTipDto> CreateTipAsync(int userId, CreateLessonTipDto dto)
    {
        var tip = new LessonTip
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            Tip = dto.Tip,
            Upvotes = 0,
            Downvotes = 0,
            IsApproved = false, // Requires admin approval
            CreatedAt = DateTime.UtcNow
        };

        _db.LessonTips.Add(tip);
        await _db.SaveChangesAsync();

        // Reload with user data
        await _db.Entry(tip).Reference(t => t.User).LoadAsync();

        return new LessonTipDto
        {
            Id = tip.Id,
            UserId = tip.UserId,
            UserName = tip.User.Name,
            TutorialSlug = tip.TutorialSlug,
            LessonSlug = tip.LessonSlug,
            Tip = tip.Tip,
            Upvotes = tip.Upvotes,
            Downvotes = tip.Downvotes,
            IsApproved = tip.IsApproved,
            CreatedAt = tip.CreatedAt,
            UpdatedAt = tip.UpdatedAt,
            UserVote = null,
            IsOwner = true
        };
    }

    public async Task<LessonTipDto?> UpdateTipAsync(int userId, int id, UpdateLessonTipDto dto)
    {
        var tip = await _db.LessonTips
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (tip == null)
            return null;

        tip.Tip = dto.Tip;
        tip.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return new LessonTipDto
        {
            Id = tip.Id,
            UserId = tip.UserId,
            UserName = tip.User.Name,
            TutorialSlug = tip.TutorialSlug,
            LessonSlug = tip.LessonSlug,
            Tip = tip.Tip,
            Upvotes = tip.Upvotes,
            Downvotes = tip.Downvotes,
            IsApproved = tip.IsApproved,
            CreatedAt = tip.CreatedAt,
            UpdatedAt = tip.UpdatedAt,
            UserVote = null,
            IsOwner = true
        };
    }

    public async Task<bool> DeleteTipAsync(int userId, int id)
    {
        var tip = await _db.LessonTips
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

        if (tip == null)
            return false;

        _db.LessonTips.Remove(tip);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<LessonTipDto?> VoteTipAsync(int userId, int tipId, bool isUpvote)
    {
        var tip = await _db.LessonTips
            .Include(t => t.User)
            .Include(t => t.Votes)
            .FirstOrDefaultAsync(t => t.Id == tipId);

        if (tip == null)
            return null;

        // Check if user already voted
        var existingVote = tip.Votes.FirstOrDefault(v => v.UserId == userId);
        
        if (existingVote != null)
        {
            // Update existing vote
            if (existingVote.IsUpvote != isUpvote)
            {
                // Remove old vote impact
                if (existingVote.IsUpvote)
                    tip.Upvotes--;
                else
                    tip.Downvotes--;

                // Update vote
                existingVote.IsUpvote = isUpvote;

                // Add new vote impact
                if (isUpvote)
                    tip.Upvotes++;
                else
                    tip.Downvotes++;

                await _db.SaveChangesAsync();
            }
        }
        else
        {
            // Add new vote
            var vote = new LessonTipVote
            {
                UserId = userId,
                TipId = tipId,
                IsUpvote = isUpvote,
                VotedAt = DateTime.UtcNow
            };

            _db.LessonTipVotes.Add(vote);

            if (isUpvote)
                tip.Upvotes++;
            else
                tip.Downvotes++;

            await _db.SaveChangesAsync();
        }

        return new LessonTipDto
        {
            Id = tip.Id,
            UserId = tip.UserId,
            UserName = tip.User.Name,
            TutorialSlug = tip.TutorialSlug,
            LessonSlug = tip.LessonSlug,
            Tip = tip.Tip,
            Upvotes = tip.Upvotes,
            Downvotes = tip.Downvotes,
            IsApproved = tip.IsApproved,
            CreatedAt = tip.CreatedAt,
            UpdatedAt = tip.UpdatedAt,
            UserVote = isUpvote,
            IsOwner = false
        };
    }

    public async Task<bool> RemoveVoteAsync(int userId, int tipId)
    {
        var tip = await _db.LessonTips
            .FirstOrDefaultAsync(t => t.Id == tipId);

        if (tip == null)
            return false;

        var vote = await _db.LessonTipVotes
            .FirstOrDefaultAsync(v => v.UserId == userId && v.TipId == tipId);

        if (vote == null)
            return false;

        // Remove vote impact
        if (vote.IsUpvote)
            tip.Upvotes--;
        else
            tip.Downvotes--;

        _db.LessonTipVotes.Remove(vote);
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ApproveTipAsync(int tipId)
    {
        var tip = await _db.LessonTips
            .FirstOrDefaultAsync(t => t.Id == tipId);

        if (tip == null)
            return false;

        tip.IsApproved = true;
        await _db.SaveChangesAsync();

        return true;
    }
}