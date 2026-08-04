-- SQL Migration for AddLessonQuizAttempts
-- Run this directly in your Neon PostgreSQL database if you can't run dotnet ef commands

-- Create the LessonQuizAttempts table
CREATE TABLE IF NOT EXISTS "LessonQuizAttempts" (
    "Id" SERIAL PRIMARY KEY,
    "UserId" INTEGER NOT NULL,
    "QuizTopic" VARCHAR(100) NOT NULL,
    "QuizTitle" VARCHAR(200) NOT NULL,
    "Category" VARCHAR(50) NOT NULL,
    "Score" INTEGER NOT NULL,
    "TotalQuestions" INTEGER NOT NULL,
    "CompletedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT "FK_LessonQuizAttempts_Users_UserId" 
        FOREIGN KEY ("UserId") 
        REFERENCES "Users" ("Id") 
        ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "IX_LessonQuizAttempts_QuizTopic" 
    ON "LessonQuizAttempts" ("QuizTopic");

CREATE INDEX IF NOT EXISTS "IX_LessonQuizAttempts_UserId" 
    ON "LessonQuizAttempts" ("UserId");

-- Verify the table was created
SELECT 
    tablename, 
    schemaname 
FROM pg_tables 
WHERE tablename = 'LessonQuizAttempts';

-- Check the structure
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'LessonQuizAttempts'
ORDER BY ordinal_position;
