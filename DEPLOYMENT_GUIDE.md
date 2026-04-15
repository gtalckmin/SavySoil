# SavySoil - Deployment Guide

This guide walks you through the complete setup for deploying SavySoil with a secure backend architecture.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│ GitHub Pages (Frontend)                                 │
│ - HTML, CSS, JavaScript                                 │
│ - Static hosting (no backend code or secrets)            │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTPS POST
                  │ /review-submission
                  │
┌─────────────────▼───────────────────────────────────────┐
│ Render/Railway (Backend - FastAPI)                      │
│ - Python FastAPI server                                 │
│ - GEMMA_API_KEY stored as environment variable          │
│ - CORS restricts requests to GitHub Pages               │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTPS (server-to-server)
                  │
┌─────────────────▼───────────────────────────────────────┐
│ Gemma LLM Provider (Groq, Together, or local)           │
│ - Provides agronomic feedback                           │
│ - Backend is only one with API key access               │
└─────────────────────────────────────────────────────────┘
```

**Key Security Points:**
- Frontend NEVER contains your API key
- API key exists only as a Render environment variable
- Network requests are HTTPS (encrypted)
- Backend validates all inputs with Pydantic
- CORS restricts API access to your GitHub Pages URL only

## Step 1: Deploy Frontend to GitHub Pages

The frontend is already configured for GitHub Pages.

```bash
cd /path/to/SavySoil
git init
git add .
git commit -m "Initial SavySoil"
git remote add origin https://github.com/YOUR_USERNAME/SavySoil.git
git branch -M main
git push -u origin main
```

In GitHub, go to **Settings → Pages** and enable GitHub Pages for the `main` branch.

Your site will be available at: `https://YOUR_USERNAME.github.io/SavySoil/`

## Step 2: Create a Separate Backend Repository

The backend should be in its own repository for cleaner deployment.

```bash
# Create a new folder for the backend repository
mkdir ~/SavySoil-Backend
cd ~/SavySoil-Backend

# Copy backend files from your SavySoil folder
cp -r /path/to/SavySoil/backend/* .

# Initialize git
git init
git add .
git commit -m "Initial SavySoil backend"
git remote add origin https://github.com/YOUR_USERNAME/SavySoil-Backend.git
git branch -M main
git push -u origin main
```

## Step 3: Get an LLM API Key

Choose one LLM provider:

### Option A: Groq (Recommended for Free Tier)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free account)
3. Go to **API Keys** and create a new key
4. Copy the key (starts with `gsk_`)
5. Keep this safe; you'll add it to Render

**Example Groq endpoint:** `https://api.groq.com/openai/v1/chat/completions`

### Option B: Together.ai

