const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
  body.classList.add(bodyClass)
  btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

	body.classList.remove(localStorage.getItem('portfolio-theme'))
	btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

  addThemeClass(bodyClass, btnClass)

	localStorage.setItem('portfolio-theme', bodyClass)
	localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
	isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
	const navUl = document.querySelector('.nav__list')

	if (btnHamburger.classList.contains('fa-bars')) {
		btnHamburger.classList.remove('fa-bars')
		btnHamburger.classList.add('fa-times')
		navUl.classList.add('display-nav-list')
	} else {
		btnHamburger.classList.remove('fa-times')
		btnHamburger.classList.add('fa-bars')
		navUl.classList.remove('display-nav-list')
	}
}

btnHamburger.addEventListener('click', displayList)

const scrollUp = () => {
	const btnScrollTop = document.querySelector('.scroll-top')

	if (
		body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		btnScrollTop.style.display = 'block'
	} else {
		btnScrollTop.style.display = 'none'
	}
}

document.addEventListener('scroll', scrollUp)










const elementsToAnimate = document.querySelectorAll('.fade-in');

const animateElements = () => {
  elementsToAnimate.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add('active');
    }
  });
};

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

window.addEventListener('scroll', animateElements);



window.addEventListener('scroll', () => {
	const scrollY = window.scrollY;
	const parallaxElements = document.querySelectorAll('.parallax-bg');
  
	parallaxElements.forEach((element) => {
	  const speed = element.getAttribute('data-speed');
	  element.style.transform = `translateY(${scrollY * speed}px)`;
	});
  });
  



// Function to perform the typing animation
const typeText = (text, elementId) => {
	const element = document.getElementById(elementId);
	if (!element) {
		console.log('Element with id "' + elementId + '" not found, skipping typing animation');
		return;
	}
	element.textContent = '';
	element.style.display = 'inline';
	for (let i = 0; i < text.length; i++) {
	  setTimeout(() => {
		element.textContent += text[i];
	  }, i * 100); // Adjust the speed by changing the timeout delay
	}
  };
  
  // Trigger the typing animation when the page loads
  window.addEventListener('load', () => {
	const typedElement = document.getElementById('typed-text');
	if (typedElement) {
		typeText('Hi, I am Faiziab Khan', 'typed-text');
	}
  });
  
// Blog functionality
let blogPosts = [];

// Load blog posts
async function loadBlogPosts() {
  // First try to load from localStorage (for posts created via admin)
  const savedData = localStorage.getItem('blogData');
  if (savedData) {
    const data = JSON.parse(savedData);
    blogPosts = data.posts.filter(post => post.published);
    return;
  }
  
  // Fallback to JSON file (only works on web server, not file://)
  try {
    const response = await fetch('blog-data.json');
    const data = await response.json();
    blogPosts = data.posts.filter(post => post.published);
  } catch (error) {
    console.log('Loading from JSON file failed (normal when testing locally)');
    // Initialize with empty array if no data available
    blogPosts = [];
  }
}

// Contact form handling
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Create mailto link
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    const mailtoLink = `mailto:faiziabkhan1@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client should open now.');
    
    // Reset form
    contactForm.reset();
  });
}

// Admin functionality
function setupAdmin() {
  const adminTrigger = document.getElementById('admin-trigger');
  const adminOverlay = document.getElementById('admin-overlay');
  const closeAdmin = document.getElementById('close-admin');
  const loginForm = document.getElementById('admin-login-form');
  const blogCreateForm = document.getElementById('blog-create-form');
  const logoutBtn = document.getElementById('logout-btn');
  const loginSection = document.getElementById('login-section');
  const adminPanel = document.getElementById('admin-panel');
  const previewBtn = document.getElementById('preview-btn');
  const previewSection = document.getElementById('preview-section');
  const previewContent = document.getElementById('preview-content');

  // Check if admin elements exist (they won't be on blog.html)
  if (!adminTrigger) {
    console.log('Admin elements not found - skipping admin setup (this is normal on blog.html)');
    return;
  }

  // Tab functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab + '-tab').classList.add('active');
      
      // Load posts if switching to manage tab
      if (targetTab === 'manage') {
        loadAdminPosts();
        updateAdminStats();
      }
    });
  });

  // Open admin panel
  adminTrigger.addEventListener('click', function() {
    adminOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // Close admin panel
  closeAdmin.addEventListener('click', function() {
    adminOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  // Close on overlay click
  adminOverlay.addEventListener('click', function(e) {
    if (e.target === adminOverlay) {
      adminOverlay.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });

  // Login form
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('admin-password').value;
    
    if (auth.login(password)) {
      loginSection.classList.add('hidden');
      adminPanel.classList.remove('hidden');
      loadAdminPosts();
      updateAdminStats();
      document.getElementById('admin-password').value = '';
    } else {
      alert('Incorrect password!');
    }
  });

  // Logout
  logoutBtn.addEventListener('click', function() {
    auth.logout();
    loginSection.classList.remove('hidden');
    adminPanel.classList.add('hidden');
  });

  // Preview functionality
  previewBtn.addEventListener('click', function() {
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    
    if (!title || !content) {
      alert('Please fill in both title and content to preview');
      return;
    }
    
    previewContent.innerHTML = `
      <h1>${title}</h1>
      <p><em>Published: ${new Date().toISOString().split('T')[0]}</em></p>
      <hr>
      <div>${formatMarkdown(content)}</div>
    `;
    
    previewSection.classList.remove('hidden');
    previewSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Create blog post
  blogCreateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    
    if (!title || !content) {
      alert('Please fill in both title and content');
      return;
    }
    
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toISOString().split('T')[0],
      published: true
    };
    
    // Add to blog posts
    blogPosts.unshift(newPost);
    
    // Save to localStorage
    const blogData = { posts: blogPosts };
    localStorage.setItem('blogData', JSON.stringify(blogData));
    
    // Update display
    loadAdminPosts();
    updateAdminStats();
    
    // Clear form
    blogCreateForm.reset();
    previewSection.classList.add('hidden');
    
    // Show success message
    showNotification('Blog post published successfully!', 'success');
  });
}

// Format markdown for preview
function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/\n/g, '<br>');
}

// Update admin statistics
function updateAdminStats() {
  const totalPosts = document.getElementById('total-posts-count');
  const latestPostDate = document.getElementById('latest-post-date');
  
  if (totalPosts) {
    totalPosts.textContent = blogPosts.length;
  }
  
  if (latestPostDate && blogPosts.length > 0) {
    const latestPost = blogPosts[0];
    latestPostDate.textContent = latestPost.date;
  }
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Load admin posts list
function loadAdminPosts() {
  const adminPostsList = document.getElementById('admin-posts-list');
  if (!adminPostsList) return;
  
  adminPostsList.innerHTML = blogPosts.map(post => `
    <div class="admin-post-item">
      <div class="admin-post-info">
        <h5>${post.title}</h5>
        <div class="admin-post-meta">${post.date}</div>
      </div>
      <div class="admin-post-actions">
        <button class="delete-post-btn" onclick="deleteBlogPost(${post.id})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `).join('');
}

// Delete blog post
function deleteBlogPost(id) {
  if (confirm('Are you sure you want to delete this post?')) {
    blogPosts = blogPosts.filter(post => post.id !== id);
    
    // Save to localStorage
    const blogData = { posts: blogPosts };
    localStorage.setItem('blogData', JSON.stringify(blogData));
    
    // Update displays
    loadAdminPosts();
    
    alert('Post deleted successfully!');
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadBlogPosts();
  setupContactForm();
  setupAdmin();
});


