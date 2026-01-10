console.log('Hello World!');
document.getElementById('searchInput').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        let description = card.querySelector('p').innerText.toLowerCase();
        
        if (title.includes(filter) || description.includes(filter)) {
            card.style.display = ""; // Mostra
        } else {
            card.style.display = "none"; // Nascondi
        }
    });
});

