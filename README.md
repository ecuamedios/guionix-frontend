# 🎬 GUIONIX Frontend - Script Studio Platform

> Next.js 15 frontend for the complete Guionix ecosystem with integrated backend services

## 🚀 Overview

This is the frontend application for **GUIONIX**, a comprehensive screenplay writing platform that integrates with 4 backend services to provide AI-powered script generation, Blake Snyder methodology validation, and professional export capabilities.

**🔗 Live Deployment:** https://guionix-nextjs-production.up.railway.app

## 🏗️ Architecture

### Frontend (Service #6)
- **Framework:** Next.js 15 with TypeScript
- **Authentication:** NextAuth.js with JWT
- **Database:** PostgreSQL with Prisma ORM
- **UI:** Shadcn/UI components with Tailwind CSS
- **Deployment:** Railway

### Connected Backend Services
1. **🧠 Brain Service** - Admin APIs, User Management, Workflow Approval
2. **🤖 AI Orchestrator** - Triple AI + Smart Routing + Budget Control
3. **📝 Script Engine** - Script Generation + Blake Snyder Validation  
4. **📁 Export Engine** - Export PDF, Final Draft, Fountain, Celtx

## 🔧 Setup & Configuration

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd guionix-frontend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your backend services:

```bash
cp .env.example .env.local
```

Update `.env.local` with your backend service URLs and API keys:

```bash
# Backend Services
GUIONIX_BRAIN_URL=https://guionix-brain-production.up.railway.app
GUIONIX_AI_ORCHESTRATOR_URL=https://guionix-ai-orchestrator-production.up.railway.app
GUIONIX_SCRIPT_ENGINE_URL=https://guionix-script-engine-production.up.railway.app
GUIONIX_EXPORT_ENGINE_URL=https://guionix-export-engine-production.up.railway.app

# API Keys (get from your backend services)
GUIONIX_BRAIN_API_KEY=your_brain_api_key
GUIONIX_AI_ORCHESTRATOR_API_KEY=your_ai_orchestrator_api_key
GUIONIX_SCRIPT_ENGINE_API_KEY=your_script_engine_api_key
GUIONIX_EXPORT_ENGINE_API_KEY=your_export_engine_api_key

# AI Providers
XAI_API_KEY=your_xai_api_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Database
DATABASE_URL="your_postgresql_url"

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://guionix-nextjs-production.up.railway.app
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Integration Testing

### Integration Dashboard

Visit `/integration-dashboard` to test connections to all backend services:

- **Service Health Checks** - Verify all 4 backend services are accessible
- **Live Testing** - Test specific functionality for each service
- **Configuration Validation** - Ensure environment variables are properly set

### API Testing Endpoints

```bash
# Test all services
GET /api/integration/test

# Test specific service
GET /api/integration/test?service=ai
GET /api/integration/test?service=script
GET /api/integration/test?service=export
GET /api/integration/test?service=user

# Manual service testing
POST /api/integration/test
{
  "service": "ai",
  "action": "generate",
  "payload": { "prompt": "Test prompt", "userId": "test-user" }
}
```

### Health Check

```bash
GET /api/health
```

## 🎭 Features

### 🔐 Authentication System
- NextAuth.js with JWT tokens
- Role-based permissions (SUPER_ADMIN → DIRECTOR → SUPERVISOR → EDITOR → VIEWER)
- Test credentials: `test@guionix.com` / `password123`

### 🤖 AI-Powered Script Generation
- **Triple AI System** via AI Orchestrator
  - X.AI (Grok) - Primary (cost-effective)
  - OpenAI (GPT) - Secondary
  - Anthropic (Claude) - Tertiary
- **Smart Routing** based on cost and quality
- **Budget Tracking** and usage analytics

### 📝 Blake Snyder Methodology
- **15-Beat Structure** validation
- **Real-time Structure Analysis**
- **Beat-by-Beat Editing** with validation feedback
- **Character Development** tracking

### 📁 Professional Export
- **PDF** with Blake Snyder analysis
- **Final Draft** (.fdx) - Industry standard
- **Fountain** (.fountain) - Open source format
- **Celtx** (.celtx) - Collaboration format

### 👥 User Management & Workflow
- **Role-based Access Control**
- **Approval Workflows** for supervisors
- **Team Collaboration** features
- **Activity Tracking** and analytics

## 🛠️ Development

### Project Structure

```
app/
├── (auth)/              # Authentication pages
├── (dashboard)/         # Main dashboard
├── api/                # API routes
│   ├── auth/           # NextAuth configuration
│   ├── integration/    # Backend integration testing
│   └── studio/         # Script Studio APIs
├── integration-dashboard/ # Service testing dashboard
components/
├── auth/               # Authentication components
├── dashboard/          # Dashboard components
├── studio/            # Script Studio components
└── ui/                # Shared UI components
lib/
├── services/          # Backend service integrations
│   ├── backendServices.ts  # Service clients
│   ├── aiService.ts       # AI Orchestrator integration
│   ├── scriptService.ts   # Script Engine integration
│   ├── exportService.ts   # Export Engine integration
│   └── userService.ts     # Brain Service integration
├── auth.ts            # Authentication logic
└── permissions.ts     # Role-based permissions
```

### Backend Service Integration

Each backend service has its own service client in `lib/services/`:

- **`backendServices.ts`** - Base Axios clients for all services
- **`aiService.ts`** - AI Orchestrator integration (Triple AI)
- **`scriptService.ts`** - Script Engine integration (Blake Snyder)
- **`exportService.ts`** - Export Engine integration (Multi-format)
- **`userService.ts`** - Brain Service integration (User management)

### API Proxy Configuration

The frontend uses Next.js rewrites to proxy requests to backend services:

```javascript
// next.config.js
async rewrites() {
  return [
    {
      source: '/api/backend/brain/:path*',
      destination: 'https://guionix-brain-production.up.railway.app/api/:path*'
    },
    // ... other services
  ];
}
```

## 🚀 Deployment

### Railway Deployment

The application is configured for Railway deployment with:

- **Dockerfile** for containerized deployment
- **railway.json** for Railway-specific configuration
- **Environment variables** managed through Railway dashboard

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:migrate
npm run db:seed
```

## 🔍 Troubleshooting

### Common Issues

1. **Backend Services Not Connecting**
   - Verify URLs in `.env.local`
   - Check API keys are valid
   - Use Integration Dashboard to test connections

2. **Authentication Issues**
   - Ensure `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches deployment URL
   - Verify database connection

3. **Database Connection**
   - Confirm `DATABASE_URL` is correct
   - Run `npx prisma generate`
   - Check database migrations

### Debug Mode

Enable debug logging:

```bash
DEBUG=guionix:* npm run dev
```

## 📚 Documentation

- **[Authentication Guide](./docs/authentication.md)** - Complete auth setup
- **[Backend Integration](./docs/integration.md)** - Service integration guide
- **[Blake Snyder Guide](./docs/blake-snyder.md)** - Methodology implementation
- **[Deployment Guide](./docs/deployment.md)** - Railway deployment steps

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is part of the GUIONIX ecosystem. All rights reserved.

---

**🎬 Ready to create amazing scripts with AI-powered assistance and professional Blake Snyder methodology!**
