// ===== Test Your Genius Authentication System =====
// LocalStorage-based authentication with validation and security

class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('tyg_users') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('tyg_currentUser') || 'null');
        this.sessionTimeout = 24 * 60 * 60 * 1000; // 24 hours
        this.init();
    }

    init() {
        // Check if current session is still valid
        if (this.currentUser && this.isSessionExpired()) {
            this.logout();
        }
        
        // Add auth event listeners
        this.setupEventListeners();
    }

    // ===== Validation Methods =====
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    // ===== Hash Simulation (for demo purposes) =====
    simpleHash(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // ===== User Management =====
    findUserByEmail(email) {
        return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    register(userData) {
        const { email, password, firstName, lastName } = userData;

        // Validation
        if (!this.validateEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        if (!this.validatePassword(password)) {
            throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
        }

        if (!this.validateName(firstName) || !this.validateName(lastName)) {
            throw new Error('Please enter your full name');
        }

        // Check if user already exists
        if (this.findUserByEmail(email)) {
            throw new Error('An account with this email already exists');
        }

        // Create new user
        const newUser = {
            id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            email: email.toLowerCase(),
            password: this.simpleHash(password), // In real app, use proper bcrypt
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            createdAt: new Date().toISOString(),
            lastLogin: null,
            iqScore: null,
            testCompleted: false,
            academyProgress: {
                currentWeek: 0,
                completedWeeks: [],
                totalLessons: 0
            },
            preferences: {
                emailNotifications: true,
                progressReminders: true
            }
        };

        // Add to users array
        this.users.push(newUser);
        this.saveUsers();

        // Auto-login user
        this.loginUser(newUser);

        return newUser;
    }

    login(email, password) {
        if (!this.validateEmail(email)) {
            throw new Error('Please enter a valid email address');
        }

        const user = this.findUserByEmail(email);
        if (!user) {
            throw new Error('No account found with this email address');
        }

        if (user.password !== this.simpleHash(password)) {
            throw new Error('Incorrect password');
        }

        // Update last login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Login user
        this.loginUser(user);

        return user;
    }

    loginUser(user) {
        const sessionData = {
            ...user,
            sessionStart: new Date().toISOString(),
            sessionExpiry: new Date(Date.now() + this.sessionTimeout).toISOString()
        };

        delete sessionData.password; // Never store password in session
        
        this.currentUser = sessionData;
        localStorage.setItem('tyg_currentUser', JSON.stringify(sessionData));
        
        // Trigger login event
        this.triggerAuthEvent('login', user);
    }

    logout() {
        if (this.currentUser) {
            this.triggerAuthEvent('logout', this.currentUser);
        }
        
        this.currentUser = null;
        localStorage.removeItem('tyg_currentUser');
    }

    // ===== Session Management =====
    isLoggedIn() {
        return this.currentUser !== null && !this.isSessionExpired();
    }

    isSessionExpired() {
        if (!this.currentUser || !this.currentUser.sessionExpiry) return true;
        return new Date() > new Date(this.currentUser.sessionExpiry);
    }

    extendSession() {
        if (this.currentUser) {
            this.currentUser.sessionExpiry = new Date(Date.now() + this.sessionTimeout).toISOString();
            localStorage.setItem('tyg_currentUser', JSON.stringify(this.currentUser));
        }
    }

    getCurrentUser() {
        return this.isLoggedIn() ? this.currentUser : null;
    }

    // ===== User Data Management =====
    updateUserData(updates) {
        if (!this.isLoggedIn()) {
            throw new Error('You must be logged in to update profile');
        }

        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Update user in users array
        this.users[userIndex] = { ...this.users[userIndex], ...updates };
        
        // Update current session
        this.currentUser = { ...this.currentUser, ...updates };
        
        this.saveUsers();
        localStorage.setItem('tyg_currentUser', JSON.stringify(this.currentUser));
        
        return this.currentUser;
    }

    updateIQScore(score, testResults) {
        if (!this.isLoggedIn()) return;

        this.updateUserData({
            iqScore: score,
            testCompleted: true,
            testResults: testResults,
            testCompletedAt: new Date().toISOString()
        });
    }

    updateAcademyProgress(weekNumber, lessonData) {
        if (!this.isLoggedIn()) return;

        const currentProgress = this.currentUser.academyProgress;
        const completedWeeks = [...currentProgress.completedWeeks];
        
        if (!completedWeeks.includes(weekNumber)) {
            completedWeeks.push(weekNumber);
        }

        this.updateUserData({
            academyProgress: {
                ...currentProgress,
                currentWeek: Math.max(currentProgress.currentWeek, weekNumber),
                completedWeeks: completedWeeks,
                totalLessons: currentProgress.totalLessons + 1
            }
        });
    }

    // ===== Password Reset (Simulation) =====
    requestPasswordReset(email) {
        const user = this.findUserByEmail(email);
        if (!user) {
            throw new Error('No account found with this email address');
        }

        // In a real app, this would send an email
        // For demo, we'll generate a reset token
        const resetToken = Math.random().toString(36).substr(2, 15);
        const resetExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        
        user.resetToken = resetToken;
        user.resetExpiry = resetExpiry.toISOString();
        this.saveUsers();

        // Return token for demo purposes (normally sent via email)
        return resetToken;
    }

    resetPassword(token, newPassword) {
        const user = this.users.find(u => u.resetToken === token);
        if (!user) {
            throw new Error('Invalid reset token');
        }

        if (new Date() > new Date(user.resetExpiry)) {
            throw new Error('Reset token has expired');
        }

        if (!this.validatePassword(newPassword)) {
            throw new Error('Password must be at least 8 characters with uppercase, lowercase, and number');
        }

        user.password = this.simpleHash(newPassword);
        user.resetToken = null;
        user.resetExpiry = null;
        this.saveUsers();

        return true;
    }

    // ===== Storage Management =====
    saveUsers() {
        localStorage.setItem('tyg_users', JSON.stringify(this.users));
    }

    // ===== Event System =====
    setupEventListeners() {
        // Auto-extend session on user activity
        ['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
            document.addEventListener(event, () => {
                if (this.isLoggedIn()) {
                    this.extendSession();
                }
            }, { passive: true });
        });
    }

    triggerAuthEvent(type, userData) {
        const event = new CustomEvent(`auth${type}`, {
            detail: userData
        });
        document.dispatchEvent(event);
    }

    // ===== Admin/Debug Methods =====
    getAllUsers() {
        return this.users.map(user => ({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin,
            iqScore: user.iqScore,
            testCompleted: user.testCompleted
        }));
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all user data? This cannot be undone.')) {
            localStorage.removeItem('tyg_users');
            localStorage.removeItem('tyg_currentUser');
            this.users = [];
            this.currentUser = null;
            console.log('All user data cleared');
        }
    }
}

