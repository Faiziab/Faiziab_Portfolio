// Blog page functionality
let allBlogPosts = [];
let filteredPosts = [];

// Sample fallback data - these are your blog posts!
const fallbackPosts = [
  {
    "id": 1,
    "title": "Building AI-Powered Applications: A Complete Guide",
    "content": "In this comprehensive guide, we'll explore the process of building AI-powered applications from scratch. We'll cover everything from choosing the right frameworks to deploying your application in production.\n\n## Getting Started\n\nFirst, let's understand what makes an application AI-powered. The key is integrating machine learning models that can make intelligent decisions based on data.\n\n## Choosing the Right Tools\n\nWhen building AI applications, you have several options:\n- TensorFlow for deep learning\n- PyTorch for research and experimentation\n- Hugging Face for pre-trained models\n- OpenAI API for language models\n\n## Implementation Steps\n\n1. **Data Preparation**: Clean and prepare your data\n2. **Model Selection**: Choose the right model for your use case\n3. **Training**: Train your model on your data\n4. **Integration**: Integrate the model into your application\n5. **Deployment**: Deploy to production\n\n## Best Practices\n\n- Always validate your data\n- Use version control for your models\n- Monitor performance in production\n- Implement proper error handling\n\nThis approach ensures your AI applications are robust, scalable, and maintainable.",
    "date": "2024-01-15",
    "published": true
  },
  {
    "id": 2,
    "title": "The Future of Data Science: Trends to Watch in 2024",
    "content": "As we navigate through 2024, the data science field continues to evolve at an unprecedented pace. Here are the key trends that are shaping the future of data science.\n\n## 1. AutoML and No-Code Solutions\n\nAutomated Machine Learning (AutoML) is becoming more accessible, allowing non-technical users to build and deploy models without extensive coding knowledge.\n\n## 2. Edge Computing for AI\n\nProcessing data closer to its source reduces latency and improves performance, making real-time AI applications more feasible.\n\n## 3. Responsible AI\n\nThere's a growing emphasis on ethical AI, with companies focusing on fairness, transparency, and accountability in their AI systems.\n\n## 4. Quantum Computing\n\nWhile still in early stages, quantum computing promises to revolutionize data processing and machine learning algorithms.\n\n## 5. MLOps Maturity\n\nMachine Learning Operations (MLOps) practices are becoming standard, enabling better model lifecycle management and deployment.\n\nThese trends indicate a shift towards more accessible, ethical, and efficient data science practices that will continue to evolve in the coming years.",
    "date": "2024-01-10",
    "published": true
  },
  {
    "id": 3,
    "title": "Building Real-Time Emotion Detection Systems",
    "content": "Emotion detection has become a crucial component in modern AI applications, from customer service chatbots to mental health monitoring systems.\n\n## Understanding Emotion Detection\n\nEmotion detection involves analyzing text, voice, or facial expressions to identify human emotions. This technology has applications in:\n- Customer service\n- Mental health monitoring\n- Educational technology\n- Human-computer interaction\n\n## Technical Implementation\n\n### Text-Based Emotion Detection\n\nFor text analysis, we typically use:\n- Natural Language Processing (NLP) techniques\n- Deep learning models like CNNs and RNNs\n- Pre-trained models from Hugging Face\n\n### Voice-Based Detection\n\nAudio emotion detection involves:\n- Feature extraction from audio signals\n- Mel-frequency cepstral coefficients (MFCCs)\n- Recurrent neural networks for sequence modeling\n\n## Model Architecture\n\nA typical emotion detection system includes:\n1. **Data Preprocessing**: Cleaning and normalizing input data\n2. **Feature Extraction**: Converting raw data into meaningful features\n3. **Model Training**: Using labeled data to train the model\n4. **Real-time Processing**: Deploying the model for live predictions\n\n## Challenges and Solutions\n\n**Challenge**: Cultural differences in emotion expression\n**Solution**: Use diverse, culturally representative datasets\n\n**Challenge**: Context-dependent emotions\n**Solution**: Implement context-aware models that consider surrounding text\n\n**Challenge**: Real-time performance\n**Solution**: Optimize models for speed and use efficient inference techniques\n\n## Best Practices\n\n- Use balanced datasets\n- Implement proper validation techniques\n- Consider privacy implications\n- Test with diverse user groups\n- Monitor model performance over time\n\nBuilding effective emotion detection systems requires careful consideration of both technical and ethical aspects to ensure accurate and responsible AI applications.",
    "date": "2024-01-05",
    "published": true
  }
];

