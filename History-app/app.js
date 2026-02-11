/* ========================================
   HISTORY APP — SHARED JAVASCRIPT
   Handles questionnaire, localStorage, modals
   ======================================== */

(function() {
    'use strict';

    /**
     * ----------------------------------------
     * LOCAL STORAGE HELPERS
     * ----------------------------------------
     */
    const Storage = {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('LocalStorage not available:', e);
            }
        },
        
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.warn('LocalStorage not available:', e);
                return defaultValue;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
            } catch (e) {
                console.warn('LocalStorage not available:', e);
            }
        }
    };

    // Expose Storage globally
    window.HistoryApp = window.HistoryApp || {};
    window.HistoryApp.Storage = Storage;

    /**
     * ----------------------------------------
     * QUESTIONNAIRE LOGIC (page2.html)
     * ----------------------------------------
     */
    const Questionnaire = {
        questions: [
            {
                id: 'history_focus',
                title: 'What fascinates you most about history?',
                options: [
                    'Ancient civilizations',
                    'Great leaders',
                    'Science & discoveries',
                    'Empires & battles',
                    'Lost worlds & mysteries'
                ]
            },
            {
                id: 'experience_style',
                title: 'How do you prefer to experience history?',
                options: [
                    'Short cinematic stories',
                    'Deep immersive narratives',
                    'Timelines & explanations',
                    'Visual storytelling',
                    'A mix of everything'
                ]
            },
            {
                id: 'era_interest',
                title: 'Which eras attract you the most?',
                options: [
                    'Ancient world',
                    'Classical antiquity',
                    'Medieval era',
                    'Modern history',
                    'All eras'
                ]
            }
        ],
        
        currentIndex: 0,
        
        init() {
            const container = document.getElementById('questionnaire-container');
            if (!container) return;
            
            this.container = container;
            this.render();
        },
        
        render() {
            const question = this.questions[this.currentIndex];
            const progress = ((this.currentIndex + 1) / this.questions.length) * 100;
            
            this.container.innerHTML = `
                <header class="progress-header">
                    <p class="progress-header__step">Step ${this.currentIndex + 1} of ${this.questions.length}</p>
                    <div class="progress-bar">
                        <div class="progress-bar__fill" style="width: ${progress}%"></div>
                    </div>
                </header>
                
                <div class="question-screen fade-in">
                    <div class="question-card">
                        <h1 class="question-card__title">${question.title}</h1>
                        <div class="answer-options">
                            ${question.options.map((opt, i) => `
                                <button class="answer-btn" data-index="${i}" data-value="${opt}">
                                    ${opt}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            // Attach event listeners
            this.container.querySelectorAll('.answer-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.handleAnswer(e));
            });
        },
        
        handleAnswer(e) {
            const btn = e.currentTarget;
            const value = btn.dataset.value;
            const question = this.questions[this.currentIndex];
            
            // Visual feedback
            btn.classList.add('selected');
            
            // Save to localStorage
            Storage.set(question.id, value);
            
            // Auto-advance after delay
            setTimeout(() => {
                this.currentIndex++;
                
                if (this.currentIndex < this.questions.length) {
                    this.render();
                } else {
                    this.showLoading();
                }
            }, 400);
        },
        
        showLoading() {
            this.container.innerHTML = `
                <div class="loading-screen fade-in">
                    <h1 class="loading-screen__title">Your experience is being prepared</h1>
                    <p class="loading-screen__subtitle">Crafting stories based on your interests…</p>
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <a href="page3.html" class="btn btn-primary">Continue</a>
                </div>
            `;
        }
    };

    // Expose Questionnaire globally
    window.HistoryApp.Questionnaire = Questionnaire;

    /**
     * ----------------------------------------
     * PAYMENT PAGE LOGIC (page3.html)
     * ----------------------------------------
     */
    const Payment = {
        init() {
            this.loadUserPicks();
            this.initOfferSelector();
            this.initCheckoutButton();
        },
        
        loadUserPicks() {
            const container = document.getElementById('user-picks');
            if (!container) return;
            
            const picks = [];
            
            // Get saved answers
            const focus = Storage.get('history_focus');
            const style = Storage.get('experience_style');
            const era = Storage.get('era_interest');
            
            if (focus) picks.push(focus);
            if (style) picks.push(style);
            if (era) picks.push(era);
            
            if (picks.length > 0) {
                container.innerHTML = picks.map(pick => 
                    `<span class="picks-summary__tag">${pick}</span>`
                ).join('');
                container.closest('.picks-summary').classList.remove('hidden');
            }
        },
        
        initOfferSelector() {
            const cards = document.querySelectorAll('.offer-card');
            if (!cards.length) return;
            
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    // Remove selected from all
                    cards.forEach(c => c.classList.remove('selected'));
                    // Add selected to clicked
                    card.classList.add('selected');
                    // Store selection
                    Storage.set('selected_plan', card.dataset.plan);
                });
            });
        },
        
        initCheckoutButton() {
            const btn = document.getElementById('checkout-btn');
            if (!btn) return;
            
            btn.addEventListener('click', () => {
                // Simulate payment processing with brief delay
                btn.textContent = 'Processing...';
                btn.disabled = true;
                
                setTimeout(() => {
                    // Redirect to success page
                    window.location.href = 'page4-success.html';
                }, 1000);
            });
        }
    };

    // Expose Payment globally
    window.HistoryApp.Payment = Payment;

    /**
     * ----------------------------------------
     * MODAL
     * ----------------------------------------
     */
    const Modal = {
        show(title, text) {
            // Create modal if it doesn't exist
            let overlay = document.getElementById('modal-overlay');
            
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'modal-overlay';
                overlay.className = 'modal-overlay';
                overlay.innerHTML = `
                    <div class="modal">
                        <h2 class="modal__title"></h2>
                        <p class="modal__text"></p>
                        <button class="btn btn-primary" id="modal-close">Got it</button>
                    </div>
                `;
                document.body.appendChild(overlay);
                
                // Close handlers
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) this.hide();
                });
                overlay.querySelector('#modal-close').addEventListener('click', () => this.hide());
            }
            
            // Update content
            overlay.querySelector('.modal__title').textContent = title;
            overlay.querySelector('.modal__text').textContent = text;
            
            // Show
            requestAnimationFrame(() => {
                overlay.classList.add('active');
            });
        },
        
        hide() {
            const overlay = document.getElementById('modal-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    };

    // Expose Modal globally
    window.HistoryApp.Modal = Modal;

    /**
     * ----------------------------------------
     * SMOOTH SCROLL & PAGE INIT
     * ----------------------------------------
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    /**
     * ----------------------------------------
     * INITIALIZE ON DOM READY
     * ----------------------------------------
     */
    function init() {
        initSmoothScroll();
        
        // Page-specific initialization
        if (document.getElementById('questionnaire-container')) {
            Questionnaire.init();
        }
        
        if (document.querySelector('.payment-page')) {
            Payment.init();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
