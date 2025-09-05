// ===== Authentication UI Controller =====
// Handles all authentication UI interactions and form submissions

// ===== Modal Management =====
function showAuthModal(mode = 'login') {
    const modal = document.getElementById('auth-modal-container') || document.querySelector('.auth-modal');
    if (!modal) {
        console.error('Auth modal not found');
        return;
    }
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Show the specified form
    if (mode === 'forgot') {
        showForgotPassword();
    } else {
        showLogin();
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal-container') || document.querySelector('.auth-modal');
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
        resetAllForms();
    }, 300);
}

function showLogin() {
    switchForm('login-form');
}

function showForgotPassword() {
    switchForm('forgot-form');
}

function showSuccess(title, message) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    switchForm('auth-success');
}

function switchForm(formId) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // Show target form
    setTimeout(() => {
        document.getElementById(formId).classList.add('active');
    }, 200);
}

// ===== Form Handlers =====
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMeEl = document.getElementById('remember-me');
    const rememberMe = rememberMeEl ? rememberMeEl.checked : false;
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    try {
        // Attempt login
        const user = window.TYGAuth.login(email, password);
        
        // Handle remember me
        if (rememberMe) {
            localStorage.setItem('tyg_rememberUser', email);
        } else {
            localStorage.removeItem('tyg_rememberUser');
        }
        
        // Success - close modal and redirect appropriately
        setButtonLoading(submitBtn, false);
        closeAuthModal();
        updateAuthState();
        
        // Show success message
        console.log(`Welcome back, ${user.firstName}! Redirecting...`);
        
        // Smart redirect based on user data
        setTimeout(() => {
            redirectAfterLogin(false); // Not a new user
        }, 500);
        
    } catch (error) {
        setButtonLoading(submitBtn, false);
        showFormError(form, error.message);
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    
    // Clear previous errors
    clearFormErrors(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    try {
        // Request password reset
        const resetToken = window.TYGAuth.requestPasswordReset(email);
        
        // In a real app, this would send an email
        // For demo, we'll show the token
        console.log('Password reset token (for demo):', resetToken);
        
        // Success - close modal and show console message
        setButtonLoading(submitBtn, false);
        closeAuthModal();
        console.log(`Reset link sent to ${email}. Check your inbox and follow the link to reset your password.`);
        
    } catch (error) {
        setButtonLoading(submitBtn, false);
        showFormError(form, error.message);
    }
}

function handleLogout() {
    if (window.TYGAuth) {
        window.TYGAuth.logout();
        updateAuthState();
        
        // Redirect to home if on protected page
        const protectedPages = ['dashboard.html', 'academy-homepage.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
    }
}

// ===== UI Helper Functions =====
function setButtonLoading(button, loading) {
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

function showFormError(form, message) {
    // Remove existing error
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Insert before submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    form.insertBefore(errorDiv, submitBtn);
    
    // Add error styling to form
    form.classList.add('error');
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
            form.classList.remove('error');
        }
    }, 5000);
}

function clearFormErrors(form) {
    const errorMessage = form.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    form.classList.remove('error');
    
    // Clear input error states
    form.querySelectorAll('.form-group.error').forEach(group => {
        group.classList.remove('error');
    });
}

function resetAllForms() {
    document.querySelectorAll('.auth-form form').forEach(form => {
        form.reset();
        clearFormErrors(form);
        setButtonLoading(form.querySelector('button[type="submit"]'), false);
    });
}

// ===== Password Utilities =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentNode.querySelector('.password-toggle');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '🙈';
    } else {
        input.type = 'password';
        toggle.textContent = '👁️';
    }
}

function updatePasswordStrength() {
    const passwordInput = document.getElementById('signup-password');
    const strengthIndicator = document.getElementById('password-strength');
    
    if (!passwordInput || !strengthIndicator) return;
    
    const password = passwordInput.value;
    let strength = 0;
    
    // Check various criteria
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    // Update indicator
    strengthIndicator.className = 'password-strength';
    if (strength >= 4) {
        strengthIndicator.classList.add('strong');
    } else if (strength >= 2) {
        strengthIndicator.classList.add('medium');
    } else if (strength > 0) {
        strengthIndicator.classList.add('weak');
    }
}