// ===== Global Auth Functions =====
function showAuthModal() {
    const modal = document.getElementById('auth-modal-container');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal-container');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Auth modal closed, scroll restored');
    }
}

function showLogin() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('login-form').classList.add('active');
}

function showSignup() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('signup-form').classList.add('active');
}

function showForgotPassword() {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('forgot-form').classList.add('active');
}

function fillDemoCredentials() {
    document.getElementById('login-email').value = 'demo@testgenius.com';
    document.getElementById('login-password').value = 'Demo123!';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '🙈';
    } else {
        input.type = 'password';
        toggle.textContent = '👁️';
    }
}

function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const result = window.TYGAuth.login(email, password);
    if (result.success) {
        closeAuthModal();
        // Show success message or redirect
    } else {
        alert(result.message);
    }
}

function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const result = window.TYGAuth.register(firstName, lastName, email, password);
    if (result.success) {
        // Auto login after successful registration
        window.TYGAuth.login(email, password);
        closeAuthModal();
    } else {
        alert(result.message);
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    // Simulate password reset
    alert('Password reset link sent to: ' + email);
    showLogin();
}

// ===== Initialize Auth System =====
window.TYGAuth = new AuthSystem();

// ===== Auth Event Listeners =====
document.addEventListener('authlogin', (e) => {
    console.log('User logged in:', e.detail.fullName);
    // Update UI, redirect, etc.
});

document.addEventListener('authlogout', (e) => {
    console.log('User logged out:', e.detail.fullName);
    // Clear UI, redirect to home, etc.
});
