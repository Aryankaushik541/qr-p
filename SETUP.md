# 🚀 Frontend Setup Guide

## Quick Start

### 1. Get Your Backend URL

First, find your Vercel backend URL:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your backend project (`qr-p-backend`)
3. Copy the deployment URL (e.g., `https://qr-p-backend-xyz.vercel.app`)

### 2. Configure Environment Variables

**Option A: Using .env file (Local Development)**

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your backend URL:

```env
REACT_APP_API_URL=https://your-backend.vercel.app/api/feedback
```

**Option B: Using Vercel/Netlify Environment Variables (Production)**

**For Vercel:**
1. Go to your frontend project settings
2. Environment Variables
3. Add: `REACT_APP_API_URL` = `https://your-backend.vercel.app/api/feedback`

**For Netlify:**
1. Site settings → Build & deploy → Environment
2. Add: `REACT_APP_API_URL` = `https://your-backend.vercel.app/api/feedback`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Test Feedback Submission

1. Navigate to the feedback page
2. Fill in the form
3. Click "Submit Feedback"
4. Check browser console for any errors
5. Verify in backend that feedback was saved

## Troubleshooting

### Issue 1: "Failed to submit feedback"

**Check:**
1. Is backend URL correct in `.env`?
2. Is backend deployed and running?
3. Are CORS headers configured in backend?

**Test backend:**
```bash
curl https://your-backend.vercel.app/
```

Should return: `{"success":true,"message":"API Running"}`

### Issue 2: CORS Error

**Symptoms:**
```
Access to fetch at 'https://...' from origin 'https://...' 
has been blocked by CORS policy
```

**Fix:**
1. Check backend `src/server.js`
2. Make sure your frontend URL is in `allowedOrigins` array
3. Redeploy backend

### Issue 3: 429 Too Many Requests

**Symptoms:**
```
Too many requests. Please wait 60 seconds and try again.
```

**Causes:**
- Clicking submit button multiple times
- Testing too frequently

**Fix:**
- Wait 1 minute between submissions
- Frontend now prevents multiple clicks (already fixed)

### Issue 4: Network Error

**Symptoms:**
```
Network error. Please check your internet connection
```

**Check:**
1. Internet connection
2. Backend is deployed and running
3. No firewall blocking requests
4. Backend URL is correct

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API endpoint for feedback | `https://qr-p-backend.vercel.app/api/feedback` |

## API Endpoint

The frontend expects the backend to have this endpoint:

```
POST /api/feedback
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "1234567890",
  "message": "Great service!",
  "rating": 5,
  "feedbackType": "happy" | "sad" | "neutral"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": { ... }
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "message": "Error message here",
  "retryAfter": 60  // Only for 429 errors
}
```

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variable
vercel env add REACT_APP_API_URL
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Set environment variable in Netlify dashboard
```

## Testing

### Test Locally

1. Start backend locally (if testing locally)
2. Update `.env` with local backend URL:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/feedback
   ```
3. Run `npm start`
4. Test feedback submission

### Test Production

1. Deploy both frontend and backend
2. Update frontend env vars with production backend URL
3. Test from deployed frontend URL
4. Check Vercel logs for backend requests

## Common Mistakes

### ❌ Mistake 1: Wrong API URL

```javascript
// Wrong - missing /api/feedback
REACT_APP_API_URL=https://backend.vercel.app

// Correct
REACT_APP_API_URL=https://backend.vercel.app/api/feedback
```

### ❌ Mistake 2: Not Restarting Dev Server

After changing `.env`, restart dev server:
```bash
# Stop server (Ctrl+C)
npm start
```

### ❌ Mistake 3: Hardcoded URL

```javascript
// ❌ Don't do this
const API_URL = 'https://hardcoded-url.vercel.app/api/feedback';

// ✅ Do this
const API_URL = process.env.REACT_APP_API_URL || 'fallback-url';
```

### ❌ Mistake 4: Missing Environment Variable

If `REACT_APP_API_URL` is not set, the app uses fallback URL.

**Check if env var is loaded:**
```javascript
console.log('API URL:', process.env.REACT_APP_API_URL);
```

## Features Implemented

### ✅ Loading State
- Button disabled during submission
- Visual feedback ("Submitting...")
- Prevents multiple clicks

### ✅ Error Handling
- Network errors
- Validation errors
- Rate limit errors (429)
- Server errors (500)
- Helpful error messages

### ✅ Form Validation
- Required fields
- Email format validation
- Contact number validation
- Message length validation

### ✅ User Experience
- Clear error messages
- Loading indicators
- Success feedback
- Disabled inputs during submission

## Support

If issues persist:

1. **Check browser console** - Look for errors
2. **Check Network tab** - See actual requests
3. **Test backend directly** - Use curl or Postman
4. **Check Vercel logs** - See backend errors
5. **Verify environment variables** - Make sure they're set

## Files Modified

- ✅ `src/pages/PrivateFeedback.jsx` - Enhanced error handling
- ✅ `.env.example` - Environment variable template
- ✅ `SETUP.md` - This guide

## Next Steps

1. ✅ Get your backend URL from Vercel
2. ✅ Create `.env` file with backend URL
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Update production env vars
6. ✅ Test end-to-end

---

**Need help?** Check backend logs and frontend console for detailed error messages.