// ===== User Menu Management =====
function toggleUserMenu() {
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

function updateAuthState() {
    const user = window.TYGAuth?.getCurrentUser();
    const loginButton = document.getElementById('login-button');
    const userMenu = document.getElementById('user-menu');
    
    if (user) {
        // User is logged in
        if (loginButton) {
            loginButton.style.display = 'none';
        }
        
        if (userMenu) {
            // Update user info
            const initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
            const userInitialsEl = document.getElementById('user-initials');
            const userDisplayNameEl = document.getElementById('user-display-name');
            const userDisplayEmailEl = document.getElementById('user-display-email');
            
            if (userInitialsEl) userInitialsEl.textContent = initials;
            if (userDisplayNameEl) userDisplayNameEl.textContent = user.fullName;
            if (userDisplayEmailEl) userDisplayEmailEl.textContent = user.email;
            
            userMenu.classList.remove('hidden');
        }
        
        // Update any user-specific content
        updateUserContent(user);
        
    } else {
        // User is not logged in
        if (loginButton) {
            loginButton.style.display = 'block';
        }
        
        if (userMenu) {
            userMenu.classList.add('hidden');
            userMenu.classList.remove('active');
        }
        
        // Clear user-specific content
        clearUserContent();
    }
}

function updateUserContent(user) {
    console.log('updateUserContent called with user:', user);
    
    // Update any elements that show user data
    document.querySelectorAll('[data-user-name]').forEach(el => {
        console.log('Updating data-user-name element:', el, 'with fullName:', user.fullName);
        el.textContent = user.fullName;
    });
    
    document.querySelectorAll('[data-user-email]').forEach(el => {
        el.textContent = user.email;
    });
    
    document.querySelectorAll('[data-user-firstname]').forEach(el => {
        el.textContent = user.firstName;
    });
    
    // Update IQ score if available
    if (user.iqScore) {
        document.querySelectorAll('[data-user-iq]').forEach(el => {
            el.textContent = user.iqScore;
        });
    }
}

function clearUserContent() {
    document.querySelectorAll('[data-user-name]').forEach(el => {
        el.textContent = '';
    });
    
    document.querySelectorAll('[data-user-email]').forEach(el => {
        el.textContent = '';
    });
}

// ===== Page Protection =====
function requireAuth() {
    if (!window.TYGAuth) {
        console.warn('Auth system not loaded yet');
        return false;
    }
    
    const user = window.TYGAuth.getCurrentUser();
    if (!user) {
        // Redirect to home with auth prompt
        window.location.href = 'index.html?auth=required';
        return false;
    }
    return true;
}

function checkAuthRequired() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'required') {
        showAuthModal('login');
        // Remove the parameter from URL
        window.history.replaceState({}, '', window.location.pathname);
    }
}

// ===== Auto-fill for returning users =====
function setupAutoFill() {
    const rememberedEmail = localStorage.getItem('tyg_rememberUser');
    if (rememberedEmail) {
        const emailInput = document.getElementById('login-email');
        if (emailInput) {
            emailInput.value = rememberedEmail;
            document.getElementById('remember-me').checked = true;
        }
    }
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', function() {
    // Update auth state on page load
    updateAuthState();
    
    // Check for auth requirements
    checkAuthRequired();
    
    // Setup auto-fill
    setupAutoFill();
    
    // Password strength monitoring
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', updatePasswordStrength);
    }
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('auth-modal');
        const userMenu = document.getElementById('user-menu');
        
        if (e.target === modal?.querySelector('.auth-overlay')) {
            closeAuthModal();
        }
        
        if (userMenu && !userMenu.contains(e.target) && !e.target.closest('.user-menu-trigger')) {
            userMenu.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAuthModal();
            document.getElementById('user-menu')?.classList.remove('active');
        }
    });
});

// ===== Auth Events =====
document.addEventListener('authlogin', function(e) {
    console.log('User logged in:', e.detail);
    updateAuthState();
    
    // Store test results if they exist
    const testResults = JSON.parse(localStorage.getItem('iqTestResults') || 'null');
    if (testResults && testResults.score) {
        window.TYGAuth.updateIQScore(testResults.score, testResults);
    }
});

document.addEventListener('authlogout', function(e) {
    console.log('User logged out:', e.detail);
    updateAuthState();
});

