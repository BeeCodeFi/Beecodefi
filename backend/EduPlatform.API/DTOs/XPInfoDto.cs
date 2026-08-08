namespace EduPlatform.API.DTOs;

public class XPInfoDto
{
    public int TotalXP { get; set; }
    public int Level { get; set; }
    public int XPToNextLevel { get; set; }
    public int XPForCurrentLevel { get; set; }
    public double StreakMultiplier { get; set; }
    public int CurrentStreak { get; set; }
    public int DailyXPGoal { get; set; }
    public int DailyXPEarned { get; set; }
    public int WeeklyXPGoal { get; set; }
    public int WeeklyXPEarned { get; set; }
}