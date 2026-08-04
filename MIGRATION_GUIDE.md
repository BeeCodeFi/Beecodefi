# Database Migration Guide - AddLessonQuizAttempts

## Issue
After completing lesson quizzes, they show as completed on the main quiz page (localStorage) but don't appear in the Learning page Quiz History tab because the database migration hasn't been applied yet.

## What This Migration Does
- Adds a new `LessonQuizAttempts` table to store quick quiz completions from lessons
- Allows lesson quiz attempts to appear in your quiz history
- Counts lesson quizzes toward your leaderboard stats

## How to Apply the Migration

### Option 1: Using Railway/Render CLI (Recommended for Production)

#### If using Railway:
```bash
# Install Railway CLI if you haven't
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Run the migration
railway run dotnet ef database update --project backend/EduPlatform.API
```

#### If using Render:
```bash
# SSH into your Render service
# Go to your Render dashboard → Your Web Service → Shell tab
# Then run:
cd backend/EduPlatform.API
dotnet ef database update
```

### Option 2: Using Connection String Directly
```bash
# Set your production connection string
export ConnectionStrings__DefaultConnection="your-neon-postgresql-connection-string"
export Jwt__Key="your-jwt-key"

# Navigate to the API project
cd backend/EduPlatform.API

# Apply the migration
dotnet ef database update
```

### Option 3: Manual SQL Migration (If EF Tools Not Available)
If you can't run EF commands on your hosting platform, you can apply the SQL directly to your Neon PostgreSQL database:

```sql
-- Run this in your Neon SQL Editor

CREATE TABLE "LessonQuizAttempts" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "QuizTopic" VARCHAR(100) NOT NULL,
    "QuizTitle" VARCHAR(200) NOT NULL,
    "Category" VARCHAR(50) NOT NULL,
    "Score" INTEGER NOT NULL,
    "TotalQuestions" INTEGER NOT NULL,
    "CompletedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "FK_LessonQuizAttempts_Users_UserId" 
        FOREIGN KEY ("UserId") REFERENCES "Users" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_LessonQuizAttempts_QuizTopic" ON "LessonQuizAttempts" ("QuizTopic");
CREATE INDEX "IX_LessonQuizAttempts_UserId" ON "LessonQuizAttempts" ("UserId");
```

## Verification

After applying the migration, verify it worked:

1. Complete a lesson with a quick quiz (e.g., HTML Canvas API lesson)
2. Go to your Learning page → Quiz History tab
3. You should see your completed lesson quiz appear in the history!
4. The "2 completed" on the main quiz page should now match the quiz history

## Troubleshooting

### Error: "No such table: LessonQuizAttempts"
**Solution:** The migration hasn't been applied. Follow one of the options above.

### Error: "Column 'QuizTopic' cannot be null"
**Solution:** The migration was partially applied. Try running:
```bash
dotnet ef database update 0  # Rollback
dotnet ef database update    # Reapply
```

### Quiz history still empty after migration
**Solution:** 
1. Check browser console for errors (F12 → Console tab)
2. Previous quiz attempts before migration won't appear (only new ones after migration)
3. Retake the lesson quizzes to test - they should now appear in history

### "Still shows 2 completed but quiz history is empty"
**Cause:** The "2 completed" is from localStorage (frontend), but quiz history comes from the database (backend). 

**Solution:** 
1. Apply the database migration (this is the key step!)
2. Retake the 2 lesson quizzes
3. They will now be saved to the database AND appear in quiz history

## Production Deployment Checklist

- [ ] Backup your database before running migrations
- [ ] Apply the migration to production database
- [ ] Deploy the updated backend code
- [ ] Deploy the updated frontend code
- [ ] Test by completing a lesson quiz
- [ ] Verify it appears in Quiz History tab
- [ ] Check leaderboard stats include the new quiz

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for frontend errors
2. Check your hosting platform logs for backend errors
3. Ensure the environment variables are set correctly
4. Verify the database connection string is correct

---

**Note:** The migration file is located at:
`backend/EduPlatform.API/Migrations/20260804104028_AddLessonQuizAttempts.cs`
