-- =================================================================
-- STEP 1: Check if LessonQuizAttempts table exists
-- =================================================================
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT FROM pg_tables 
            WHERE schemaname = 'public' 
            AND tablename = 'LessonQuizAttempts'
        )
        THEN '✅ Table EXISTS'
        ELSE '❌ Table DOES NOT EXIST - Need to create it'
    END as table_status;

-- =================================================================
-- STEP 2: Create the table if it doesn't exist
-- =================================================================
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

-- Create indexes
CREATE INDEX IF NOT EXISTS "IX_LessonQuizAttempts_QuizTopic" 
    ON "LessonQuizAttempts" ("QuizTopic");

CREATE INDEX IF NOT EXISTS "IX_LessonQuizAttempts_UserId" 
    ON "LessonQuizAttempts" ("UserId");

-- =================================================================
-- STEP 3: Verify table was created successfully
-- =================================================================
SELECT 
    '✅ Table structure:' as status,
    column_name, 
    data_type,
    character_maximum_length,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'LessonQuizAttempts'
ORDER BY ordinal_position;

-- =================================================================
-- STEP 4: Check EF Core migrations table
-- =================================================================
SELECT 
    '📋 Applied migrations:' as info,
    "MigrationId",
    "ProductVersion"
FROM "__EFMigrationsHistory"
ORDER BY "MigrationId" DESC
LIMIT 5;

-- =================================================================
-- STEP 5: Insert migration record if missing
-- =================================================================
-- This tells EF Core that the migration has been applied
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
SELECT '20260804104028_AddLessonQuizAttempts', '8.0.0'
WHERE NOT EXISTS (
    SELECT 1 FROM "__EFMigrationsHistory" 
    WHERE "MigrationId" = '20260804104028_AddLessonQuizAttempts'
);

-- =================================================================
-- STEP 6: Final verification
-- =================================================================
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT FROM "__EFMigrationsHistory" 
            WHERE "MigrationId" = '20260804104028_AddLessonQuizAttempts'
        )
        THEN '✅ Migration recorded in EF history'
        ELSE '❌ Migration NOT in EF history'
    END as migration_status;

-- =================================================================
-- STEP 7: Show all your tables to confirm
-- =================================================================
SELECT 
    '📊 All tables in database:' as info,
    tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
