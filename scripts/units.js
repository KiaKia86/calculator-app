document.addEventListener('DOMContentLoaded', function () {
    const unitButtons = document.querySelectorAll('.btn.unit');

    unitButtons.forEach(button => {
        button.addEventListener('click', function () {
            const unitType = this.getAttribute('data-unit');
            const value = parseFloat(display.value);

            let result;
            switch (unitType) {
                case 'cm-to-inches':
                    result = value / 2.54;
                    break;
                case 'inches-to-cm':
                    result = value * 2.54;
                    break;
                case 'kg-to-lbs':
                    result = value * 2.20462;
                    break;
                case 'lbs-to-kg':
                    result = value / 2.20462;
                    break;
                case 'c-to-f':
                    result = (value * 9/5) + 32;
                    break;
                case 'f-to-c':
                    result = (value - 32) * 5/9;
                    break;
                default:
                    result = 'Invalid unit';
            }

            display.value = result;
        });
    });
});