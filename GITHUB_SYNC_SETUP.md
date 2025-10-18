# GitHub Sync Setup Guide

## How to Set Up Cross-Device Blog Synchronization

Your portfolio now has GitHub API integration for cross-device blog synchronization! Here's how to set it up:

### Step 1: Create a GitHub Personal Access Token

1. Go to GitHub.com and sign in
2. Click your profile picture → Settings
3. Scroll down to "Developer settings" (left sidebar)
4. Click "Personal access tokens" → "Tokens (classic)"
5. Click "Generate new token" → "Generate new token (classic)"
6. Give it a name like "Portfolio Blog Sync"
7. Select scopes: ✅ **repo** (Full control of private repositories)
8. Click "Generate token"
9. **Copy the token** (you won't see it again!)

### Step 2: Configure Your Portfolio

1. Open your portfolio website
2. Open browser console (F12)
3. Run this command with your token:
   ```javascript
   githubSync.setToken('YOUR_GITHUB_TOKEN_HERE');
   ```
4. Test the sync by creating a blog post

### Step 3: How It Works

- **Creating Posts**: Automatically syncs to GitHub
- **Deleting Posts**: Automatically syncs to GitHub  
- **Viewing Posts**: Always loads latest from GitHub
- **Fallback**: Uses localStorage if GitHub is unavailable

### Step 4: Cross-Device Testing

1. Create a post on your laptop
2. Check on your phone - it should appear automatically
3. Delete a post on your phone
4. Check on your laptop - it should be gone

### Security Notes

- The token gives full repo access - keep it secure
- Don't share your token publicly
- You can revoke the token anytime in GitHub settings

### Troubleshooting

- If sync fails, posts are saved locally as backup
- Check console for error messages
- Make sure your GitHub username/repo name are correct in `github-sync.js`

Your blog data will now sync across all devices! 🚀
