# Backend Deployment Guide

This guide explains how to deploy the BeeCodeFi backend API to Render.com.

## Prerequisites

1. A [Render.com](https://render.com) account
2. A GitHub repository with your code
3. A PostgreSQL database (Render provides this)

## Required Environment Variables

You MUST set these environment variables in your Render dashboard:

### 1. Database Connection

```
ConnectionStrings__DefaultConnection
```

**Format for Render PostgreSQL (Internal):**
```
Host=dpg-xxxxx-a.oregon-postgres.render.com;Database=beecodefi;Username=beecodefi_user;Password=YOUR_PASSWORD;SSL Mode=Require;Trust Server Certificate=true
```

**Format for Render PostgreSQL (External):**
```
postgresql://beecodefi_user:YOUR_PASSWORD@dpg-xxxxx-a.oregon-postgres.render.com/beecodefi
```

⚠️ **Important**: Use the **Internal Database URL** format for better performance within Render.

### 2. JWT Secret Key

```
Jwt__Key
```

Generate a secure 32+ character key:
```bash
# Using openssl (Linux/Mac)
openssl rand -base64 32

# Using PowerShell (Windows)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Example: `a7Kf9mN3pQ2rT5vY8zB1cD4eF6gH9jL0mN3pQ2rT5vY`

### 3. JWT Issuer & Audience (Optional)

```
Jwt__Issuer=BEECODEFI
Jwt__Audience=BEECODEFI-Users
```

If not set, defaults will be used.

### 4. Email Service (Resend API)

```
Resend__ApiKey=re_xxxxxxxxxxxxx
Resend__FromEmail=noreply@beecodefi.com
Resend__FromName=BeeCodeFi
```

Get your API key from [Resend.com](https://resend.com/api-keys)

### 5. Frontend URL (for CORS)

The backend already includes these CORS origins:
- `http://localhost:3000` (development)
- `https://localhost:3000` (development)
- `https://beecodefi-edu.vercel.app` (production)

If your frontend URL is different, you'll need to update `Program.cs`.

## Deployment Steps

### Step 1: Create PostgreSQL Database on Render

1. Go to Render Dashboard → "New" → "PostgreSQL"
2. Name: `beecodefi-db`
3. Database: `beecodefi`
4. User: `beecodefi_user`
5. Region: Same as your web service
6. Click "Create Database"
7. **Copy the Internal Database URL** (starts with `Host=`)

### Step 2: Create Web Service on Render

1. Go to Render Dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `beecodefi-api`
   - **Region**: Same as database
   - **Branch**: `master` or `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Docker`
   - **Instance Type**: Free or Starter

### Step 3: Set Environment Variables

In your Render web service settings, add these environment variables:

```
ConnectionStrings__DefaultConnection=Host=dpg-xxxxx-a.oregon-postgres.render.com;Database=beecodefi;Username=beecodefi_user;Password=YOUR_DB_PASSWORD;SSL Mode=Require;Trust Server Certificate=true

Jwt__Key=YOUR_GENERATED_JWT_KEY_HERE

Jwt__Issuer=BEECODEFI

Jwt__Audience=BEECODEFI-Users

Resend__ApiKey=re_xxxxxxxxxxxxx

Resend__FromEmail=noreply@beecodefi.com

Resend__FromName=BeeCodeFi
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Build your Docker image
   - Run database migrations
   - Seed initial data
   - Start the API

### Step 5: Verify Deployment

Once deployed, test the API:

```bash
curl https://beecodefi-api.onrender.com/api/auth/health
```

You should get a response indicating the API is running.

## Health Check Endpoint

The API includes a health check at:
```
GET /api/auth/health
```

This is useful for monitoring and load balancers.

## Database Migrations

Migrations run automatically on startup via `SeedData.InitializeAsync()`.

To run migrations manually:

```bash
# In backend/EduPlatform.API directory
dotnet ef database update

# With specific connection string
dotnet ef database update --connection "YOUR_CONNECTION_STRING"
```

## Troubleshooting

### Issue: "ConnectionStrings__DefaultConnection environment variable is required"

**Solution**: Make sure you've set the environment variable in Render dashboard. Use the Internal Database URL for best performance.

### Issue: "Jwt__Key environment variable is required"

**Solution**: Generate a secure key (32+ characters) and set it as an environment variable.

### Issue: Database connection timeout

**Solution**: 
1. Ensure database and web service are in the same region
2. Use Internal Database URL (not External)
3. Check database is not suspended (free tier sleeps after inactivity)

### Issue: CORS errors from frontend

**Solution**: Update the CORS origins in `Program.cs`:

```csharp
policy.WithOrigins(
    "http://localhost:3000",
    "https://localhost:3000",
    "https://your-frontend-url.vercel.app")
```

### Issue: Cold starts (free tier)

**Solution**: Free tier services spin down after inactivity. First request after sleep takes 30-60 seconds. Upgrade to paid tier for always-on service.

## Environment Variables Checklist

- [ ] ConnectionStrings__DefaultConnection
- [ ] Jwt__Key (32+ characters)
- [ ] Jwt__Issuer
- [ ] Jwt__Audience
- [ ] Resend__ApiKey
- [ ] Resend__FromEmail
- [ ] Resend__FromName

## Security Notes

1. **Never commit secrets** to Git
2. Use Render's environment variables (encrypted at rest)
3. Rotate JWT keys periodically
4. Enable database backups
5. Monitor API logs for suspicious activity

## Monitoring

View logs in real-time:
```bash
render logs beecodefi-api --tail
```

Or access via Render Dashboard → Your Service → Logs

## Scaling

For production, consider:
- Upgrading to Starter tier ($7/month) for always-on service
- Enabling auto-scaling based on traffic
- Setting up a CDN for static assets
- Adding Redis for caching
- Implementing database read replicas

## Support

If you encounter issues:
1. Check Render logs for error details
2. Verify all environment variables are set correctly
3. Test database connection separately
4. Contact Render support for platform issues
