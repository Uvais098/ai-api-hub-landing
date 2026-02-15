// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Calculator Functionality
const modelPricing = {
    gpt4: {
        official: 10.00,
        our: 5.99
    },
    claude: {
        official: 3.00,
        our: 1.79
    },
    gemini: {
        official: 7.00,
        our: 4.20
    },
    gpt35: {
        official: 0.50,
        our: 0.30
    }
};

function calculateSavings() {
    const tokenUsage = parseFloat(document.getElementById('tokenUsage').value) || 0;
    const selectedModel = document.getElementById('modelSelect').value;

    // Get pricing for selected model
    const pricing = modelPricing[selectedModel];

    // Calculate costs
    const officialCost = (tokenUsage * pricing.official).toFixed(2);
    const ourCost = (tokenUsage * pricing.our).toFixed(2);
    const savings = (officialCost - ourCost).toFixed(2);

    // Update display with animation
    updateValue('officialCost', `$${officialCost}`);
    updateValue('ourCost', `$${ourCost}`);
    updateValue('savings', `$${savings}/month`);
}

function updateValue(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        // Add pulse animation
        element.style.animation = 'none';
        setTimeout(() => {
            element.textContent = value;
            element.style.animation = 'numberPulse 0.5s ease-out';
        }, 10);
    }
}

// Code Example Tabs
function showCode(language) {
    // Hide all code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.code-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected code block
    const selectedBlock = document.getElementById(`${language}-code`);
    if (selectedBlock) {
        selectedBlock.classList.add('active');
    }

    // Add active class to clicked tab
    event.target.classList.add('active');
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't already open
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Sticky CTA Button - Show on scroll
window.addEventListener('scroll', function() {
    const stickyCTA = document.getElementById('sticky-cta');
    if (stickyCTA) {
        if (window.scrollY > 800) {
            stickyCTA.classList.add('visible');
        } else {
            stickyCTA.classList.remove('visible');
        }
    }
});

// Initialize calculator on page load
document.addEventListener('DOMContentLoaded', function() {
    // Calculate initial values
    calculateSavings();

    // Add event listeners for calculator inputs
    const tokenInput = document.getElementById('tokenUsage');
    const modelSelect = document.getElementById('modelSelect');

    if (tokenInput) {
        tokenInput.addEventListener('input', calculateSavings);
    }

    if (modelSelect) {
        modelSelect.addEventListener('change', calculateSavings);
    }

    // Initialize code tabs
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const language = this.textContent.toLowerCase().trim();
            showCode(language);
        });
    });

    // Add click handlers to FAQ items
    // Add click handlers to FAQ items - FIXED VERSION
	const faqHeadings = document.querySelectorAll('.faq-item h3');
	faqHeadings.forEach(heading => {
		heading.addEventListener('click', function() {
			const faqItem = this.closest('.faq-item');
			const isActive = faqItem.classList.contains('active');
			
			// Close all FAQ items
			const allFaqItems = document.querySelectorAll('.faq-item');
			allFaqItems.forEach(item => {
				item.classList.remove('active');
			});
			
			// Open clicked item if it wasn't already open
			if (!isActive) {
				faqItem.classList.add('active');
			}
		});
	});


    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Add animation for savings badges
document.addEventListener('DOMContentLoaded', function() {
    const savingsBadges = document.querySelectorAll('.savings');

    // Animate badges when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    savingsBadges.forEach(badge => {
        observer.observe(badge);
    });
});

// Number animation for metrics
function animateNumber(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Animate metrics when in view
document.addEventListener('DOMContentLoaded', function() {
    const metricValues = document.querySelectorAll('.metric-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number) {
                    entry.target.classList.add('animated');
                    entry.target.textContent = '0';
                    animateNumber(entry.target, number);
                    // Add back the suffix (M+, +, etc)
                    setTimeout(() => {
                        entry.target.textContent = text;
                    }, 1000);
                }
            }
        });
    }, { threshold: 0.5 });

    metricValues.forEach(value => {
        observer.observe(value);
    });
});

console.log('AI API Hub - Landing Page Loaded Successfully');
