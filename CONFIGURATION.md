# Configuration Guide

## Quick Reference

### Frontend URL
Replace `YOUR_USERNAME` with your GitHub username.

```
https://YOUR_USERNAME.github.io/SavySoil/
```

### Backend URL (After Deployment)

After deploying to Render, your backend URL will look like:
```
https://savysoil-backend.onrender.com
```

Or if using Railway:
```
https://savysoil-backend.railway.app
```

## Updating Backend URL in Frontend

The frontend's backend URL is hardcoded in `script.js`.

**File:** `script.js` (Line ~180)

```javascript
const BACKEND_URL = "https://YOUR_BACKEND_URL.com/review-submission";
```

### Complete URL Format

The URL must end with `/review-submission`:
```
https://savysoil-backend.onrender.com/review-submission
```

## Environment Variables (Backend Only)

These are set in your Render/Railway dashboard, **NOT** in the code.

### Required Variables

| Variable | Example Value | Where to Get |
|----------|---------------|-------------|
| `GEMMA_API_KEY` | `gsk_xxxx...` | Your LLM provider (Groq, Together, etc.) |
| `GEMMA_ENDPOINT` | `https://api.groq.com/openai/v1/chat/completions` | Your LLM provider documentation |
| `GITHUB_PAGES_ORIGIN` | `https://gtalckmin.github.io` | Your GitHub Pages URL |

### Optional Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8000` | Port the server listens on |

## Testing Locally

### Start Backend Locally

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Update Frontend for Local Testing

Edit `script.js`:
```javascript
const BACKEND_URL = "http://localhost:8000/review-submission";
```

### Open Frontend in Browser

```bash
# Option 1: Use Python's built-in server
python -m http.server 8001

# Then open: http://localhost:8001/index.html
```

## Deployment Platforms

### Render (Recommended for Beginners)

**Sign up:** https://render.com

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
uvicorn backend.main:app --host 0.0.0.0
```

### Railway

**Sign up:** https://railway.app

Similar setup to Render. Railway will auto-detect Python and create the Procfile.

### Google Cloud Run

**Setup:** https://cloud.google.com/run/docs/quickstarts/build-and-deploy

More manual setup, but also free tier available.

## Common Issues

### "Advisor Review" button returns an error

**Check:**
1. Is the backend URL correct in `script.js`?
2. Is the backend running?
3. Is the `GEMMA_API_KEY` set on the backend?

**Test:**
```bash
curl https://your-backend-url.com/health
```

### CORS error in browser console

**Solution:**
1. Verify `GITHUB_PAGES_ORIGIN` environment variable is set correctly
2. It must match your deployed frontend URL exactly
3. Restart the backend after changing environment variables

### Slow response times

This is normal:
- **First response:** May take 30-60 seconds (backend initializing)
- **Subsequent responses:** Usually 10-30 seconds (LLM processing)

The free tier of Render auto-scales down when inactive, causing the initial delay.

## Security Checklist

- [ ] API key is in backend environment variables only
- [ ] API key is NOT in any Python files or committed to GitHub
- [ ] `.env` and `*.key` files are in `.gitignore`
- [ ] Frontend uses HTTPS (automatic on GitHub Pages and Render)
- [ ] CORS is configured to your specific GitHub Pages domain
- [ ] No secrets are logged to stdout

## Rate Limits & Quotas

### Render Free Tier
- 400 compute hours/month
- Service spins down after 15 minutes of inactivity
- Sufficient for educational use

### Groq Free Tier
- Rate limited (~2-5 req/min depending on model)
- Check your dashboard for current limits
- Upgrades available for higher volume

## Next Steps

1. Deploy backend following [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Update `script.js` with your backend URL
3. Test the "Get Advisor Review" button
4. Share your GitHub Pages URL with students
