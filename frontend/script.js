// Navbar toggle functionality
document.querySelector('.navbar-toggle').addEventListener('click', function() {
    document.querySelector('.navbar-links').classList.toggle('active');
});

// Signup form functionality
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submit-btn');
    const successTick = document.getElementById('success-tick');
    const errorCross = document.getElementById('error-cross');

    // Hide previous success/error indicators
    successTick.style.display = 'none';
    errorCross.style.display = 'none';

    // Disable the submit button to prevent multiple submissions
    submitBtn.disabled = true;

    
    
    try {
        const response = await fetch(`http://localhost:4444/email_signup?emailId=${encodeURIComponent(email)}`, {
            method: 'POST'
        });

        if (response.ok) {
            successTick.style.display = 'inline-block';
        } else {
            errorCross.style.display = 'inline-block';
        }
    } catch (error) {
        // Handle network errors (e.g., server down, connection refused)
        errorCross.style.display = 'inline-block';
    }

    // Reset the form after a few seconds
    setTimeout(() => {
        document.getElementById('signup-form').reset();
        submitBtn.disabled = false;
        successTick.style.display = 'none';
        errorCross.style.display = 'none';
    }, 3000);
});


document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.blog-scroll-container');
    const slider = document.querySelector('.blog-cards');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const cards = document.querySelectorAll('.blog-card');
    
    let currentPosition = 0;
    
    function calculateMetrics() {
        const containerWidth = container.offsetWidth;
        const cardStyle = window.getComputedStyle(cards[0]);
        const cardWidth = cards[0].offsetWidth;
        const cardMargin = parseInt(cardStyle.marginRight) || 20;
        const cardTotalWidth = cardWidth + cardMargin;
        const visibleCards = Math.floor(containerWidth / cardTotalWidth);
        const totalScroll = (cards.length * cardTotalWidth) - containerWidth;
        
        return {
            containerWidth,
            cardTotalWidth,
            visibleCards,
            totalScroll
        };
    }
    
    function updateSliderPosition() {
        const { totalScroll } = calculateMetrics();
        
        // Ensure we don't scroll beyond the last card
        currentPosition = Math.max(Math.min(currentPosition, totalScroll), 0);
        
        // Apply the transform
        slider.style.transform = `translateX(-${currentPosition}px)`;
        
        // Update button states
        prevButton.disabled = currentPosition <= 0;
        nextButton.disabled = currentPosition >= totalScroll;
    }
    
    nextButton.addEventListener('click', () => {
        const { cardTotalWidth, containerWidth } = calculateMetrics();
        // Move by container width or remaining distance, whichever is smaller
        const remainingScroll = slider.scrollWidth - containerWidth - currentPosition;
        const moveAmount = Math.min(containerWidth, remainingScroll);
        currentPosition += moveAmount;
        updateSliderPosition();
    });
    
    prevButton.addEventListener('click', () => {
        const { containerWidth } = calculateMetrics();
        // Move back by container width or to the start, whichever is smaller
        const moveAmount = Math.min(containerWidth, currentPosition);
        currentPosition -= moveAmount;
        updateSliderPosition();
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const { totalScroll } = calculateMetrics();
            // Make sure we don't exceed bounds after resize
            currentPosition = Math.min(currentPosition, totalScroll);
            updateSliderPosition();
        }, 250);
    });
    
    // Initial setup
    updateSliderPosition();
});