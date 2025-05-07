
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('home_search_bar');
        const modal = document.getElementById('user-form-modal');
        const closeButton = document.getElementById('close-modal-button');

        // Show modal on Enter key press
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                if (searchInput.value.trim() !== '') {
                    modal.style.display = 'flex';
                }
            }
        });

        // Close modal
        closeButton.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent form submission
            modal.style.display = 'none';
        });
    });

