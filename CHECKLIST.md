# Getting Started Checklist

## 📋 Quick Setup Checklist

Use this checklist to walk through the complete setup process.

### ✅ Phase 1: Understand the Architecture (5 minutes)

- [ ] Read [QUICK_START.md](QUICK_START.md)
- [ ] Read [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) — Understand what was built
- [ ] Understand: Frontend (GitHub Pages) → Backend (FastAPI) → LLM (Groq/Together)

### ✅ Phase 2: Get API Key (10 minutes)

- [ ] Choose an LLM provider (recommend: [Groq](https://console.groq.com))
- [ ] Create free account
- [ ] Follow [LLM_PROVIDER_SETUP.md](LLM_PROVIDER_SETUP.md) for your provider
- [ ] Copy your API key to a safe location

### ✅ Phase 3: Local Backend Setup (10 minutes)

**On Mac/Linux:**
```bash
cd backend
bash setup.sh
```

**On Windows:**
```bash
cd backend
setup.bat
```

- [ ] Virtual environment created in `backend/venv`
- [ ] Dependencies installed
- [ ] `.env` file created

### ✅ Phase 4: Configure Backend (5 minutes)

Edit `backend/.env`:

```
GEMMA_API_KEY=gsk_YOUR_KEY_HERE
GEMMA_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
GITHUB_PAGES_ORIGIN=http://localhost:3000
```

- [ ] Pasted your API key from Phase 2
- [ ] Set correct LLM endpoint URL
- [ ] Set GITHUB_PAGES_ORIGIN to `http://localhost:3000` for now

### ✅ Phase 5: Start Backend (2 minutes)

```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn main:app --reload
```

- [ ] Backend is running ("Uvicorn running on http://127.0.0.1:8000")
- [ ] No error messages in terminal

### ✅ Phase 6: Test Backend (2 minutes)

In a new terminal:

```bash
# Test health check
curl http://localhost:8000/health

# Should show:
# {"status":"healthy","service":"SavySoil Backend","gemma_configured":true}
```

- [ ] Health check returns success
- [ ] `gemma_configured: true`

### ✅ Phase 7: Start Frontend (2 minutes)

In another new terminal (SavySoil root directory):

```bash
python -m http.server 3000
```

- [ ] Frontend running at `http://localhost:3000`

### ✅ Phase 8: Test Full Integration (5 minutes)

1. Open browser: `http://localhost:3000/index.html`
2. Select a crop and soil type
3. Set some fertilizer rates
4. Click "Check Recommendation" → Should see scores immediately ✅
5. Click "Get Advisor Review" → Should see loading... then feedback ✅

- [ ] Local scoring works ("Check Recommendation")
- [ ] Backend call works ("Get Advisor Review" shows feedback)
- [ ] No errors in browser console (F12)

### ✅ Phase 9: Production Deployment (When Ready)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for:
- Deploy backend to Render
- Deploy frontend to GitHub Pages
- Update backend URL in frontend
- Full production setup

## 📊 Verification Checklist

After each step, verify:

### ✅ Backend Health

```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy",...}

curl http://localhost:8000/docs
# Should open Swagger documentation
```

### ✅ Frontend Loads

```bash
curl http://localhost:3000/index.html
# Should return HTML (no 404 error)
```

### ✅ Advisor Button Exists

In browser console (F12):
```javascript
document.getElementById("advisor-btn")
// Should return: <button id="advisor-btn"...>
```

### ✅ Backend URL Is Correct

In browser console (F12):
```javascript
BACKEND_URL
// Should return: http://localhost:8000/review-submission
```

## 🔧 Troubleshooting Checklist

### Backend Won't Start

- [ ] Python 3.9+ installed? (`python --version`)
- [ ] In `backend/` directory?
- [ ] Virtual environment activated? (`source venv/bin/activate`)
- [ ] Dependencies installed? (`pip list | grep fastapi`)

### Health Check Fails

- [ ] Backend running? (uvicorn command in terminal showing "running")
- [ ] URL correct? (`http://localhost:8000/health`)
- [ ] Port 8000 not in use?

### "Get Advisor Review" Shows Error

- [ ] Backend running? (Can you access `/health`?)
- [ ] `.env` file correct? (Check GEMMA_API_KEY and GEMMA_ENDPOINT)
- [ ] API key valid? (Check it's copied correctly with no spaces)
- [ ] Internet connected?
- [ ] Run: `python backend/test_standalone.py` to diagnose

### CORS Error

- [ ] Frontend running on `http://localhost:3000`?
- [ ] GITHUB_PAGES_ORIGIN in `.env` is `http://localhost:3000`?
- [ ] Backend restarted after changing `.env`?

### Long Wait Time

- [ ] First request might take 30-60s (normal)
- [ ] Subsequent requests 10-30s (normal)
- [ ] Check browser for loading indicator

## 📁 File Structure Verification

After setup, you should have:

```
✅ SavySoil/
    ✅ backend/
        ✅ venv/              (created by setup.sh)
        ✅ main.py
        ✅ requirements.txt
        ✅ .env               (created by setup.sh, masked by .gitignore)
        ✅ .env.example
        ✅ .gitignore
        ✅ test_standalone.py
        [ ] render.yaml       (needed only for Render deployment)
    ✅ index.html            (updated with advisor button)
    ✅ script.js             (updated with backend integration)
    ✅ styles.css            (updated with button styling)
    ✅ QUICK_START.md
    ✅ DEPLOYMENT_GUIDE.md
    ✅ CONFIGURATION.md
    ✅ LLM_PROVIDER_SETUP.md
    ✅ IMPLEMENTATION_SUMMARY.md
```

## 🚀 Next Steps After Local Testing

**When Local Testing Works:**

1. Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Create separate `SavySoil-Backend` GitHub repository
3. Deploy backend to Render
4. Deploy frontend to GitHub Pages
5. Update backend URL in `script.js`
6. Test production version
7. Share GitHub Pages URL with students

## 📞 Common Commands Reference

```bash
# Start backend
cd backend && source venv/bin/activate && uvicorn main:app --reload

# Start frontend
python -m http.server 3000

# Test backend API
curl http://localhost:8000/health
curl http://localhost:8000/docs

# Test with Python script
python backend/test_standalone.py

# Deactivate virtual environment
deactivate

# Clear Python cache
find . -type d -name __pycache__ -exec rm -r {} +
```

## ⚠️ Important Reminders

1. **API Key Safety**
   - Never paste in code
   - Never commit `.env` to GitHub (it's in `.gitignore`)
   - Only store in environment variables

2. **Ports**
   - Backend: `8000`
   - Frontend: `3000`
   - These must not be in use by other services

3. **Virtual Environment**
   - Always activate before running backend: `source venv/bin/activate`
   - Different on Windows: `venv\Scripts\activate`
   - Deactivate when done: `deactivate`

4. **Backend URL**
   - Local: `http://localhost:8000/review-submission`
   - Production: `https://your-backend.onrender.com/review-submission`
   - Must end with `/review-submission`

5. **HTTPS for Production**
   - Always use HTTPS in production URLs
   - GitHub Pages: Automatic
   - Render: Automatic

## 🎯 Success Criteria

You'll know everything is working when:

✅ Backend starts without errors
✅ Frontend loads at `http://localhost:3000`
✅ "Check Recommendation" button works immediately
✅ "Get Advisor Review" button shows loading, then feedback
✅ Feedback contains agronomic advice about the student's plan
✅ No errors in browser console (F12)
✅ No errors in terminal where backend is running

---

**Questions? See [QUICK_START.md](QUICK_START.md) or [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)**

**Ready to go to production? See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**
