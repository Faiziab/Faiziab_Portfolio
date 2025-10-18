// GitHub Sync - Blog Data Synchronization
// This module handles syncing blog data with GitHub repository

const githubSync = {
  // GitHub configuration
  config: {
    owner: 'Faiziab', // Your GitHub username
    repo: 'Faiziab_Portfolio', // Your repository name
    branch: 'main',
    filePath: 'blog-data.json'
  },

  // Get token from environment or localStorage
  getToken() {
    // In production with proper backend, token would come from environment
    // For now, we'll use localStorage for client-side demo
    return localStorage.getItem('github_token') || process.env.GITHUB_TOKEN;
  },

  // Set token (for initial setup)
  setToken(token) {
    localStorage.setItem('github_token', token);
    console.log('✅ GitHub token saved successfully');
  },

  // Check if GitHub sync is available
  isAvailable() {
    return !!this.getToken();
  },

  // Fetch blog data from GitHub
  async fetchFromGitHub() {
    const token = this.getToken();
    
    if (!token) {
      console.log('⚠️ No GitHub token available, using local data');
      return null;
    }

    try {
      const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${this.config.filePath}?ref=${this.config.branch}`;
      
      console.log('🔄 Fetching from GitHub:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        console.log('⚠️ GitHub API response not OK:', response.status);
        return null;
      }

      const data = await response.json();
      
      // Decode base64 content
      const content = atob(data.content);
      const blogData = JSON.parse(content);
      
      console.log('✅ Successfully fetched from GitHub:', blogData);
      return blogData;
      
    } catch (error) {
      console.error('❌ Error fetching from GitHub:', error);
      return null;
    }
  },

  // Save blog data to GitHub
  async saveToGitHub(blogData) {
    const token = this.getToken();
    
    if (!token) {
      console.log('⚠️ No GitHub token available, saving locally only');
      return false;
    }

    try {
      // First, get the current file to get its SHA
      const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${this.config.filePath}`;
      
      let sha = null;
      try {
        const getResponse = await fetch(url, {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (getResponse.ok) {
          const currentData = await getResponse.json();
          sha = currentData.sha;
        }
      } catch (e) {
        console.log('ℹ️ File does not exist yet, will create new file');
      }

      // Encode content to base64
      const content = btoa(JSON.stringify(blogData, null, 2));

      // Prepare the request body
      const body = {
        message: `Update blog data - ${new Date().toISOString()}`,
        content: content,
        branch: this.config.branch
      };

      // Include SHA if file exists (for update)
      if (sha) {
        body.sha = sha;
      }

      // Save to GitHub
      const saveResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!saveResponse.ok) {
        console.error('❌ Failed to save to GitHub:', saveResponse.status);
        return false;
      }

      console.log('✅ Successfully saved to GitHub');
      return true;
      
    } catch (error) {
      console.error('❌ Error saving to GitHub:', error);
      return false;
    }
  },

  // Sync blog data (fetch from GitHub or use local)
  async syncBlogData() {
    console.log('🔄 Syncing blog data...');

    // Try to fetch from GitHub first
    const githubData = await this.fetchFromGitHub();
    
    if (githubData) {
      // Save to localStorage as cache
      localStorage.setItem('blogData', JSON.stringify(githubData));
      console.log('✅ Synced from GitHub and cached locally');
      return githubData;
    }

    // Fallback to localStorage
    const localData = localStorage.getItem('blogData');
    if (localData) {
      console.log('ℹ️ Using local cached data');
      return JSON.parse(localData);
    }

    // If nothing available, return empty structure
    console.log('⚠️ No data available, returning empty structure');
    return { posts: [] };
  },

  // Save blog data (both locally and to GitHub)
  async saveBlogData(blogData) {
    console.log('💾 Saving blog data...');

    // Save locally first
    localStorage.setItem('blogData', JSON.stringify(blogData));
    console.log('✅ Saved to localStorage');

    // Try to save to GitHub
    const githubSuccess = await this.saveToGitHub(blogData);
    
    if (githubSuccess) {
      console.log('✅ Saved to GitHub');
    } else {
      console.log('⚠️ Could not save to GitHub, but local data is saved');
    }

    return true;
  },

  // Initialize GitHub sync
  async init() {
    if (this.isAvailable()) {
      console.log('✅ GitHub sync is available');
      // Perform initial sync
      await this.syncBlogData();
    } else {
      console.log('⚠️ GitHub sync not configured. Use githubSync.setToken() to enable sync');
    }
  }
};

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  window.githubSync = githubSync;
  
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      githubSync.init();
    });
  } else {
    githubSync.init();
  }
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = githubSync;
}
