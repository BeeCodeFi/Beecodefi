# Backend Deployment Guide

This guide explains how to deploy the BeeCodeFi backend API to Render.com with a Neon PostgreSQL database.

## Prerequisites

1. A [Render.com](https://render.com) account
2. A GitHub repository with your code
3. A Neon PostgreSQL project

## Required Environment Variables

You MUST set these environment variables in your Render dashboard:

### 1. Database Connection

```
ConnectionStrings__DefaultConnection
```

**Recommended Neon connection URL:**
Copy the pooled or direct connection string from the Neon dashboard. It normally looks like this:

```
postgresql://neondb_owner:YOUR_PASSWORD@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Key-value format:**

```
Host=ep-example.us-east-2.aws.neon.tech;Database=neondb;Username=neondb_owner;Password=YOUR_PASSWORD;SSL Mode=Require
```

**Do not use a Render `dpg-...` hostname unless the database is hosted by Render.** The value below is incomplete and contains placeholders:

```
dpg-xxxxx-a.oregon-postgres.render.com;Database=beecodefi;Username=beecodefi_user;Password=YOUR_DB_PASSWORD
```

Set the complete Neon URL as `ConnectionStrings__DefaultConnection` in Render. The application also accepts the `DATABASE_URL` variable when the nested connection-string variable is not set.

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

### 4. Admin Analytics Access

```
Admin__Email=kumaryursh@gmail.com
```

The `/admin` dashboard and `/api/admin/analytics` endpoint are restricted by the backend to the email configured here. The default matches the existing project account. If `kumaryursh@gmal.com` is intentional, set that exact value in Render and ensure the signed-in account uses the same email.

### 5. Email Service (Resend API)

```
Resend__ApiKey=re_xxxxxxxxxxxxx
Resend__FromEmail=noreply@beecodefi.com
Resend__FromName=BeeCodeFi
```

Get your API key from [Resend.com](https://resend.com/api-keys)

### 6. Frontend URL (for CORS)

The backend already includes these CORS origins:

- `http://localhost:3000` (development)
- `https://localhost:3000` (development)
- `https://beecodefi-edu.vercel.app` (production)

If your frontend URL is different, you'll need to update `Program.cs`.

## Deployment Steps

### Step 1: Create PostgreSQL Database on Neon

1. Create or open your project in the [Neon Console](https://console.neon.tech/).
2. Create the `beecodefi` database if it does not already exist.
3. Select **Connect**, choose the `Node.js` or `ADO.NET` connection format, and copy the complete connection string.
4. Keep the password URL-encoded if it contains characters such as `@`, `:`, `/`, or `#`.

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
ConnectionStrings__DefaultConnection=postgresql://neondb_owner:YOUR_PASSWORD@ep-example.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

Jwt__Key=YOUR_GENERATED_JWT_KEY_HERE

Jwt__Issuer=BEECODEFI

Jwt__Audience=BEECODEFI-Users

Admin__Email=kumaryursh@gmail.com

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

### Issue: "ConnectionStrings\_\_DefaultConnection environment variable is required"

**Solution**: Make sure you've set the environment variable in the Render dashboard to the complete Neon connection string. It must include the `postgresql://` prefix, Neon hostname, database, username, and password.

### Issue: "Jwt\_\_Key environment variable is required"

**Solution**: Generate a secure key (32+ characters) and set it as an environment variable.

### Issue: Database connection timeout

**Solution**:

1. Confirm the Neon project is active and the connection string points to the correct branch.
2. Use the complete Neon pooled connection string from the Neon Console.
3. Confirm `sslmode=require` is present.

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

- [ ] ConnectionStrings\_\_DefaultConnection
- [ ] Jwt\_\_Key (32+ characters)
- [ ] Jwt\_\_Issuer
- [ ] Jwt\_\_Audience
- [ ] Resend\_\_ApiKey
- [ ] Resend\_\_FromEmail
- [ ] Resend\_\_FromName

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
