# Secure Setup Guide

## 🔐 Setting Up Your Portfolio with GitHub Sync

This guide will help you securely configure your portfolio to sync blog posts across devices using GitHub.

---

## Prerequisites

Before you begin, make sure you have:
- A GitHub account
- Your portfolio repository created on GitHub
- Node.js installed (optional, for local development)

---

## Step 1: Create a GitHub Personal Access Token

Your portfolio uses GitHub API to sync blog data. Here's how to create a secure token:

1. **Navigate to GitHub Settings**
   - Go to [GitHub.com](https://github.com) and sign in
   - Click your profile picture (top right)
   - Select **Settings**

2. **Access Developer Settings**
   - Scroll down the left sidebar
   - Click **Developer settings**

3. **Generate Personal Access Token**
   - Click **Personal access tokens** → **Tokens (classic)**
   - Click **Generate new token** → **Generate new token (classic)**
   - Give your token a descriptive name: `Portfolio Blog Sync`
   - Set expiration (recommended: 90 days, then regenerate)
   - Select the following scope:
     - ✅ **repo** (Full control of private repositories)
   - Click **Generate token** at the bottom

4. **Save Your Token**
   - ⚠️ **IMPORTANT**: Copy the token immediately! 
   - You won't be able to see it again
   - Store it securely (password manager recommended)

---

## Step 2: Configure Your Local Environment

### Option A: Using Environment Variables (Recommended for Development)

1. **Create a `.env` file** in your project root:
   ```bash
   touch .env
   ```

2. **Add your token to `.env`**:
   ```
   GITHUB_TOKEN=your_personal_access_token_here
   ```

3. **Verify `.env` is in `.gitignore`**:
   ```bash
   # Check if .env is ignored
   grep ".env" .gitignore
   
   # If not found, add it
   echo ".env" >> .gitignore
   ```

### Option B: Using Browser Console (For Production Website)

1. Open your portfolio website
2. Open browser DevTools (F12 or Cmd+Option+I on Mac)
3. Go to the **Console** tab
4. Run this command with your actual token:
   ```javascript
   githubSync.setToken('your_github_token_here');
   ```
5. Verify it's saved:
   ```javascript
   console.log('Token saved:', githubSync.isAvailable());
   ```

---

## Step 3: Update Configuration

Open `github-sync.js` and verify your GitHub details:

```javascript
config: {
  owner: 'Faiziab',              // Your GitHub username
  repo: 'Faiziab_Portfolio',     // Your repository name
  branch: 'main',                 // Your default branch
  filePath: 'blog-data.json'     // Where blog data is stored
}
```

---

## Step 4: Test the Sync

### Create a Test Blog Post

1. Open your portfolio's admin page
2. Create a new blog post
3. Check the browser console for sync messages:
   - ✅ "Saved to localStorage"
   - ✅ "Saved to GitHub"

### Verify on GitHub

1. Go to your repository on GitHub
2. You should see a new file: `blog-data.json`
3. Check the commit message: "Update blog data - [timestamp]"

### Test Cross-Device Sync

1. Open your portfolio on a different device
2. The blog post should appear automatically
3. Try creating/editing posts on both devices

---

## Security Best Practices

### ✅ DO:
- Store tokens in `.env` files (never commit them)
- Add `.env` to `.gitignore`
- Use tokens with minimal required permissions
- Regenerate tokens every 90 days
- Revoke tokens immediately if compromised

### ❌ DON'T:
- Commit tokens to Git
- Share tokens publicly
- Use tokens in client-side code (for production)
- Store tokens in plain text files that are committed

---

## Troubleshooting

### Token Not Working?

**Check token permissions:**
- Ensure the **repo** scope is enabled
- Verify the token hasn't expired

**Verify configuration:**
```javascript
// In browser console
console.log('Token available:', githubSync.isAvailable());
console.log('Config:', githubSync.config);
```

### Sync Failing?

**Check GitHub repository:**
- Ensure repository exists
- Verify repository name and owner are correct
- Check if `blog-data.json` has correct permissions

**Check browser console:**
- Look for error messages
- Common issues:
  - 401: Invalid or expired token
  - 404: Repository not found
  - 403: Insufficient permissions

### Posts Not Appearing?

**Clear cache and retry:**
```javascript
// In browser console
localStorage.clear();
location.reload();
```

**Manually sync:**
```javascript
// Force sync from GitHub
githubSync.syncBlogData().then(data => {
  console.log('Synced data:', data);
});
```

---

## Advanced Configuration

### Using a Backend Service (Recommended for Production)

For production websites, it's better to use a backend service to handle GitHub API calls:

1. Set up a simple Node.js server
2. Store the token securely in server environment variables
3. Create API endpoints that proxy requests to GitHub
4. Update `github-sync.js` to call your backend instead

Example backend endpoint:
```javascript
// server.js
app.post('/api/sync-blog', async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  // Handle GitHub API calls server-side
});
```

### Webhook Integration

Set up GitHub webhooks to automatically notify your site of changes:

1. Go to your repository **Settings** → **Webhooks**
2. Add webhook URL: `https://yoursite.com/api/webhook`
3. Select events: Push, Pull Request
4. Save webhook

---

## Need Help?

If you encounter issues:

1. **Check the browser console** for error messages
2. **Verify your token** has correct permissions
3. **Test GitHub API** manually using curl or Postman
4. **Review GitHub documentation**: https://docs.github.com/rest

---

## Summary

✅ Created GitHub Personal Access Token  
✅ Configured `.env` with token  
✅ Updated `github-sync.js` configuration  
✅ Tested blog post creation and sync  
✅ Verified cross-device synchronization  

Your portfolio is now set up with secure GitHub synchronization! 🎉

---

**Last Updated:** October 2024  
**Author:** Faiziab Khan
