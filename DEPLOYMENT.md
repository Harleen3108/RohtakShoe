# Deployment Guide - ProductHub Admin Panel

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Backend
1. Make sure `backend/package.json` has `"type": "module"` ✅ (Already added)
2. Push your code to GitHub

### Step 2: Deploy on Render
1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `producthub-api` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables on Render
Go to "Environment" tab and add these variables:

```
PORT=5000
MONGO_URI=mongodb+srv://rohtakshoeco:shoe123@rohtakshoe.jkcexty.mongodb.net/?appName=rohtakshoe
JWT_SECRET=supersecretadminkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-app-name.vercel.app
```

**Important**: Replace `FRONTEND_URL` with your actual Vercel URL after frontend deployment

### Step 4: Deploy
Click "Create Web Service" and wait for deployment to complete.

Your backend will be available at: `https://your-service-name.onrender.com`

---

## 🌐 Frontend Deployment (Vercel)

### Step 1: Update API URL
1. Open `admin-frontend/.env.production`
2. Replace with your Render backend URL:
   ```
   VITE_API_URL=https://your-service-name.onrender.com/api
   ```

### Step 2: Deploy on Vercel
1. Go to [Vercel.com](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variable
In Vercel project settings → Environment Variables:

```
VITE_API_URL=https://your-service-name.onrender.com/api
```

### Step 4: Deploy
Click "Deploy" and wait for deployment to complete.

Your frontend will be available at: `https://your-app-name.vercel.app`

---

## 🔄 Update Backend with Frontend URL

After frontend is deployed:
1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Render will automatically redeploy

---

## 📝 Environment Variables Summary

### Backend (Render)
```env
PORT=5000
MONGO_URI=mongodb+srv://rohtakshoeco:shoe123@rohtakshoe.jkcexty.mongodb.net/?appName=rohtakshoe
JWT_SECRET=supersecretadminkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-app-name.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-service-name.onrender.com/api
```

---

## ✅ Post-Deployment Checklist

1. ✅ Backend health check: Visit `https://your-service-name.onrender.com/`
   - Should show: `{"message": "ProductHub API is running"}`

2. ✅ Frontend loads: Visit `https://your-app-name.vercel.app`
   - Should show login page

3. ✅ Test login with your credentials:
   - Email: `admin@rohtakshoe.com`
   - Password: `Admin@123`

4. ✅ Test adding a product with images

5. ✅ Test editing and deleting products

---

## 🐛 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Redeploy backend after updating `FRONTEND_URL`

### API Connection Failed
- Check `VITE_API_URL` in Vercel environment variables
- Make sure it ends with `/api`
- Redeploy frontend after updating

### Images Not Uploading
- Verify Cloudinary credentials in Render
- Check browser console for errors

### MongoDB Connection Failed
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)

---

## 🎉 You're Done!

Your ProductHub Admin Panel is now live and ready to use!

- **Frontend**: https://your-app-name.vercel.app
- **Backend**: https://your-service-name.onrender.com
