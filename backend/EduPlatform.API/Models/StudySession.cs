using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EduPlatform.API.Models;

public class StudySession
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Category { get; set; } = string.Empty;

    [Required]
    public int UserId { get; set; }

    [Required]
    public int TotalSeconds { get; set; } = 0;

    [Required]
    public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    public User? User { get; set; }
}