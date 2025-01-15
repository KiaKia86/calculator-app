document.addEventListener('DOMContentLoaded', function () {
    const historyList = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history');

    // Load history from localStorage
    let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

    // Display history
    function displayHistory() {
        historyList.innerHTML = '';
        history.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.expression} = ${item.result}`;
            historyList.appendChild(li);
        });
    }

    // Add to history
    function addToHistory(expression, result) {
        history.unshift({ expression, result });
        if (history.length > 10) history.pop(); // Keep only the last 10 items
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
        displayHistory();
    }

    // Clear history
    clearHistoryButton.addEventListener('click', function () {
        history = [];
        localStorage.removeItem('calculatorHistory');
        displayHistory();
    });

    // Initial display
    displayHistory();
});