// Load blog posts for blog page
async function loadAllBlogPosts() {
  console.log('🚀 Starting to load blog posts...');
  
  try {
    // Try to load from blog-data.json file first (for GitHub Pages)
    try {
      const response = await fetch('blog-data.json');
      if (response.ok) {
        const blogData = await response.json();
        if (blogData && blogData.posts && blogData.posts.length > 0) {
          allBlogPosts = blogData.posts.filter(post => post.published);
          filteredPosts = [...allBlogPosts];
          console.log('✅ Loaded blog posts from blog-data.json:', allBlogPosts.length, 'posts');
          renderAllBlogPosts();
          updateStats();
          return;
        }
      }
    } catch (e) {
      console.log('ℹ️ Could not load blog-data.json, trying GitHub sync...');
    }
    
    // Try GitHub sync as fallback
    if (typeof githubSync !== 'undefined') {
      const blogData = await githubSync.syncBlogData();
      
      if (blogData && blogData.posts && blogData.posts.length > 0) {
        allBlogPosts = blogData.posts.filter(post => post.published);
        filteredPosts = [...allBlogPosts];
        console.log('✅ Loaded blog posts from GitHub:', allBlogPosts.length, 'posts');
        renderAllBlogPosts();
        updateStats();
        return;
      }
    }
    
    // Final fallback to hardcoded posts
    console.log('⚠️ Using fallback posts');
    allBlogPosts = fallbackPosts.filter(post => post.published);
    filteredPosts = [...allBlogPosts];
    renderAllBlogPosts();
    updateStats();
    
  } catch (error) {
    console.error('❌ Error loading blog posts:', error);
    // Use fallback posts on any error
    allBlogPosts = fallbackPosts.filter(post => post.published);
    filteredPosts = [...allBlogPosts];
    renderAllBlogPosts();
    updateStats();
  }
}

