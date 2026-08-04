-- =================================================================
-- Test Quiz Data - Check what's in your database
-- =================================================================

-- Check if LessonQuizAttempts table exists and has data
SELECT 
    'LessonQuizAttempts' as table_name,
    COUNT(*) as record_count
FROM "LessonQuizAttempts"
WHERE EXISTS (SELECT FROM pg_tables WHERE tablename = 'LessonQuizAttempts');

-- Show recent lesson quiz attempts (if any)
SELECT 
    'Recent Lesson Quiz Attempts:' as info,
    "Id",
    "UserId",
    "QuizTopic",
    "QuizTitle",
    "Score",
    "TotalQuestions",
    "CompletedAt"
FROM "LessonQuizAttempts"
ORDER BY "CompletedAt" DESC
LIMIT 10;

-- Check regular quiz attempts
SELECT 
    'Regular Quiz Attempts' as table_name,
    COUNT(*) as record_count
FROM "QuizAttempts";

-- Show recent regular quiz attempts
SELECT 
    'Recent Regular Quiz Attempts:' as info,
    qa."Id",
    qa."UserId",
    q."Title" as "QuizTitle",
    qa."Score",
    qa."TotalQuestions",
    qa."CompletedAt"
FROM "QuizAttempts" qa
JOIN "Quizzes" q ON qa."QuizId" = q."Id"
ORDER BY qa."CompletedAt" DESC
LIMIT 10;

-- Show all quiz attempts for a specific user (replace USER_ID with your user ID)
-- First, find your user ID
SELECT 
    'Your User Info:' as info,
    "Id" as "UserId",
    "Name",
    "Email"
FROM "Users"
ORDER BY "Id"
LIMIT 5;

-- IMPORTANT: After finding your user ID above, uncomment and run this:
-- Replace 'YOUR_EMAIL@example.com' with your actual email
/*
SELECT 
    'All Your Quiz Attempts:' as info,
    'Lesson Quiz' as type,
    "QuizTitle",
    "Score",
    "TotalQuestions",
    ROUND(("Score"::numeric / "TotalQuestions"::numeric * 100), 1) as "Percentage",
    "CompletedAt"
FROM "LessonQuizAttempts"
WHERE "UserId" = (SELECT "Id" FROM "Users" WHERE "Email" = 'YOUR_EMAIL@example.com')

UNION ALL

SELECT 
    'All Your Quiz Attempts:' as info,
    'Regular Quiz' as type,
    q."Title" as "QuizTitle",
    qa."Score",
    qa."TotalQuestions",
    ROUND((qa."Score"::numeric / qa."TotalQuestions"::numeric * 100), 1) as "Percentage",
    qa."CompletedAt"
FROM "QuizAttempts" qa
JOIN "Quizzes" q ON qa."QuizId" = q."Id"
WHERE qa."UserId" = (SELECT "Id" FROM "Users" WHERE "Email" = 'YOUR_EMAIL@example.com')

ORDER BY "CompletedAt" DESC;
*/
