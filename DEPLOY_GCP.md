# Google Cloud Deployment Guide

This guide will help you deploy the Aviation Analytics Dashboard to Google Cloud Platform using **Cloud Run** (recommended for this application).

## Prerequisites

1. A Google Cloud Platform account ([Sign up here](https://cloud.google.com/))
2. Google Cloud SDK installed ([Installation guide](https://cloud.google.com/sdk/docs/install))
3. Docker installed (optional, for local testing)

## Deployment Options

### Option 1: Deploy via Google Cloud Console (No CLI Required)

1. **Enable Cloud Run API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **Cloud Run** → Enable API

2. **Create a new service**:
   - Click **"Create Service"**
   - Select **"Continuously deploy from a repository"**
   - Connect your GitHub repository: `RoNgHuEiPeNg/Aviation-analytics-dashboard`
   - Branch: `main`

3. **Configure the service**:
   - Service name: `aviation-analytics`
   - Region: Choose closest to your users (e.g., `asia-east1` for Taiwan)
   - Authentication: **Allow unauthenticated invocations**
   - Container port: `3000`

4. **Deploy**:
   - Click **"Create"**
   - Wait for deployment to complete (~2-3 minutes)
   - Your app will be live at: `https://aviation-analytics-XXXXX.run.app`

---

### Option 2: Deploy via Command Line (gcloud CLI)

```bash
# 1. Login to Google Cloud
gcloud auth login

# 2. Set your project ID
gcloud config set project YOUR_PROJECT_ID

# 3. Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# 4. Deploy to Cloud Run
gcloud run deploy aviation-analytics \
  --source . \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --port 3000

# 5. Get your deployment URL
gcloud run services describe aviation-analytics --region asia-east1 --format 'value(status.url)'
```

---

## Post-Deployment

### Custom Domain (Optional)

1. Go to **Cloud Run** → Your service → **"Manage Custom Domains"**
2. Add your domain and follow DNS verification steps

### Monitoring

- **Logs**: Cloud Run → Your service → **Logs**
- **Metrics**: Cloud Run → Your service → **Metrics**

### Cost Estimation

Cloud Run pricing (as of 2024):
- **Free tier**: 2 million requests/month
- **After free tier**: ~$0.40 per million requests
- **Estimated cost for this app**: $0-5/month (depending on traffic)

---

## Troubleshooting

### Issue: "Port 3000 not responding"
**Solution**: Ensure `server.js` listens on `process.env.PORT || 3000`:
```javascript
const PORT = process.env.PORT || 3000;
```

### Issue: "CORS errors"
**Solution**: The proxy server already handles CORS. No changes needed.

---

## Local Testing with Docker

```bash
# Build the Docker image
docker build -t aviation-analytics .

# Run locally
docker run -p 3000:3000 aviation-analytics

# Test at http://localhost:3000
```

---

**Need help?** Check the [Cloud Run documentation](https://cloud.google.com/run/docs) or open an issue on GitHub.