// ===== Simple Redirect System =====
function redirectAfterLogin(isNewUser = false) {
    const user = window.TYGAuth?.getCurrentUser();
    const currentPage = window.location.pathname.split('/').pop();
    const currentPageLower = currentPage.toLowerCase();
    
    if (!user) {
        console.warn('No user found for redirect');
        return;
    }
    
    console.log('� Simple redirect - User:', user.fullName, 'Current page:', currentPage);
    
    // Special pages where users should always stay (no redirects)
    const stayOnPageList = [
        'payment.html',
        'payment-premium.html', 
        'iq-test.html',
        'teaser-results.html',
        'dashboard.html' // Keep users on dashboard
    ];
    
    if (stayOnPageList.includes(currentPageLower)) {
        console.log('📍 Staying on current page:', currentPage);
        updatePageForLoggedInUser();
        return;
    }
    
    // Only redirect from homepage or other non-special pages
    console.log('🔄 Redirecting to dashboard');
    window.location.href = 'dashboard.html';
}

function updatePageForLoggedInUser() {
    // Update any page-specific content for logged-in users
    const user = window.TYGAuth.getCurrentUser();
    if (!user) return;
    
    // Update user-specific elements
    updateUserContent(user);
    
    // If on payment pages, update the certificate with user name
    if (window.location.pathname.includes('payment')) {
        const nameInputs = document.querySelectorAll('input[name="firstName"], input[name="fullName"]');
        nameInputs.forEach(input => {
            if (!input.value) {
                input.value = user.firstName;
                // Trigger any live update events
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
        
        const emailInputs = document.querySelectorAll('input[name="email"]');
        emailInputs.forEach(input => {
            if (!input.value) {
                input.value = user.email;
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    }
}

function showWelcomeMessage(user, isNewUser = false) {
    // Create welcome notification
    const welcomeHTML = `
        <div id="welcome-notification" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #64D4FF 0%, #4FACFE 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(100, 212, 255, 0.3);
            z-index: 10001;
            max-width: 350px;
            animation: slideInRight 0.5s ease;
        ">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="font-size: 24px;">${isNewUser ? '🎉' : '👋'}</div>
                <div>
                    <div style="font-weight: 600; font-size: 16px;">
                        ${isNewUser ? `Welcome to Test Your Genius, ${user.firstName}!` : `Welcome back, ${user.firstName}!`}
                    </div>
                    <div style="font-size: 14px; opacity: 0.9; margin-top: 4px;">
                        ${isNewUser ? 'Your genius journey starts here. Take your IQ test!' : 'Continue your genius development journey.'}
                    </div>
                </div>
                <button onclick="closeWelcomeNotification()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 4px;
                    margin-left: auto;
                ">×</button>
            </div>
        </div>
        <style>
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', welcomeHTML);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeWelcomeNotification();
    }, 5000);
}

function closeWelcomeNotification() {
    const notification = document.getElementById('welcome-notification');
    if (notification) {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }
}

function startIQTest() {
    closeAuthModal();
    window.location.href = 'iq-test.html';
}

// ===== Payment Registration System =====
function createAccountFromPayment(paymentData) {
    try {
        console.log('🔄 Creating account from payment data:', paymentData);
        
        // Clear any redirect loop prevention data since this is a fresh payment
        sessionStorage.removeItem('lastRedirect');
        
        // Validate payment data
        if (!paymentData) {
            throw new Error('No payment data provided');
        }
        
        // Extract and validate required fields
        const firstName = paymentData.firstName || paymentData.first_name || '';
        const lastName = paymentData.lastName || paymentData.last_name || '';
        const email = paymentData.email || '';
        
        if (!firstName || !lastName || !email) {
            throw new Error(`Missing required fields: firstName=${firstName}, lastName=${lastName}, email=${email}`);
        }
        
        // Extract data from payment form
        const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            password: generateTempPassword(), // Generate temporary password
            fromPayment: true,
            paymentData: {
                plan: paymentData.plan || 'premium',
                amount: paymentData.amount || 0,
                paymentDate: new Date().toISOString(),
                cardLast4: paymentData.cardNumber ? paymentData.cardNumber.slice(-4) : '****'
            }
        };
        
        // Check if user already exists
        const existingUser = window.TYGAuth.findUserByEmail(userData.email);
        if (existingUser) {
            console.log('📝 User exists, updating with payment data');
            // Update existing user with payment info
            window.TYGAuth.updateUserData({
                paymentData: userData.paymentData,
                planUpgraded: true
            });
            // Auto-login existing user
            window.TYGAuth.loginUser(existingUser);
        } else {
            console.log('✨ Creating new user from payment');
            // Create new user
            const newUser = window.TYGAuth.register(userData);
            console.log('✅ Account created successfully for:', newUser.fullName);
        }
        
        // Add IQ test results if available
        const iqResults = JSON.parse(localStorage.getItem('iqTestResults') || 'null');
        if (iqResults && iqResults.score) {
            console.log('📊 Adding IQ test results to new account');
            window.TYGAuth.updateIQScore(iqResults.score, iqResults);
        }
        
        // Get the final user data
        const finalUser = window.TYGAuth.getCurrentUser();
        console.log('🎯 Final user data:', finalUser);
        
        return finalUser;
        
    } catch (error) {
        console.error('❌ Account creation failed:', error.message);
        throw error;
    }
}

function generateTempPassword() {
    // Generate a temporary password (user will be prompted to change it)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password + '!'; // Add special character to meet requirements
}

function handlePaymentSuccess(paymentData) {
    console.log('🎯 Simple payment success handling');
    
    try {
        // Check if we're already on the dashboard to avoid redirect loops
        const currentPage = window.location.pathname.split('/').pop().toLowerCase();
        
        if (currentPage === 'dashboard.html') {
            console.log('✅ Already on dashboard, skipping redirect');
            return; // Don't redirect if already on dashboard
        }
        
        // Just create a basic user account without complex validation
        const user = {
            id: 'user_' + Date.now(),
            email: 'premium@user.com',
            fullName: 'Premium User',
            accountType: 'premium',
            fromPayment: true,
            joinDate: new Date().toISOString()
        };
        
        // Save the user
        if (!window.TYGAuth.users) window.TYGAuth.users = [];
        window.TYGAuth.users.push(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('users', JSON.stringify(window.TYGAuth.users));
        
        console.log('✅ Simple user created:', user);
        
        // Only redirect if not on dashboard
        console.log('🔄 Redirecting to dashboard from:', currentPage);
        window.location.href = 'dashboard.html?payment=success';
        
    } catch (error) {
        console.error('❌ Payment handling failed:', error);
        // Only redirect if not on dashboard
        const currentPage = window.location.pathname.split('/').pop().toLowerCase();
        if (currentPage !== 'dashboard.html') {
            window.location.href = 'dashboard.html';
        }
    }
}

function showPaymentSuccessModal(user, paymentData, errorMessage = null) {
    const modalHTML = `
        <div id="payment-success-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            backdrop-filter: blur(10px);
        ">
            <div style="
                background: linear-gradient(135deg, #070B1A 0%, #0E1A3A 100%);
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                color: #EAF2FF;
                border: 2px solid rgba(100, 212, 255, 0.3);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            ">
                <div style="font-size: 64px; margin-bottom: 20px;">
                    ${errorMessage ? '⚠️' : '🎉'}
                </div>
                
                <h2 style="color: #64D4FF; margin-bottom: 15px;">
                    ${errorMessage ? 'Payment Complete!' : 'Welcome to Test Your Genius!'}
                </h2>
                
                ${user ? `
                    <p style="margin-bottom: 20px;">
                        Congratulations <strong>${user.fullName}</strong>!<br>
                        Your account has been created successfully.
                    </p>
                    
                    <div style="
                        background: rgba(100, 212, 255, 0.1);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                        text-align: left;
                    ">
                        <h4 style="color: #4FACFE; margin-bottom: 10px;">Account Details:</h4>
                        <p><strong>Name:</strong> ${user.fullName}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <p><strong>Plan:</strong> ${paymentData.plan || 'Premium'}</p>
                        ${user.iqScore ? `<p><strong>IQ Score:</strong> ${user.iqScore}</p>` : ''}
                    </div>
                    
                    <p style="font-size: 14px; opacity: 0.8; margin-bottom: 20px;">
                        Check your email for login credentials and getting started guide.
                    </p>
                ` : `
                    <p style="margin-bottom: 20px;">
                        Your payment has been processed successfully!
                        ${errorMessage ? `<br><br><span style="color: #FF6B6B;">Account creation issue: ${errorMessage}</span>` : ''}
                    </p>
                `}
                
                <button onclick="closePaymentSuccessModal()" style="
                    background: linear-gradient(135deg, #64D4FF 0%, #4FACFE 100%);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 16px;
                ">
                    Continue to Dashboard
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closePaymentSuccessModal() {
    const modal = document.getElementById('payment-success-modal');
    if (modal) {
        modal.remove();
    }
    // Force redirect to dashboard
    window.location.href = 'dashboard.html?welcome=payment';
}
