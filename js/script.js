
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('home_search_bar');
        const modal = document.getElementById('user-form-modal');
        const closeButton = document.getElementById('close-modal-button');

        
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                if (searchInput.value.trim() !== '') {
                    modal.style.display = 'flex';
                }
            }
        });

        
        closeButton.addEventListener('click', function (e) {
            e.preventDefault(); 
            modal.style.display = 'none';
        });
    });

