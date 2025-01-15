document.addEventListener('DOMContentLoaded', function () {
    const startPage = document.getElementById('start-page');
    const calculator = document.querySelector('.calculator');
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', function () {
        startPage.style.display = 'none';
        calculator.classList.remove('hidden');
    });
});