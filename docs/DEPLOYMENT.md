# 🚀 DEPLOYMENT GUIDE - AFORTU PRO

## Automatic Deployment Setup

This repository is configured for automatic deployment using GitHub Actions and Vercel.

### 🔧 Setup Instructions

#### 1. Vercel Setup
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. Get your tokens and IDs:
   - **Vercel Token**: Settings → Tokens → Create
   - **Organization ID**: Settings → General
   - **Project ID**: Project Settings → General

#### 2. GitHub Secrets Configuration
Add these secrets to your GitHub repository:
- Go to: Repository → Settings → Secrets and variables → Actions

```
VERCEL_TOKEN=your_vercel_token_here
ORG_ID=your_org_id_here  
PROJECT_ID=your_project_id_here
```

#### 3. Deployment Triggers

**Automatic Deployments:**
- ✅ **Production**: Every push to `main` branch
- ✅ **Preview**: Every Pull Request
- ✅ **Security**: Runs audit checks
- ✅ **Quality**: Runs linting and formatting

### 📦 Manual Deployment Commands

```bash
# Production deployment
npm run deploy

# Preview deployment  
npm run deploy:preview

# Build and deploy
npm run vercel:deploy

# Clean build artifacts
npm run clean
```

### 🌐 Deployment Environments

| Environment | URL | Trigger |
|-------------|-----|---------|
| **Production** | `https://afortu-pro.vercel.app` | Push to main |
| **Preview** | `https://afortu-pro-*.vercel.app` | Pull requests |
| **Development** | `http://localhost:3001` | Local development |

### 🔍 Build & Quality Checks

The deployment pipeline includes:

- **🔨 Build**: Next.js production build
- **🧪 Tests**: Automated testing (if available)  
- **🔍 Linting**: Code quality checks
- **💅 Formatting**: Prettier formatting checks
- **🔒 Security**: npm audit for vulnerabilities
- **📊 Dependencies**: Update checks

### 🛠️ Environment Variables

For production deployment, set these in Vercel:

```bash
NODE_ENV=production
# Add your API keys and configuration here
```

### 📈 Monitoring & Analytics

- **Vercel Analytics**: Enabled automatically
- **Performance**: Core Web Vitals monitoring
- **Errors**: Real-time error tracking
- **Logs**: Function execution logs

### 🚨 Troubleshooting

**Common Issues:**

1. **Build Fails**: Check build logs in GitHub Actions
2. **Deploy Fails**: Verify Vercel tokens and IDs
3. **Environment Issues**: Check Vercel environment variables

**Debug Commands:**
```bash
# Check build locally
npm run build

# Verify all dependencies
npm ci

# Run quality checks
npm run check
```

### 📞 Support

- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Deploy**: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **GitHub Actions**: [https://docs.github.com/en/actions](https://docs.github.com/en/actions)

---

## 🎯 Quick Start

1. **Push to main** → Automatic production deploy
2. **Create PR** → Automatic preview deploy  
3. **Merge PR** → Updates production

That's it! Your AFORTU PRO app will be live and automatically updated. ⚡
