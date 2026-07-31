# Testing Checklist for BeeCodeFi

This document outlines critical user flows and features to test before production deployment.

## ✅ Pre-Deployment Checklist

### Build & Deployment
- [x] Frontend builds successfully (`npm run build`)
- [x] Backend builds successfully (Docker)
- [x] No TypeScript errors
- [x] No ESLint warnings (critical)
- [x] Environment variables documented
- [x] Deployment guides created

### Critical User Flows

#### 1. Authentication Flow
- [ ] **Register new account**
  - Go to `/register`
  - Fill in username, email, password
  - Submit form
  - Verify success toast appears
  - Check redirect to dashboard
  
- [ ] **Login**
  - Go to `/login`
  - Enter valid credentials
  - Submit form
  - Verify token stored in localStorage
  - Check navbar shows user menu
  
- [ ] **Logout**
  - Click user menu
  - Click "Logout"
  - Verify redirect to home
  - Check navbar shows "Login" button
  
- [ ] **Forgot Password**
  - Go to `/forgot-password`
  - Enter registered email
  - Verify success message
  - Check email for reset link
  
- [ ] **Reset Password**
  - Click reset link from email
  - Enter new password
  - Verify success message
  - Login with new password

#### 2. Tutorial/Lesson Flow
- [ ] **Browse tutorials**
  - Go to `/tutorials`
  - Verify all tutorial cards display
  - Check category filters work
  - Test search functionality
  
- [ ] **View lesson**
  - Click on a tutorial
  - Select a lesson
  - Verify content renders correctly
  - Check code editor displays
  
- [ ] **Complete lesson**
  - Read through lesson content
  - Run code examples
  - Click "Next" or "Mark Complete"
  - Verify progress updates in sidebar
  - Check completion toast appears
  
- [ ] **Bookmark lesson** (logged in)
  - Click bookmark icon on lesson
  - Verify bookmark added toast
  - Go to `/dashboard`
  - Check lesson appears in bookmarks
  
- [ ] **Continue learning**
  - Complete a lesson partially
  - Return to homepage
  - Verify "Continue Learning" CTA shows
  - Click CTA
  - Check redirects to correct lesson

#### 3. Quiz Flow
- [ ] **Browse quizzes**
  - Go to `/quiz`
  - Verify quiz categories display
  - Check quiz counts are correct
  
- [ ] **Take quiz**
  - Select a quiz topic
  - Answer questions
  - Verify question counter updates
  - Test navigation (prev/next)
  
- [ ] **Submit quiz**
  - Answer all questions
  - Click "Submit Quiz"
  - Verify results page shows
  - Check score calculation is correct
  - View explanations for wrong answers
  
- [ ] **Quiz progress tracking** (logged in)
  - Complete a quiz
  - Check score saved to backend
  - Verify leaderboard updates
  - Check badges unlock if applicable

#### 4. Video Course Flow
- [ ] **Browse courses**
  - Go to `/courses`
  - Verify course cards display
  - Check video counts
  - Test category filters
  
- [ ] **Watch video**
  - Click on a course
  - Select a video
  - Verify YouTube embed loads
  - Check video plays correctly
  
- [ ] **Navigate videos**
  - Test sidebar navigation
  - Click next/previous video
  - Verify smooth transitions

#### 5. Dashboard Flow (Logged In)
- [ ] **View dashboard**
  - Go to `/dashboard`
  - Verify all sections load:
    - Bookmarked lessons
    - Quiz history
    - Learning streak
    - Progress stats
  
- [ ] **Check statistics**
  - Verify lesson count is accurate
  - Check quiz scores display
  - Test quiz history pagination
  
- [ ] **Manage bookmarks**
  - View bookmarked lessons
  - Click on a bookmark
  - Verify redirects correctly
  - Remove a bookmark
  - Check it disappears from list

#### 6. Gamification Features
- [ ] **Leaderboard**
  - Go to `/leaderboard`
  - Verify user rankings display
  - Check points calculation
  - Test "Your Rank" section (logged in)
  - Verify top 3 badges appear
  
- [ ] **Badges**
  - Go to `/badges`
  - Verify all 14 badges display
  - Check locked/unlocked states
  - Test category filters
  - View badge requirements
  - Complete requirements to unlock badge
  - Verify badge unlocks with toast
  
- [ ] **Streaks**
  - Complete lesson/quiz today
  - Check streak increments
  - Return tomorrow
  - Verify streak continues
  - Skip a day
  - Check streak resets

#### 7. Search & Navigation
- [ ] **Global search**
  - Press `/` key
  - Type search query
  - Verify results appear
  - Click result
  - Check redirects correctly
  
- [ ] **Mobile menu**
  - Resize to mobile width
  - Open hamburger menu
  - Test all navigation links
  - Verify smooth animations
  
- [ ] **Theme toggle**
  - Click theme toggle
  - Verify dark mode applies
  - Refresh page
  - Check theme persists
  - Switch back to light mode

#### 8. Contact & Support
- [ ] **Contact form**
  - Go to `/contact`
  - Fill in name, email, message
  - Submit form
  - Verify success toast
  - Check rate limiting (try submitting 3+ times)
  
- [ ] **FAQ page**
  - Go to `/faq`
  - Verify all 10 questions display
  - Test accordion expand/collapse
  - Check search functionality

#### 9. SEO & Accessibility
- [ ] **Meta tags**
  - View page source on home
  - Verify title, description, OG tags
  - Check favicon loads
  
- [ ] **Sitemap**
  - Go to `/sitemap.xml`
  - Verify all pages listed
  - Check URLs are correct
  
- [ ] **Robots.txt**
  - Go to `/robots.txt`
  - Verify sitemap URL listed
  
