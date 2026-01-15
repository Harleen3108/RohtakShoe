# Fix 404 Error on Vercel Deployment

## The Problem
Frontend is deployed but getting 404 errors when trying to connect to the API.

## Solution

### Step 1: Set Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add this variable:

```
Name: VITE_API_URL
Value: https://rohtakshoe.onrender.com/api
```

5. Select all environments (Production, Preview, Development)
6. Click "Save"

### Step 2: Redeploy

After adding the environment variable:
1. Go to "Deployments" tab
2. Click on the latest deployment
3. Click the three dots (•••) menu
4. Click "Redeploy"

OR

Push a new commit to trigger automatic deployment:
```bash
git add .
git commit -m "Update API configuration"
git push
```

### Step 3: Verify Configuration

After deployment, open browser console (F12) and check:
- You should see: `🔧 API Configuration: { API_URL: "https://rohtakshoe.onrender.com/api", ... }`
- If you see `http://localhost:5000/api`, the environment variable isn't set correctly

### Step 4: Test the Connection

1. Open your deployed app: `https://your-app.vercel.app`
2. Open browser console (F12)
3. Try to login
4. Check Network tab for the API request
5. The request should go to: `https://rohtakshoe.onrender.com/api/admin/login`

### Common Issues

#### Issue 1: Still seeing localhost URL
**Solution**: 
- Make sure environment variable name is exactly `VITE_API_URL` (case-sensitive)
- Redeploy after adding the variable
- Clear browser cache

#### Issue 2: CORS Error
**Solution**: 
- Backend is already configured to allow all origins
- Make sure backend is running on Render
- Test backend directly: `https://rohtakshoe.onrender.com/`

#### Issue 3: 404 on all routes
**Solution**: 
- Make sure `vercel.json` exists in `admin-frontend` folder ✅
- It should have the rewrite rule for SPA routing ✅

#### Issue 4: Environment variable not working
**Solution**: 
- In Vercel, environment variables must start with `VITE_` for Vite apps
- After adding variables, you MUST redeploy
- Variables are only loaded during build time, not runtime

### Step 5: Check Both Services

**Backend (Render):**
```bash
curl https://rohtakshoe.onrender.com/
# Should return: {"message":"ProductHub API is running",...}
```

**Frontend (Vercel):**
- Visit: `https://your-app.vercel.app`
- Should show login page
- Check console for API URL

### Step 6: Update Frontend URL in Backend

After frontend is deployed, update backend environment variable:

1. Go to Render dashboard
2. Your service → Environment
3. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. Save (Render will auto-redeploy)

### Complete Environment Variables

**Vercel (Frontend):**
```
VITE_API_URL=https://rohtakshoe.onrender.com/api
```

**Render (Backend):**
```
PORT=5000
MONGO_URI=mongodb+srv://rohtakshoeco:shoe123@rohtakshoe.jkcexty.mongodb.net/?appName=rohtakshoe
JWT_SECRET=supersecretadminkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Debugging Checklist

- [ ] Backend is running: `https://rohtakshoe.onrender.com/` returns JSON
- [ ] `VITE_API_URL` is set in Vercel
- [ ] Frontend is redeployed after adding env variable
- [ ] Browser console shows correct API URL
- [ ] Network tab shows requests going to Render URL (not localhost)
- [ ] No CORS errors in console
- [ ] Backend logs show incoming requests

### Quick Test

Open browser console on your deployed app and run:
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

If it shows `undefined`, the environment variable isn't set correctly.

---

## Still Having Issues?

1. Share the exact error message from browser console
2. Share the Network tab screenshot showing the failed request
3. Share the Vercel deployment logs
