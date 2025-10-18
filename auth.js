// Secure Authentication System
class SecureAuth {
  constructor() {
    this.encryptedHash = "38f8c2a9";
    this.sessionKey = "admin_session";
    this.isAuthenticated = false;
    
    // Check if already authenticated
    this.checkSession();
  }

  // Simple hash function (not for production, but secure enough for portfolio)
  hash(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Encrypt password for storage
  encryptPassword(password) {
    // Add salt and hash
    const salted = password + "FaiziabSalt2024";
    return this.hash(salted);
  }

  // Verify password
  verifyPassword(inputPassword) {
    const hashedInput = this.encryptPassword(inputPassword);
    return hashedInput === this.encryptedHash;
  }

  // Login function
  login(password) {
    if (this.verifyPassword(password)) {
      this.isAuthenticated = true;
      // Create session that expires in 24 hours
      const sessionData = {
        authenticated: true,
        timestamp: Date.now(),
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
      return true;
    }
    return false;
  }

  // Check existing session
  checkSession() {
    const sessionData = localStorage.getItem(this.sessionKey);
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        if (session.authenticated && Date.now() < session.expires) {
          this.isAuthenticated = true;
          return true;
        } else {
          // Session expired
          localStorage.removeItem(this.sessionKey);
        }
      } catch (e) {
        localStorage.removeItem(this.sessionKey);
      }
    }
    return false;
  }

  // Logout function
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem(this.sessionKey);
  }

  // Check if authenticated
  isLoggedIn() {
    return this.isAuthenticated || this.checkSession();
  }
}

// Global auth instance
const auth = new SecureAuth();

