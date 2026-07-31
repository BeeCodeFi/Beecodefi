# Analytics Integration

BeeCodeFi uses Google Analytics 4 (GA4) to track user behavior and improve the platform.

## Setup

1. **Create a Google Analytics 4 Property**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new GA4 property
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add Environment Variable**
   ```bash
   # In frontend/.env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Analytics will only load in production**
   - Development builds skip analytics to avoid polluting data
   - Set `NODE_ENV=production` to test analytics locally

## Tracked Events

### Automatic Page Views
- All route changes are automatically tracked
- Includes query parameters for deep-link tracking

### Custom Events

#### Lessons
```typescript
import { trackLessonComplete } from '@/lib/analytics';

trackLessonComplete("Lesson Title", "tutorial-slug");
```

#### Quizzes
```typescript
import { trackQuizComplete } from '@/lib/analytics';

trackQuizComplete("html-basics", 8, 10); // 80% score
```

#### Videos
```typescript
import { trackVideoStart, trackVideoComplete } from '@/lib/analytics';

trackVideoStart("Video Title", "course-slug");
trackVideoComplete("Video Title", "course-slug");
```

#### User Actions
```typescript
import { trackUserSignup, trackUserLogin, trackSearch } from '@/lib/analytics';

trackUserSignup("email");
trackUserLogin("email");
trackSearch("javascript arrays");
```

#### Badges
```typescript
import { trackBadgeUnlock } from '@/lib/analytics';

trackBadgeUnlock("First Steps");
```

#### CTAs
```typescript
import { trackCTAClick } from '@/lib/analytics';

trackCTAClick("Start Learning", "Hero");
```

#### Feedback
```typescript
import { trackFeedback } from '@/lib/analytics';

trackFeedback("yes", "html-basics-lesson-1");
```

## Privacy

- **IP Anonymization**: Enabled by default (`anonymize_ip: true`)
- **Cookie Flags**: Set to `SameSite=None;Secure` for cross-site compatibility
- **GDPR Compliant**: Users can opt-out via browser settings
- **No PII**: We never track personally identifiable information

## Data Retention

- Google Analytics retains data for 14 months by default
- Can be configured in GA4 admin settings

## Reports to Monitor

1. **User Engagement**
   - Active users
   - Session duration
   - Pages per session

2. **Learning Metrics**
   - Lesson completion rate
   - Quiz performance
   - Video watch time

3. **Conversion Funnel**
   - Visitor → Registration
   - Registration → First Lesson
   - First Lesson → Quiz Completion

4. **Popular Content**
   - Most viewed lessons
   - Highest-rated tutorials
   - Most completed quizzes

## Debugging

Check if analytics is working:
```javascript
// Open browser console on production site
window.dataLayer // Should exist
window.gtag // Should be a function
```

View real-time data:
- Go to Google Analytics
- Navigate to Reports → Realtime
- Trigger events and watch them appear
