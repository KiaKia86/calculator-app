document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let isDegreeMode = true; // Default to degree mode for trigonometric functions
    let memory = 0; // Memory storage

    // Function to evaluate expressions safely
    function evaluateExpression(expression) {
        try {
            // Replace constants
            expression = expression.replace(/π/g, Math.PI);
            expression = expression.replace(/e/g, Math.E);

            // Replace scientific functions
            expression = expression.replace(/sin/g, isDegreeMode ? 'Math.sin(Math.PI/180*' : 'Math.sin(');
            expression = expression.replace(/cos/g, isDegreeMode ? 'Math.cos(Math.PI/180*' : 'Math.cos(');
            expression = expression.replace(/tan/g, isDegreeMode ? 'Math.tan(Math.PI/180*' : 'Math.tan(');
            expression = expression.replace(/log/g, 'Math.log10(');
            expression = expression.replace(/ln/g, 'Math.log(');
            expression = expression.replace(/sqrt/g, 'Math.sqrt(');
            expression = expression.replace(/\^/g, '**');
            expression = expression.replace(/!/g, 'factorial(');

            // Evaluate the expression
            const result = Function(`"use strict"; return (${expression})`)();
            return result;
        } catch (e) {
            return 'Error';
        }
    }

    // Factorial function
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'clear') {
                display.value = '';
            } else if (value === 'backspace') {
                if (display.value === 'Error') {
                    display.value = ''; // Clear error on backspace
                } else {
                    display.value = display.value.slice(0, -1);
                }
            } else if (value === '=') {
                const result = evaluateExpression(display.value);
                display.value = result;

                // Add to history if not an error
                if (result !== 'Error') {
                    addToHistory(display.value, result);
                }
            } else if (value === 'deg' || value === 'rad') {
                isDegreeMode = value === 'deg';
                alert(`Switched to ${isDegreeMode ? 'Degree' : 'Radian'} mode`);
            } else if (value === 'MC') {
                memory = 0; // Memory Clear
            } else if (value === 'MR') {
                display.value = memory; // Memory Recall
            } else if (value === 'MS') {
                memory = parseFloat(display.value); // Memory Store
            } else if (value === 'M+') {
                memory += parseFloat(display.value); // Memory Add
            } else if (value === 'M-') {
                memory -= parseFloat(display.value); // Memory Subtract
            } else {
                if (display.value === 'Error') {
                    display.value = value; // Replace error with new input
                } else {
                    display.value += value;
                }
            }
        });
    });

    // Function to add to history
    function addToHistory(expression, result) {
        const historyList = document.getElementById('history-list');
        const li = document.createElement('li');
        li.textContent = `${expression} = ${result}`;
        historyList.appendChild(li);

        // Keep only the last 10 items
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.firstChild);
        }

        // Save to localStorage
        const history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        history.unshift({ expression, result });
        if (history.length > 10) history.pop();
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
    }

    // Load history on page load
    function loadHistory() {
        const historyList = document.getElementById('history-list');
        const history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.expression} = ${item.result}`;
            historyList.appendChild(li);
        });
    }

    // Clear history
    document.getElementById('clear-history').addEventListener('click', function () {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        localStorage.removeItem('calculatorHistory');
    });

    // Initial load
    loadHistory();
});