document.addEventListener('DOMContentLoaded', function () {
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeModal = document.getElementById('close-modal');

    // Open help modal
    helpButton.addEventListener('click', function () {
        helpModal.style.display = 'flex';
    });

    // Close help modal
    closeModal.addEventListener('click', function () {
        helpModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });
});