- [ ] **Skip to content**
  - Tab on keyboard
  - Verify skip link appears
  - Press Enter
  - Check focuses on main content
  
- [ ] **Keyboard navigation**
  - Navigate site using Tab key
  - Verify focus indicators visible
  - Test Escape key closes modals
  - Check Enter activates buttons

#### 10. Onboarding Tour (First-time Users)
- [ ] **Tour triggers**
  - Clear localStorage
  - Visit homepage (logged in)
  - Verify tour starts automatically
  - Click "Skip Tour"
  - Refresh page
  - Verify tour doesn't restart
  
- [ ] **Tour steps**
  - Start tour
  - Navigate through all steps
  - Verify highlights appear correctly
  - Click "Finish"
  - Check tour completion saved

### Performance Testing

#### Load Times
- [ ] Homepage loads in < 2 seconds
- [ ] Tutorial page loads in < 1.5 seconds
- [ ] Quiz page loads in < 1.5 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] Images lazy load properly
- [ ] Fonts load without FOUT/FOIT

#### Responsive Design
- [ ] **Mobile (320px - 768px)**
  - Test all pages
  - Verify layouts adapt
  - Check touch targets (44px min)
  - Test hamburger menu
  
- [ ] **Tablet (768px - 1024px)**
  - Test all pages
  - Verify grid layouts
  - Check sidebar behavior
  
- [ ] **Desktop (1024px+)**
  - Test all pages
  - Verify full layouts
  - Check hover states
  - Test keyboard shortcuts

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Security Testing

- [ ] **XSS Protection**
  - Try injecting `<script>alert('XSS')</script>` in forms
  - Verify input sanitized
  
- [ ] **Rate Limiting**
  - Attempt 10+ login requests rapidly
  - Verify rate limit triggers (429 error)
  - Wait 1 minute
  - Verify access restored
  
- [ ] **CORS**
  - Make request from unauthorized domain
  - Verify request blocked
  
- [ ] **JWT Tokens**
  - Login
  - Copy token from localStorage
  - Logout
  - Try using old token
  - Verify request rejected
  
- [ ] **Password Reset**
  - Request password reset
  - Wait for token to expire (1 hour)
  - Try using expired token
  - Verify error message

### Analytics & Monitoring

- [ ] **Google Analytics**
  - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - Build for production
  - Visit pages
  - Check GA Real-Time reports
  - Verify page views tracked
  
- [ ] **Error Tracking**
  - Trigger an error (visit `/test-error`)
  - Check `/debug` page (dev only)
  - Verify error logged
  - Check localStorage has error logs
  
- [ ] **Performance Metrics**
  - Check Lighthouse scores:
    - Performance: 90+
    - Accessibility: 95+
    - Best Practices: 95+
    - SEO: 100

### Backend API Testing

#### Endpoints
- [ ] `GET /api/auth/health` - Health check
- [ ] `POST /api/auth/register` - User registration
- [ ] `POST /api/auth/login` - User login
- [ ] `POST /api/auth/forgot-password` - Password reset request
- [ ] `POST /api/auth/reset-password` - Password reset
- [ ] `GET /api/progress` - User progress (auth required)
- [ ] `POST /api/progress/mark` - Mark lesson complete (auth required)
- [ ] `DELETE /api/progress/unmark` - Mark lesson incomplete (auth required)
- [ ] `GET /api/quiz/[topic]` - Get quiz questions
- [ ] `POST /api/quiz/[topic]/submit` - Submit quiz (auth required)
- [ ] `GET /api/leaderboard` - Get leaderboard
- [ ] `GET /api/badge` - Get all badges
- [ ] `POST /api/badge/check` - Check badge unlocks (auth required)
- [ ] `POST /api/contact` - Contact form

#### Database
- [ ] Migrations run successfully
- [ ] Seed data populates correctly
- [ ] 18 quizzes with questions created
- [ ] 14 badges created
- [ ] User registration saves to DB
- [ ] Progress tracking saves to DB
- [ ] Quiz attempts save to DB

### Edge Cases

- [ ] **Offline Mode**
  - Disconnect internet
  - Navigate site
  - Verify graceful error messages
  - Reconnect
  - Check sync resumes
  
- [ ] **Long Content**
  - View lesson with 100+ lines of code
  - Verify scrolling works
  - Check performance
  
- [ ] **Empty States**
  - New user dashboard
  - No bookmarks
  - No quiz history
  - Verify friendly empty states
  
- [ ] **Error States**
  - 404 page (visit `/invalid-url`)
  - 500 error (trigger server error)
  - Network error (disconnect during API call)
  - Verify error boundaries work

## Test Results Template

```
Date: ___________
Tester: ___________
Environment: [ ] Dev [ ] Staging [ ] Production

Critical Flows Passed: _____ / 10
Performance Score: _____
Bugs Found: _____
Severity: [ ] Critical [ ] High [ ] Medium [ ] Low

Notes:
_______________________________________________________
_______________________________________________________
```

## Bug Report Template

```
**Title**: Brief description
**Severity**: Critical / High / Medium / Low
**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**: 
**Actual Behavior**: 
**Screenshot**: (if applicable)
**Browser/Device**: 
**Console Errors**: (if any)
```

## Deployment Readiness Criteria

✅ All critical user flows pass
✅ No critical bugs
✅ Performance scores > 90
✅ Accessibility score > 95
✅ All environment variables configured
✅ Analytics tracking verified
✅ Error monitoring active
✅ Documentation complete
✅ Backup/restore procedures tested

---

**Remember**: Testing is ongoing! Continue testing after deployment and gather user feedback to identify issues.
