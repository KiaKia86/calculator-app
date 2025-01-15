document.addEventListener('DOMContentLoaded', function () {
    const lightThemeButton = document.getElementById('light-theme');
    const darkThemeButton = document.getElementById('dark-theme');
    const body = document.body;

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('calculatorTheme') || 'dark';
    body.classList.toggle('light-theme', savedTheme === 'light');

    // Switch to light theme
    lightThemeButton.addEventListener('click', function () {
        body.classList.add('light-theme');
        localStorage.setItem('calculatorTheme', 'light');
    });

    // Switch to dark theme
    darkThemeButton.addEventListener('click', function () {
        body.classList.remove('light-theme');
        localStorage.setItem('calculatorTheme', 'dark');
    });
});