using EduPlatform.API.Data;
using EduPlatform.API.DTOs;
using EduPlatform.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EduPlatform.API.Services;

public class CommentService : ICommentService
{
    private readonly AppDbContext _db;

    public CommentService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LessonCommentDto>> GetCommentsAsync(string tutorialSlug, string lessonSlug, int? userId = null)
    {
        var query = _db.LessonComments
            .Where(c => c.TutorialSlug == tutorialSlug && c.LessonSlug == lessonSlug)
            .Include(c => c.User)
            .OrderByDescending(c => c.CreatedAt);

        var comments = await query.Select(c => new LessonCommentDto
        {
            Id = c.Id,
            UserId = c.UserId,
            UserName = c.User.Name,
            TutorialSlug = c.TutorialSlug,
            LessonSlug = c.LessonSlug,
            Content = c.Content,
            Upvotes = c.Upvotes,
            Downvotes = c.Downvotes,
            CreatedAt = c.CreatedAt,
            UpdatedAt = c.UpdatedAt,
            UserVote = userId.HasValue ? c.Votes.Any(v => v.UserId == userId.Value) ? c.Votes.First(v => v.UserId == userId.Value).IsUpvote : (bool?)null : null
        }).ToListAsync();

        return comments;
    }

    public async Task<LessonCommentDto?> GetCommentAsync(int id, int? userId = null)
    {
        var comment = await _db.LessonComments
            .Include(c => c.User)
            .Include(c => c.Votes)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (comment == null)
            return null;

        return new LessonCommentDto
        {
            Id = comment.Id,
            UserId = comment.UserId,
            UserName = comment.User.Name,
            TutorialSlug = comment.TutorialSlug,
            LessonSlug = comment.LessonSlug,
            Content = comment.Content,
            Upvotes = comment.Upvotes,
            Downvotes = comment.Downvotes,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt,
            UserVote = userId.HasValue ? comment.Votes.Any(v => v.UserId == userId.Value) ? comment.Votes.First(v => v.UserId == userId.Value).IsUpvote : (bool?)null : null
        };
    }

    public async Task<LessonCommentDto> CreateCommentAsync(int userId, CreateCommentDto dto)
    {
        var comment = new LessonComment
        {
            UserId = userId,
            TutorialSlug = dto.TutorialSlug,
            LessonSlug = dto.LessonSlug,
            Content = dto.Content,
            Upvotes = 0,
            Downvotes = 0,
            CreatedAt = DateTime.UtcNow
        };

        _db.LessonComments.Add(comment);
        await _db.SaveChangesAsync();

        // Reload with user data
        await _db.Entry(comment).Reference(c => c.User).LoadAsync();

        return new LessonCommentDto
        {
            Id = comment.Id,
            UserId = comment.UserId,
            UserName = comment.User.Name,
            TutorialSlug = comment.TutorialSlug,
            LessonSlug = comment.LessonSlug,
            Content = comment.Content,
            Upvotes = comment.Upvotes,
            Downvotes = comment.Downvotes,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt,
            UserVote = null
        };
    }

    public async Task<LessonCommentDto?> UpdateCommentAsync(int userId, int id, UpdateCommentDto dto)
    {
        var comment = await _db.LessonComments
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (comment == null)
            return null;

        comment.Content = dto.Content;
        comment.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return new LessonCommentDto
        {
            Id = comment.Id,
            UserId = comment.UserId,
            UserName = comment.User.Name,
            TutorialSlug = comment.TutorialSlug,
            LessonSlug = comment.LessonSlug,
            Content = comment.Content,
            Upvotes = comment.Upvotes,
            Downvotes = comment.Downvotes,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt,
            UserVote = null
        };
    }

    public async Task<bool> DeleteCommentAsync(int userId, int id)
    {
        var comment = await _db.LessonComments
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

        if (comment == null)
            return false;

        _db.LessonComments.Remove(comment);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<LessonCommentDto?> VoteCommentAsync(int userId, int commentId, bool isUpvote)
    {
        var comment = await _db.LessonComments
            .Include(c => c.User)
            .Include(c => c.Votes)
            .FirstOrDefaultAsync(c => c.Id == commentId);

        if (comment == null)
            return null;

        // Check if user already voted
        var existingVote = comment.Votes.FirstOrDefault(v => v.UserId == userId);
        
        if (existingVote != null)
        {
            // Update existing vote
            if (existingVote.IsUpvote != isUpvote)
            {
                // Remove old vote impact
                if (existingVote.IsUpvote)
                    comment.Upvotes--;
                else
                    comment.Downvotes--;

                // Update vote
                existingVote.IsUpvote = isUpvote;

                // Add new vote impact
                if (isUpvote)
                    comment.Upvotes++;
                else
                    comment.Downvotes++;

                await _db.SaveChangesAsync();
            }
        }
        else
        {
            // Add new vote
            var vote = new CommentVote
            {
                UserId = userId,
                CommentId = commentId,
                IsUpvote = isUpvote,
                VotedAt = DateTime.UtcNow
            };

            _db.CommentVotes.Add(vote);

            if (isUpvote)
                comment.Upvotes++;
            else
                comment.Downvotes++;

            await _db.SaveChangesAsync();
        }

        return new LessonCommentDto
        {
            Id = comment.Id,
            UserId = comment.UserId,
            UserName = comment.User.Name,
            TutorialSlug = comment.TutorialSlug,
            LessonSlug = comment.LessonSlug,
            Content = comment.Content,
            Upvotes = comment.Upvotes,
            Downvotes = comment.Downvotes,
            CreatedAt = comment.CreatedAt,
            UpdatedAt = comment.UpdatedAt,
            UserVote = isUpvote
        };
    }

    public async Task<bool> RemoveVoteAsync(int userId, int commentId)
    {
        var comment = await _db.LessonComments
            .FirstOrDefaultAsync(c => c.Id == commentId);

        if (comment == null)
            return false;

        var vote = await _db.CommentVotes
            .FirstOrDefaultAsync(v => v.UserId == userId && v.CommentId == commentId);

        if (vote == null)
            return false;

        // Remove vote impact
        if (vote.IsUpvote)
            comment.Upvotes--;
        else
            comment.Downvotes--;

        _db.CommentVotes.Remove(vote);
        await _db.SaveChangesAsync();

        return true;
    }
}
