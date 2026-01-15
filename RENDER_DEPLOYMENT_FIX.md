# Fix "Cannot GET /" Error on Render

## The Problem
You're seeing "Cannot GET /" which means the server isn't responding correctly.

## Solution Steps

### 1. Check Render Configuration
In your Render dashboard:

**Build & Deploy Settings:**
- **Root Directory**: Leave EMPTY (not `backend`)
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

OR if you want to use backend as root:
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2. Verify Environment Variables
Make sure these are set in Render:

```
PORT=5000
MONGO_URI=mongodb+srv://rohtakshoeco:shoe123@rohtakshoe.jkcexty.mongodb.net/?appName=rohtakshoe
JWT_SECRET=supersecretadminkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

### 3. Check Render Logs
1. Go to your Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for errors like:
   - MongoDB connection errors
   - Module not found errors
   - Port binding errors

### 4. Test the Deployment
After redeploying, test these URLs:

1. **Health Check**: `https://rohtakshoe.onrender.com/`
   - Should return: `{"message":"ProductHub API is running","status":"OK",...}`

2. **Health Endpoint**: `https://rohtakshoe.onrender.com/health`
   - Should return: `{"status":"healthy","database":"connected"}`

3. **API Test**: `https://rohtakshoe.onrender.com/api/admin/login`
   - Should return 400 or 401 (not 404)

### 5. Common Issues & Fixes

#### Issue: "Cannot find module"
**Fix**: Make sure `package.json` has `"type": "module"` ✅ (Already added)

#### Issue: MongoDB connection timeout
**Fix**: 
1. Go to MongoDB Atlas
2. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

#### Issue: Port already in use
**Fix**: Render automatically assigns the PORT, make sure you're using `process.env.PORT`

#### Issue: CORS errors
**Fix**: Already set to allow all origins temporarily for testing

### 6. Redeploy
After making changes:
1. Commit and push to GitHub
2. Render will auto-deploy
3. Or click "Manual Deploy" → "Deploy latest commit"

### 7. If Still Not Working
Check these in order:

1. **Logs show "Server running"?**
   - Yes → Server started successfully
   - No → Check for errors in logs

2. **Can access `/` endpoint?**
   - Yes → Server is responding
   - No → Check Render service status

3. **MongoDB connected?**
   - Check logs for "MongoDB Connected" message
   - If not, verify MONGO_URI

4. **Environment variables loaded?**
   - Add `console.log('ENV CHECK:', process.env.PORT)` to server.js
   - Check logs to see if it prints

### 8. Quick Test Commands
Run these in your local terminal to test the deployed API:

```bash
# Test health check
curl https://rohtakshoe.onrender.com/

# Test with verbose output
curl -v https://rohtakshoe.onrender.com/

# Test API endpoint
curl -X POST https://rohtakshoe.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

### 9. Updated Files
I've updated these files to fix the issue:
- ✅ `backend/server.js` - Better error handling and CORS
- ✅ `backend/render.yaml` - Render configuration
- ✅ `backend/.gitignore` - Ignore unnecessary files

### 10. Final Checklist
- [ ] Root directory is set correctly in Render
- [ ] All environment variables are added
- [ ] MongoDB allows connections from anywhere
- [ ] Latest code is pushed to GitHub
- [ ] Service is redeployed
- [ ] Logs show "Server running on port 5000"
- [ ] Can access https://rohtakshoe.onrender.com/

---

## Still Having Issues?

Share the Render logs and I'll help you debug further!