// Render all blog posts
function renderAllBlogPosts() {
  console.log('🎨 Rendering blog posts...');
  const blogGrid = document.getElementById('blog-posts-grid');
  const loading = document.getElementById('blog-loading');
  
  console.log('Blog grid element:', blogGrid);
  console.log('Loading element:', loading);
  console.log('Number of posts to render:', filteredPosts.length);
  
  if (!blogGrid) {
    console.error('❌ Blog grid element not found!');
    return;
  }
  
  // Hide loading spinner
  if (loading) {
    loading.style.display = 'none';
    console.log('✅ Hidden loading spinner');
  }
  
  // Check if we have posts
  if (filteredPosts.length === 0) {
    console.log('⚠️ No posts to display');
    blogGrid.innerHTML = `
      <div class="no-posts">
        <i class="fas fa-search"></i>
        <h3>No posts found</h3>
        <p>Check back later for new content.</p>
      </div>
    `;
    return;
  }
  
  // Generate HTML for all posts
  const postsHTML = filteredPosts.map(post => {
    // Create excerpt from content (first 200 characters)
    const excerpt = post.content.substring(0, 200) + '...';
    
    return `
      <article class="blog__card fade-in">
        <div class="blog__content">
          <div class="blog__meta">
            <span><i class="fas fa-calendar"></i> ${post.date}</span>
          </div>
          <h3 class="blog__title">${post.title}</h3>
          <p class="blog__excerpt">${excerpt}</p>
          <div class="blog__footer">
            <a href="#post-${post.id}" class="blog__read-more" onclick="openPost(${post.id})">
              Read More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
  
  blogGrid.innerHTML = postsHTML;
  console.log('✅ Successfully rendered', filteredPosts.length, 'blog posts');
  console.log('📄 Generated HTML:', postsHTML);
  console.log('🎯 Blog grid after rendering:', blogGrid.innerHTML);
  
  // Force visibility and ensure proper styling
  blogGrid.style.display = 'grid';
  blogGrid.style.visibility = 'visible';
  blogGrid.style.opacity = '1';
  blogGrid.style.minHeight = '200px';
  blogGrid.style.padding = '2rem';
  blogGrid.style.backgroundColor = 'transparent';
  
  // Check if posts are actually in the DOM
  const renderedPosts = blogGrid.querySelectorAll('.blog__card');
  console.log('📊 Rendered posts count:', renderedPosts.length);
  console.log('📊 Posts elements:', renderedPosts);
  
  // Force visibility on each blog card
  renderedPosts.forEach((post, index) => {
    post.style.display = 'block';
    post.style.visibility = 'visible';
    post.style.opacity = '1';
    post.style.backgroundColor = '#f8f9fa';
    post.style.border = '2px solid #007bff';
    post.style.borderRadius = '15px';
    post.style.padding = '1.5rem';
    post.style.margin = '1rem';
    post.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    console.log(`📄 Post ${index + 1} styles applied`);
  });
}

// Update statistics
function updateStats() {
  const totalPosts = document.getElementById('total-posts');
  
  if (totalPosts) {
    totalPosts.textContent = allBlogPosts.length;
    console.log('✅ Updated stats: Total posts =', allBlogPosts.length);
  } else {
    console.log('⚠️ Total posts element not found');
  }
}

// Open individual post
function openPost(postId) {
  const post = allBlogPosts.find(p => p.id === postId);
  if (post) {
    // Create a simple modal to display the full post
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      overflow-y: auto;
      padding: 2rem;
    `;
    
    modal.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; background: var(--clr-bg-alt); padding: 2rem; border-radius: 15px; position: relative;">
        <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; font-size: 2rem; background: none; border: none; cursor: pointer; color: var(--clr-fg);">×</button>
        <h1 style="margin-bottom: 1rem; color: var(--clr-fg-alt);">${post.title}</h1>
        <p style="color: var(--clr-fg); margin-bottom: 2rem;"><i class="fas fa-calendar"></i> ${post.date}</p>
        <div style="color: var(--clr-fg); line-height: 1.8; white-space: pre-wrap;">${post.content}</div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }
}

// Newsletter form handling
function setupNewsletter() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (!newsletterForm) {
    console.log('⚠️ Newsletter form not found');
    return;
  }
  
  console.log('✅ Newsletter form found, setting up...');
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Show success message
    alert('Thank you for subscribing! 🎉\n\nYou\'ll be notified about new posts.');
    
    // Reset form
    this.reset();
  });
}

// Debug function to clear localStorage and create test post
function debugBlog() {
  console.log('🔧 Debug mode: Clearing localStorage and creating test post');
  localStorage.removeItem('blogData');
  
  const testPost = {
    id: Date.now(),
    title: "Test Blog Post",
    content: "This is a test blog post to verify the blog system is working correctly.\n\nIt includes multiple lines of content to test the display functionality.",
    date: new Date().toISOString().split('T')[0],
    published: true
  };
  
  const blogData = { posts: [testPost] };
  localStorage.setItem('blogData', JSON.stringify(blogData));
  
  console.log('✅ Test post created:', testPost);
  
  // Reload the page
  location.reload();
}

// Make debug function available globally
window.debugBlog = debugBlog;

// Initialize everything when DOM is ready
console.log('📄 blog.js loaded');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  console.log('⏳ Waiting for DOM to load...');
  document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded! Initializing blog page...');
    loadAllBlogPosts();
    setupNewsletter();
  });
} else {
  // DOM is already ready
  console.log('✅ DOM already loaded! Initializing blog page immediately...');
  loadAllBlogPosts();
  setupNewsletter();
}
