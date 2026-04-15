# SavySoil Backend Integration - Quick Start

## What Was Just Set Up

Your SavySoil application now has:

1. **Frontend (GitHub Pages)** — Your existing HTML/CSS/JavaScript
2. **Secure Backend (FastAPI)** — Handles Gemma LLM calls with a secure API key
3. **LLM Integration** — Provides AI-powered agronomic feedback to students

## Architecture

```
Student Browser (GitHub Pages)
    ↓
    └─→ [Check Recommendation] — Local scoring
    └─→ [Get Advisor Review] — Calls your backend
                                ↓
                        Backend (Render)
                        Holds API key safely
                                ↓
                        Gemma LLM Provider
                        (Groq, Together, etc.)
```

## What You Need to Do

### Phase 1: Local Testing (Today)

1. **Get an LLM API Key**
   - Go to [console.groq.com](https://console.groq.com)
   - Sign up (free)
   - Generate an API key
   - Follow: [LLM_PROVIDER_SETUP.md](LLM_PROVIDER_SETUP.md)

2. **Set Up Backend Locally**
   ```bash
   cd backend
   
   # On Mac/Linux:
   bash setup.sh
   
   # On Windows:
   setup.bat
   ```

3. **Edit `.env` File**
   ```
   GEMMA_API_KEY=gsk_YOUR_API_KEY
   GEMMA_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
   GITHUB_PAGES_ORIGIN=http://localhost:3000
   ```

4. **Start Backend**
   ```bash
   source venv/bin/activate  # Or: venv\Scripts\activate on Windows
   uvicorn main:app --reload
   ```

5. **Start Frontend**
   ```bash
   # Open another terminal in the root SavySoil directory
   python -m http.server 3000
   # Visit: http://localhost:3000/index.html
   ```

6. **Test It**
   - Open frontend
   - Create a recommendation
   - Click "Check Recommendation"
   - Click "Get Advisor Review"
   - You should see Gemma's feedback!

### Phase 2: Deploy to Production (When Ready)

1. **Create Backend Repository**
   - New GitHub repo: `SavySoil-Backend`
   - Push `backend/` folder to it

2. **Deploy on Render**
   - Sign up at [render.com](https://render.com)
   - Connect `SavySoil-Backend` repository
   - Add environment variables (GEMMA_API_KEY, etc.)
   - Deploy

3. **Update Frontend** (`script.js`)
   ```javascript
   const BACKEND_URL = "https://your-deployed-backend-url.com/review-submission";
   ```

4. **Deploy Frontend**
   - Push updated files to GitHub
   - GitHub Pages auto-deploys

5. **Test Production**
   - Visit your GitHub Pages URL
   - Click "Get Advisor Review"
   - Verify it works

## Documentation

| File | Purpose |
|------|---------|
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Step-by-step deployment instructions |
| [CONFIGURATION.md](CONFIGURATION.md) | Environment variables and configuration |
| [LLM_PROVIDER_SETUP.md](LLM_PROVIDER_SETUP.md) | How to set up Groq, Together, OpenAI, etc. |
| [backend/README.md](backend/README.md) | Backend-specific documentation |

## File Structure

```
SavySoil/
├── index.html                 ← Frontend (GitHub Pages)
├── script.js                  ← Updated with backend URL
├── styles.css                 ← Updated with new button styles
├── script.ts                  ← TypeScript source (optional)
├── DEPLOYMENT_GUIDE.md        ← Complete deployment guide
├── CONFIGURATION.md           ← Configuration reference
├── LLM_PROVIDER_SETUP.md      ← LLM setup instructions
│
└── backend/                   ← Backend (separate deployment)
    ├── main.py               ← FastAPI server with Gemma integration
    ├── requirements.txt      ← Python dependencies
    ├── .env.example         ← Template for environment variables
    ├── .gitignore           ← Prevents committing secrets
    ├── README.md            ← Backend documentation
    ├── render.yaml          ← Render deployment config
    ├── setup.sh             ← Linux/Mac setup script
    └── setup.bat            ← Windows setup script
```

## Key Features

✅ **Secure** — API key never exposed to frontend
✅ **Scalable** — Backend can handle multiple students
✅ **Validated** — Pydantic models validate all inputs
✅ **Fast** — Async FastAPI for quick responses
✅ **Documented** — Comprehensive setup and deployment guides
✅ **Production-Ready** — CORS, error handling, logging

## Security Checklist

Before deploying to production:

- [ ] API key is **never** in code (only environment variables)
- [ ] `.env` is in `.gitignore`
- [ ] Backend validates all student inputs
- [ ] CORS is restricted to your GitHub Pages domain
- [ ] HTTPS is used everywhere
- [ ] Error messages don't leak sensitive info

## Common Questions

### Q: Why a separate backend?
**A:** GitHub Pages can't run Python or store secrets safely. A backend keeps your API key secure and away from students' browsers.

### Q: How much will this cost?
**A:** With free tiers:
- GitHub Pages: Free forever
- Render backend: Free (but may be slow after 15 min inactivity)
- Groq API: Free tier (~500 requests/day)
- **Total:** $0/month for a classroom

### Q: How many students can use this?
**A:** With free tiers, probably 20-50 simultaneous users. Scale up if needed.

### Q: Can students see the API key?
**A:** No. The key lives only on your backend server. Students only see network requests to your backend URL.

### Q: What if the backend is down?
**A:** Local scoring still works ("Check Recommendation"), but "Get Advisor Review" will show an error. Students can still play and get scores.

## Next Steps

1. ✅ You've already installed backend files
2. ⏭️ **Local Testing** → Follow Phase 1 above
3. ⏭️ **Production Deployment** → Follow Phase 2 + [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
4. ⏭️ **Share with Students** → Give them your GitHub Pages URL

## Getting Help

1. **Backend won't start?**
   - Check Python version: `python --version` (need 3.9+)
   - Check .env file is correct
   - Check [CONFIGURATION.md](CONFIGURATION.md)

2. **"Get Advisor Review" returns error?**
   - Check backend is running: `curl http://localhost:8000/health`
   - Check API key in .env is correct
   - Check GEMMA_ENDPOINT URL is correct
   - Follow [LLM_PROVIDER_SETUP.md](LLM_PROVIDER_SETUP.md)

3. **CORS error in browser?**
   - Check GITHUB_PAGES_ORIGIN is correct in .env
   - Should be `http://localhost:3000` for local testing
   - Should be `https://your-username.github.io` for production

4. **Deployment questions?**
   - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
   - Each step has troubleshooting section

## Support Resources

- **FastAPI (Backend):** https://fastapi.tiangolo.com
- **Render (Hosting):** https://render.com/docs
- **Groq (LLM):** https://console.groq.com/docs

---

**You're all set! Start with Phase 1 Local Testing above. Good luck! 🌱**
