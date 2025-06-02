# Google OAuth Setup Guide

To enable Google authentication in GUIONIX, you need to set up Google OAuth credentials:

## Steps:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select Project**
   - Create a new project or select existing one
   - Project name suggestion: "GUIONIX Authentication"

3. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - http://localhost:3002/api/auth/callback/google
     - https://your-production-domain.com/api/auth/callback/google

5. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Replace in .env.local:
     ```
     GOOGLE_CLIENT_ID="your-actual-client-id"
     GOOGLE_CLIENT_SECRET="your-actual-client-secret"
     ```

6. **Restart Development Server**
   - Stop and restart `npm run dev`

## Current Status:
- ✅ NextAuth.js configured
- ✅ Google provider setup
- ⚠️  Placeholder credentials (need real ones)
- ✅ Database ready for user storage

## Test Authentication:
1. Go to http://localhost:3002/login
2. Click "Sign in with Google"
3. Complete OAuth flow
4. Check Prisma Studio for user creation

## Development Bypass:
- Use http://localhost:3002/dev-login for testing without OAuth
- Use http://localhost:3002/dev-dashboard for dashboard without auth