1. Go to [together.ai](https://www.together.ai)
2. Sign up and create an API key
3. Find it in your account settings
4. Keep this safe

**Example Together endpoint:** `https://api.together.xyz/v1/chat/completions`

### Option C: Local vLLM (Advanced)

If you have GPU resources, run:
```bash
docker run --gpus all -p 8000:8000 vllm/vllm-openai:latest \
  --model meta-llama/Llama-2-7b-chat-hf
```

**Local endpoint:** `http://your-machine-ip:8000/v1/chat/completions`

## Step 4: Deploy Backend to Render

### Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up (free account)

### Create Web Service

1. Click **New +** → **Web Service**
2. Select your `SavySoil-Backend` repository
3. Fill in the form:
   - **Name:** `savysoil-backend`
   - **Environment:** Python 3
   - **Region:** Choose nearest to you
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn backend.main:app --host 0.0.0.0`
   - **Instance Type:** Free (for now)

4. Click **Advanced** and set environment variables:

| Key | Value |
|-----|-------|
| `GEMMA_API_KEY` | Paste your Groq/Together API key here |
| `GEMMA_ENDPOINT` | `https://api.groq.com/openai/v1/chat/completions` |
| `GITHUB_PAGES_ORIGIN` | `https://YOUR_USERNAME.github.io` |

5. Click **Create Web Service**

The deployment will start. Wait for the "Live" status (usually 2-3 minutes).

**Your backend URL will be something like:** `https://savysoil-backend.onrender.com`

### Test the Backend

1. Copy your backend URL
2. In a terminal, run:
   ```bash
   curl https://savysoil-backend.onrender.com/health
   ```

You should see:
```json
{
  "status": "healthy",
  "service": "SavySoil Backend",
  "gemma_configured": true
}
```

## Step 5: Update Frontend with Backend URL

Edit your GitHub-deployed version of `script.js` (or push the updated file):

```javascript
// Around line 180, change:
const BACKEND_URL = "http://localhost:8000/review-submission";

// To:
const BACKEND_URL = "https://savysoil-backend.onrender.com/review-submission";
```

Then commit and push:

```bash
git add script.js
git commit -m "Update backend URL to Render endpoint"
git push
```

GitHub Pages will redeploy automatically (usually within 1 minute).

## Step 6: Test the Full Integration

1. Visit your GitHub Pages site: `https://YOUR_USERNAME.github.io/SavySoil/`
2. Set up a scenario (crop and soil)
3. Enter a fertilizer plan
4. Click "Check Recommendation" (scores are calculated locally)
5. Click "Get Advisor Review" (calls your backend)

You should see agronomic feedback from Gemma within 10-30 seconds.

## Troubleshooting

### Backend Returns 502 Bad Gateway

**Cause:** API key issue or LLM endpoint is down

**Solution:**
1. Go to Render dashboard
2. Click your service
3. Check the logs: **Logs** tab
4. Verify environment variables are set correctly:
   ```bash
   echo $GEMMA_API_KEY
   ```
5. Test your API key directly:
   ```bash
   curl -H "Authorization: Bearer YOUR_KEY" \
     https://api.groq.com/openai/v1/chat/completions
   ```

### CORS Error in Browser

**Error:** "Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy"

**Cause:** Backend URL in frontend doesn't match your deployed URL

**Solution:**
1. Check `script.js` line ~180 for `BACKEND_URL`
2. Verify it matches your Render URL exactly
3. Verify backend has correct `GITHUB_PAGES_ORIGIN` environment variable

### Frontend Can't Reach Backend

**Error:** Network error or timeout in console

**Cause:** Backend is not running or URL is wrong

**Solution:**
1. Test backend health: `curl https://your-backend-url.com/health`
2. Check Render logs for server errors
3. If using local backend, verify it's running: `uvicorn backend.main:app --reload`

## Production Checklist

- [ ] Frontend deployed to GitHub Pages
- [ ] Backend deployed to Render
- [ ] `GEMMA_API_KEY` is set as Render environment variable (NOT in code)
- [ ] `GITHUB_PAGES_ORIGIN` matches your actual GitHub Pages URL
- [ ] `script.js` backend URL points to your Render service
- [ ] HTTPS is used everywhere (automatic on Render and GitHub Pages)
- [ ] Tested "Get Advisor Review" button end-to-end
- [ ] Backend logs show successful requests

## Cost & Quotas

### GitHub Pages
- **Cost:** Free
- **Limits:** 100 GB/month bandwidth, 4 GB storage

### Render (Free Tier)
- **Cost:** Free
- **Limits:** 400 compute hours/month; service spins down after 15 minutes of inactivity
- **Considerations:** First request after idle will be slow (~30 seconds)

### Groq (Free Tier)
- **Cost:** Free
- **Limits:** Rate-limited (check console.groq.com for current limits)
- **Quota:** Usually sufficient for educational use

## Next Steps

1. Monitor Render logs for errors
2. Set up email alerts for deployment failures
3. Consider upgrading Render if you exceed free tier limits
4. Track API usage on Groq/Together dashboard

## Support

For issues:
1. Check Render logs: `https://dashboard.render.com`
2. Test backend independently
3. Check browser console for errors (F12)
4. Verify all environment variables are set
