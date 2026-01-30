// Image list
const images = [
    'image.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 
    'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg',
    'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg',
    'image13.jpg', 'image14.jpg'
];

// Error messages for each attempt
const errorMessages = [
    "❌ INVALID CHOICE ❌<br><br>Please try again.",
    "❌ ERROR ❌<br><br>Really? You sure about this?<br><br>Try again.",
    "❌ CRITICAL ERROR ❌<br><br>Okay this is just getting ridiculous...<br><br>Think carefully and try again.",
];

// State
let noClickCount = 0;

// Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noCard = document.getElementById('noCard');
const mainContainer = document.getElementById('mainContainer');
const yesResponse = document.getElementById('yesResponse');
const crashScreen = document.getElementById('crashScreen');
const blackScreen = document.getElementById('blackScreen');
const errorMessage = document.getElementById('errorMessage');
const photoBackground = document.getElementById('photoBackground');
const photoCollage = document.getElementById('photoCollage');

// Initialize background photo grid
function initPhotoBackground() {
    // Repeat images multiple times to fill entire page
    const repeats = 10; // Repeat the image set 10 times
    for (let i = 0; i < repeats; i++) {
        images.forEach((img) => {
            const imgElement = document.createElement('img');
            imgElement.src = img;
            imgElement.className = 'bg-image';
            photoBackground.appendChild(imgElement);
        });
    }
}

// Yes button handler
yesBtn.addEventListener('click', () => {
    console.log('Yes button clicked!');
    mainContainer.style.display = 'none';
    yesResponse.style.display = 'flex';
    
    // Confetti effect
    createConfetti();
    
    // Sequential message reveals
    setTimeout(() => {
        document.getElementById('message1').classList.add('show');
    }, 500);
    
    setTimeout(() => {
        document.getElementById('message2').classList.add('show');
    }, 3000);
    
    setTimeout(() => {
        document.getElementById('countdownContainer').classList.add('show');
        startCountdown();
    }, 5500);
});

// No button handler
noBtn.addEventListener('click', () => {
    console.log('No button clicked! Attempt:', noClickCount + 1);
    
    if (noClickCount < 3) {
        // Show black screen with error message
        showBlackScreen(errorMessages[noClickCount]);
        noClickCount++;
        
        // Hide after 2-5 seconds randomly
        const hideDelay = Math.random() * 3000 + 2000; // 2-5 seconds
        setTimeout(() => {
            hideBlackScreen();
        }, hideDelay);
    } else {
        // After 3 attempts, trigger crash screen
        showCrashScreen();
    }
});

// Show black screen
function showBlackScreen(message) {
    errorMessage.innerHTML = message;
    blackScreen.style.display = 'flex';
}

// Hide black screen
function hideBlackScreen() {
    blackScreen.style.display = 'none';
}

// Show crash screen
function showCrashScreen() {
    mainContainer.style.display = 'none';
    crashScreen.style.display = 'flex';
    
    // Countdown
    let countdown = 3;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            resetToYesOnly();
        }
    }, 1000);
}

// Reset to Yes only
function resetToYesOnly() {
    crashScreen.style.display = 'none';
    mainContainer.style.display = 'block';
    
    // Remove No option entirely
    noCard.style.display = 'none';
    
    // Update messages
    document.querySelector('.title').textContent = 'So... Will You Be My Valentine?';
    document.querySelector('.subtitle').textContent = 'There\'s only one correct answer now 😊';
}

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c2185b', '#f093fb', '#f5576c', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '1000';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const fall = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            fall.onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// Countdown timer to Valentine's Day
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        const now = new Date();
        const valentinesDay = new Date(2026, 1, 14, 19, 0, 0); // Feb 14, 2026, 7:00 PM
        
        const diff = valentinesDay - now;
        
        if (diff <= 0) {
            countdownElement.textContent = "It's time! 💕";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhotoBackground);
} else {
    initPhotoBackground();
}

console.log('Script loaded successfully');
