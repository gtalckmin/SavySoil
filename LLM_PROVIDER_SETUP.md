# LLM Provider Setup

Choose one of these providers to power Gemma. Each has a free tier suitable for educational deployment.

## Groq (Recommended)

**Why:** Fastest inference, generous free tier, simplest setup.

### Step 1: Create Account

1. Go to [console.groq.com](https://console.groq.com)
2. Click "Sign Up" and create an account (email or GitHub)
3. Verify your email

### Step 2: Generate API Key

1. In the console, go to **API Keys** (left sidebar)
2. Click **"Create API Key"**
3. Name it (e.g., "SavySoil")
4. Copy the key (starts with `gsk_`)
5. **Save this somewhere safe** (you'll only see it once)

### Step 3: Get Environment Variables

Add these to your Render/Railway dashboard:

```
GEMMA_API_KEY=gsk_YOUR_KEY_HERE
GEMMA_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
```

### Step 4: Test

```bash
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer gsk_YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma-7b-it",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

You should get back a JSON response with the model's reply.

### Available Models

- `gemma-7b-it` — Recommended for SavySoil (7B, instruction-tuned)
- `gemma-7b` — Faster but less instruction-tuned
- `mixtral-8x7b-32768` — Larger, more capable (different pricing)

### Quotas

Check at [console.groq.com/limits](https://console.groq.com/limits). Free tier is usually sufficient for classroom use.

---

## Together.ai

**Why:** Good variety of models, decent free tier.

### Step 1: Create Account

1. Go to [together.ai](https://www.together.ai)
2. Click "Start Building" → Sign up
3. Verify your email

### Step 2: Generate API Key

1. In the dashboard, go to **Settings** → **API Keys**
2. Click **"Create New API Key"**
3. Copy the key (starts with `${...}`)
4. **Save this somewhere safe**

### Step 3: Get Environment Variables

```
GEMMA_API_KEY=YOUR_KEY_HERE
GEMMA_ENDPOINT=https://api.together.xyz/v1/chat/completions
```

### Step 4: Test

```bash
curl -X POST https://api.together.xyz/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Available Models

For SavySoil, use:
- `meta-llama/Llama-2-7b-chat-hf` — Good for agronomic advice
- `mistralai/Mixtral-8x7B-Instruct-v0.1` — Larger, more capable
- `meta-llama/Meta-Llama-3-8B-Instruct` — Newer, very good quality

### Quotas

Check your dashboard for current limits. Free tier includes spending credits.

---

## OpenAI (GPT-4 / GPT-3.5)

**Why:** Highest quality responses, but not free.

### Step 1: Create Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up
3. Add a payment method

### Step 2: Generate API Key

1. Go to **API Keys** (left sidebar)
2. Click **"Create new secret key"**
3. Copy the key (starts with `sk-`)
4. **Save this somewhere safe**

### Step 3: Get Environment Variables

```
GEMMA_API_KEY=sk_YOUR_KEY_HERE
GEMMA_ENDPOINT=https://api.openai.com/v1/chat/completions
```

### Step 4: Update Backend

In `backend/main.py`, change the model:

```python
payload = {
    "model": "gpt-3.5-turbo",  # or "gpt-4"
    ...
}
```

### Pricing

- **gpt-3.5-turbo:** ~$0.001 per 1K tokens (cheapest)
- **gpt-4:** ~$0.03 per 1K tokens (best quality)

For SavySoil, estimate $0.50-$2.00/month for classroom use.

---

## Replicate (Llama 2, Mistral)

**Why:** Transparent pricing, good for running open models.

### Step 1: Create Account

1. Go to [replicate.com](https://replicate.com)
2. Sign up
3. Add a payment method (or use free credits)

### Step 2: Generate API Token

1. Go to **Account → API Tokens**
2. Create a new token
3. Copy it
4. **Save this somewhere safe**

### Step 3: Get Environment Variables

```
GEMMA_API_KEY=YOUR_TOKEN_HERE
GEMMA_ENDPOINT=https://api.replicate.com/v1/chat/completions
```

### Step 4: Test

```bash
curl -X POST https://api.replicate.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta/llama-7b-chat",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Available Models

- `meta/llama-2-7b-chat` — Good starter
- `mistralai/mistral-7b-instruct` — Better quality
- `mistral-medium` — Larger, more capable

---

## Local vLLM (Advanced)

**Why:** Complete control, no external API keys, runs on your hardware.

### Prerequisites

- NVIDIA GPU (8GB+ VRAM) or powerful CPU
- Docker installed

### Step 1: Start vLLM Server

```bash
docker run --gpus all -p 8000:8000 vllm/vllm-openai:latest \
  --model meta-llama/Llama-2-7b-chat-hf \
  --api-key local-key-12345
```

### Step 2: Get Environment Variables

```
GEMMA_API_KEY=local-key-12345
GEMMA_ENDPOINT=http://your-machine-ip:8000/v1/chat/completions
```

(Replace `your-machine-ip` with your machine's IP, e.g., `192.168.1.100`)

### Step 3: Test

```bash
curl -X POST http://localhost:8000/v1/chat/completions \
  -H "Authorization: Bearer local-key-12345" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-2-7b-chat-hf",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### Advantages & Disadvantages

**Advantages:**
- No API key exposure to third parties
- No rate limits or quotas
- Full control over model behavior

**Disadvantages:**
- Requires GPU hardware
- Slower inference than cloud services
- You manage the server/maintenance

---

## Comparison Table

| Provider | Free Tier | Speed | Quality | Setup Difficulty | Cost |
|----------|-----------|-------|---------|------------------|------|
| Groq | Yes (~2-5 req/min) | ⚡⚡⚡ Fastest | Good | Easy | Free |
| Together | Yes (with credits) | ⚡⚡ Fast | Very Good | Easy | Free or $0.50+ |
| OpenAI | No | ⚡ Medium | ⚡⚡⚡ Best | Easy | $0.001-0.03/K tokens |
| Replicate | Yes (with credits) | ⚡ Medium | Good | Easy | Pay-as-you-go |
| Local vLLM | Yes | ⚡ Depends on hardware | Good | Hard | Your hardware |

---

## Recommendation for SavySoil

**For Classroom (Most Teachers):** Use **Groq**
- Free tier is perfect for classes
- Fastest responses
- Easiest setup
- No surprise costs

**If You Want Best Quality:** Use **OpenAI + gpt-3.5-turbo**
- Best responses
- Very affordable (~$1-2/month for class)
- Reliable production service

**If You Have GPU Hardware:** Use **Local vLLM**
- Complete privacy
- Full control
- No rate limits

---

## Troubleshooting API Issues

### Test Your API Key

For Groq:
```bash
curl -X POST https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma-7b-it",
    "messages": [{"role": "user", "content": "Test"}],
    "max_tokens": 10
  }'
```

### Common Errors

**401 Unauthorized:** API key is wrong or expired
- Regenerate the key from your provider's dashboard
- Update in Render environment variables

**429 Too Many Requests:** Rate limit exceeded
- Free tier has limits (check your quota)
- Upgrade to paid tier if needed
- Or switch to another provider

**502 Bad Gateway:** Backend can't reach LLM endpoint
- Check the endpoint URL is correct
- Verify API key is set
- Check backend logs on Render

---

## Next Steps

1. Choose a provider (recommend: **Groq**)
2. Create an account and generate an API key
3. Note your `GEMMA_API_KEY` and `GEMMA_ENDPOINT`
4. Add these to your Render/Railway environment variables
5. Test with curl to verify the connection works
6. Deploy your backend and test with the frontend
