const { remote } = require('electron');

document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = 'gamepage.html'; // Load the new page in the same window
});

window.addEventListener('error', (event) => {
    if (event.message.includes("Autofill")) {
        event.preventDefault(); // Suppress the error
    }
});
