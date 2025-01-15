document.addEventListener('DOMContentLoaded', function () {
    const memoryButtons = document.querySelectorAll('.btn.memory');
    let memory = 0;

    memoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-value');

            switch (action) {
                case 'MC':
                    memory = 0;
                    break;
                case 'MR':
                    display.value = memory;
                    break;
                case 'MS':
                    memory = parseFloat(display.value);
                    break;
                case 'M+':
                    memory += parseFloat(display.value);
                    break;
                case 'M-':
                    memory -= parseFloat(display.value);
                    break;
            }
        });
    });
});