# Frontend Coding Standards Report

## Executive Summary
Analysis of 40+ frontend files identified 8 major categories of inconsistencies that should be standardized for maintainability and code quality.

## Critical Issues (Fix Required)

### 1. **Export Pattern Inconsistency** (Priority: HIGH)
**Problem**: Mix of default exports and named exports across components
- `Navbar.tsx`, `Hero.tsx`, `Footer.tsx`, `SettingsTab.tsx`, `OverviewTab.tsx` → **default export**
- `ErrorBoundary.tsx` → **named export** 
- Pages (`register/page.tsx`, `login/page.tsx`) → **default export**
- Hooks (`useStreak.ts`, `useBadges.ts`, `useBookmarks.ts`) → **named export**

**Standard**: Use default exports for page components and named exports for utilities/hooks
**Impact**: Inconsistent import statements, harder to refactor

### 2. **Error Handling Pattern Inconsistency** (Priority: HIGH)
**Problem**: Three different error handling patterns across the codebase

**Pattern A** (register/page.tsx):
```typescript
catch (err: unknown) {
  const errorMessage = err instanceof Error ? err.message : "Registration failed";
  if (typeof err === "object" && err !== null && "response" in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    setError(axiosErr.response?.data?.message || errorMessage);
  }
}
```

**Pattern B** (login/page.tsx):
```typescript
catch {
  setError("Invalid email or password. Please try again.");
}
```

**Pattern C** (useBadges.ts):
```typescript
catch (error) {
  console.error("Failed to fetch badges:", error);
}
```

**Standard**: Use enhanced AxiosError from api.ts with `userMessage` property
**Impact**: Inconsistent user experience, some errors not properly surfaced to users

### 3. **State Management Patterns** (Priority: MEDIUM)
**Problem**: Inconsistent patterns for managing loading/error states
- Some hooks return `{ data, loading, error }` tuple
- Others manage state internally and just return data
- Some use toast context for errors, others return error state

**Example**:
- `useBadges` → manages loading internally, console.error for errors
- `useBookmarks` → manages state internally, uses toast for feedback
- `useStreak` → just returns data, no error handling

**Standard**: Hooks should return consistent interface: `{ data, loading, error, refetch }`
**Impact**: Unpredictable component patterns, harder to handle edge cases

### 4. **Type Safety Issues** (Priority: MEDIUM)
**Problem**: Inconsistent type annotations in error handlers
- AuthContext: `try/catch` with no type annotation
- register/page: `catch (err: unknown)` with manual type guards
- login/page: `catch` with no error binding
- useBadges: `catch (error)` with implicit `any`

**Standard**: Always use `catch (error: unknown)` and type guards
**Impact**: Potential runtime errors, loss of type safety benefits

### 5. **API Error Handling** (Priority: HIGH)
**Problem**: `api.ts` enhances errors with `userMessage` but components don't use it
- Enhanced error properties: `userMessage`, `isRetryable`
- Components still do manual error message extraction
- Some components ignore enhanced properties entirely

**Example (AuthContext.tsx line 38)**:
```typescript
const { data } = await api.post<AuthResponse>("/auth/login", {
  email,
  password,
});
```
No error handling here - relies on component to catch

**Standard**: Always handle errors from API calls and use enhanced properties
**Impact**: User-unfriendly error messages, missed retry opportunities

### 6. **Async Pattern Inconsistency** (Priority: LOW)
**Problem**: Mix of async/await and promises
- Most code uses async/await (good)
- Some useEffect callbacks use `.then()` chains (old pattern)

**Standard**: Use async/await consistently, avoid promise chains
**Impact**: Harder to read, inconsistent error handling

### 7. **Import Organization** (Priority: LOW)
**Problem**: No consistent import ordering
- Some files: react → next → lucide → local
- Others: mix of third-party and local imports
- No clear separation

**Standard**: Group imports: (1) React/Next, (2) Third-party, (3) Local absolute, (4) Local relative
**Impact**: Harder to scan imports, merge conflicts

### 8. **Component Structure** (Priority: LOW)
**Problem**: Inconsistent component internal organization
- Some: hooks → handlers → render
- Others: state → effects → handlers → render
- No consistent pattern for where to place helper functions

**Standard**: Follow pattern: interfaces → hooks → state → effects → handlers → computed → render
**Impact**: Harder to navigate large components

## Positive Patterns (Keep)
✅ Consistent use of Tailwind CSS classes
✅ Good TypeScript coverage
✅ Consistent use of Framer Motion for animations
✅ Proper use of context API (AuthContext, ToastContext)
✅ Custom hooks are well-organized
✅ API client with interceptors is well-designed
✅ Error boundary implementation

## Recommendations

### Immediate Actions (This Session)
1. **Standardize error handling**: Create `useApiCall` hook that wraps API calls with consistent error handling
2. **Fix ErrorBoundary export**: Change to default export for consistency
3. **Update all API error handlers**: Use enhanced `userMessage` from api.ts
4. **Add missing error handling**: Add try/catch to all async operations

### Future Improvements (Document for Later)
5. **Create ESLint rules**: Enforce import ordering, export patterns
6. **Refactor hooks**: Return consistent `{ data, loading, error }` interface
7. **Type all error handlers**: Enforce `catch (error: unknown)` pattern
8. **Component structure guide**: Document preferred internal organization

## Files Requiring Changes

### High Priority (Error Handling)
- `frontend/src/context/AuthContext.tsx` - Add proper error handling to login/register
- `frontend/src/hooks/useBadges.ts` - Use toast for errors instead of console.error
- `frontend/src/app/register/page.tsx` - Simplify error handling using userMessage
- `frontend/src/app/login/page.tsx` - Add error type annotation

### Medium Priority (Patterns)
- `frontend/src/components/ErrorBoundary.tsx` - Change to default export
- `frontend/src/hooks/useStreak.ts` - Add error handling
- `frontend/src/hooks/useBookmarks.ts` - Return error state

### Low Priority (Cleanup)
- All component files - Organize imports consistently
- Large components - Refactor into smaller sub-components

## Metrics
- **Total Files Analyzed**: 40+
- **Critical Issues**: 5
- **Medium Issues**: 2
- **Low Priority Issues**: 3
- **Estimated Fix Time**: 2-3 hours

---
Report Generated: August 3, 2026
