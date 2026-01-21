document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Console System Init
    console.log(
        "%c SYSTEM INITIALIZED. WELCOME, USER. ",
        "background: #000; color: #00f3ff; font-family: monospace; padding: 10px; border: 1px solid #00f3ff;"
    );

    // Typing Effect for Title
    const titleElement = document.getElementById('typing-title');
    const textToType = "Software Engineer";
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            titleElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100); // Typing speed
        } else {
            // Blinking cursor effect after typing
            setInterval(() => {
                if (titleElement.textContent.endsWith('_')) {
                    titleElement.textContent = textToType;
                } else {
                    titleElement.textContent = textToType + '_';
                }
            }, 800);
        }
    }

    // Start typing after a short delay
    setTimeout(typeText, 500);


    // Real-time Clock
    const clockElement = document.getElementById('clock');
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call
});
