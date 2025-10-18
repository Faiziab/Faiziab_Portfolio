// Admin functionality for blog management
let blogData = [];

// Load blog data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBlogData();
    setupEventListeners();
});

// Load blog data from JSON file
async function loadBlogData() {
    try {
        const response = await fetch('blog-data.json');
        blogData = await response.json();
        renderPostsList();
    } catch (error) {
        console.error('Error loading blog data:', error);
        // Initialize with empty data if file doesn't exist
        blogData = { posts: [] };
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('blog-form').addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(), // Simple ID generation
        title: document.getElementById('post-title').value,
        excerpt: document.getElementById('post-excerpt').value,
        content: document.getElementById('post-content').value,
        category: document.getElementById('post-category').value,
        tags: document.getElementById('post-tags').value.split(',').map(tag => tag.trim()),
        image: document.getElementById('post-image').value,
        readTime: document.getElementById('read-time').value + ' min read',
        featured: document.getElementById('featured-post').checked,
        published: document.getElementById('publish-now').checked,
        author: 'Faiziab Khan',
        date: new Date().toISOString().split('T')[0]
    };
    
    // Add to blog data
    blogData.posts.unshift(formData);
    
    // Save to localStorage (for demo purposes)
    localStorage.setItem('blogData', JSON.stringify(blogData));
    
    // Reset form
    document.getElementById('blog-form').reset();
    
    // Show success message
    alert('Blog post saved successfully!');
    
    // Update posts list
    renderPostsList();
}

// Render posts list
function renderPostsList() {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';
    
    blogData.posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.innerHTML = `
            <div class="post-info">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    ${post.date} • ${post.category} • ${post.published ? 'Published' : 'Draft'}
                </div>
            </div>
            <div class="post-actions">
                <button class="action-btn edit-btn" onclick="editPost(${post.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn" onclick="deletePost(${post.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
                <button class="action-btn publish-btn" onclick="togglePublish(${post.id})">
                    <i class="fas fa-${post.published ? 'eye-slash' : 'eye'}"></i> 
                    ${post.published ? 'Unpublish' : 'Publish'}
                </button>
            </div>
        `;
        postsList.appendChild(postItem);
    });
}

// Edit post
function editPost(id) {
    const post = blogData.posts.find(p => p.id === id);
    if (post) {
        // Fill form with post data
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-excerpt').value = post.excerpt;
        document.getElementById('post-content').value = post.content;
        document.getElementById('post-category').value = post.category;
        document.getElementById('post-tags').value = post.tags.join(', ');
        document.getElementById('post-image').value = post.image;
        document.getElementById('read-time').value = parseInt(post.readTime);
        document.getElementById('featured-post').checked = post.featured;
        document.getElementById('publish-now').checked = post.published;
        
        // Scroll to form
        document.getElementById('create-section').scrollIntoView();
        showSection('create');
    }
}

// Delete post
function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        blogData.posts = blogData.posts.filter(p => p.id !== id);
        localStorage.setItem('blogData', JSON.stringify(blogData));
        renderPostsList();
    }
}

// Toggle publish status
function togglePublish(id) {
    const post = blogData.posts.find(p => p.id === id);
    if (post) {
        post.published = !post.published;
        localStorage.setItem('blogData', JSON.stringify(blogData));
        renderPostsList();
    }
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.admin-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load preview if needed
    if (sectionName === 'preview') {
        loadPreview();
    }
}

// Load preview
function loadPreview() {
    const previewContent = document.getElementById('preview-content');
    previewContent.innerHTML = '';
    
    blogData.posts.filter(post => post.published).forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-item';
        postCard.innerHTML = `
            <div class="post-info">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    ${post.date} • ${post.category} • ${post.readTime}
                </div>
            </div>
        `;
        previewContent.appendChild(postCard);
    });
}
