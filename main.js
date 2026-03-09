const databaseArticoli = [
    // --- PROGETTI (Nuova Sezione) ---
    {
        titolo: "Laboratorio Simulazioni",
        descrizione: "Area dedicata a calcolatori interattivi e modelli dinamici. In arrivo: simulatore di orbite.",
        link: "#",
        categoria: "Progetti",
        tags: ["#coding", "#simulazioni"],
        data: "2026-03-08"
    },
    
    // --- EIA1 (Aerodinamica) ---
    { titolo: "Meccanica Celeste", descrizione: "Orbite, leggi di Keplero e dinamica planetaria.", link: "Articles/EIA1/Meccanica_celeste.html", categoria: "Spazio", tags: ["#orbite"], data: "2024-03-08" },
    { titolo: "Ali 3D", descrizione: "Aerodinamica avanzata e portanza nelle ali finite.", link: "Articles/EIA1/Ali_3D.html", categoria: "Aerodinamica", tags: ["#ali"], data: "2024-03-06" },
    { titolo: "Resistenza Aerodinamica", descrizione: "Analisi delle varie tipologie di resistenza.", link: "Articles/EIA1/Resistenza_aerodinamica.html", categoria: "Aerodinamica", tags: ["#fluidi"], data: "2024-02-28" },
    { titolo: "Effetti Comprimibilità", descrizione: "Numero di Mach e velocità del suono.", link: "Articles/EIA1/Effetti_comprimibilità.html", categoria: "Aerodinamica", tags: ["#mach"], data: "2024-02-25" },
    { titolo: "Forze Sostenatrici", descrizione: "Concetti base di portanza e resistenza.", link: "Articles/EIA1/Forze_sostenatrici.html", categoria: "Aerodinamica", tags: ["#basi"], data: "2024-02-20" },
    
    // --- FDA (Fluidodinamica) ---
    { titolo: "Introduzione FDA", descrizione: "Basi della fluidodinamica applicata.", link: "Articles/FDA/Introduzione_FDA.html", categoria: "Aerodinamica", tags: ["#fluidi"], data: "2024-03-01" },
    
    // --- FT (Fisica Tecnica) ---
    { titolo: "Basi Termodinamica", descrizione: "Concetti fondamentali ed energia.", link: "Articles/FT/Introduzione_termodinamica.html", categoria: "Termodinamica", tags: ["#calore"], data: "2024-03-04" },
    { titolo: "Principi Conservazione", descrizione: "Scambi di energia ed entropia.", link: "Articles/FT/Principi_conservazione.html", categoria: "Termodinamica", tags: ["#energia"], data: "2024-03-02" },
    
    // --- MA1 (Meccanica Applicata) ---
    { titolo: "Moto Centrali", descrizione: "Campi di forza centrali e conservazione.", link: "Articles/MA1/Moto_centrali.html", categoria: "Meccanica", tags: ["#fisica"], data: "2024-03-07" },
    { titolo: "Corpo Rigido", descrizione: "Cinematica e dinamica dei sistemi rigidi.", link: "Articles/MA1/Corpo_rigido.html", categoria: "Meccanica", tags: ["#dinamica"], data: "2024-03-05" },
    { titolo: "Equivalenza e Riduzione Forze", descrizione: "Semplificazione sistemi di forze.", link: "Articles/MA1/Equivalenza_riduzione_forze.html", categoria: "Meccanica", tags: ["#statica"], data: "2024-02-15" },
    { titolo: "Momenti d'Inerzia", descrizione: "Calcoli per geometrie aerospaziali.", link: "Articles/MA1/Momenti_inerzia.html", categoria: "Meccanica", tags: ["#geometria"], data: "2024-02-10" },
    { titolo: "Energia Cinetica", descrizione: "Teoremi e calcolo del lavoro.", link: "Articles/MA1/Energia_cinetica.html", categoria: "Meccanica", tags: ["#lavoro"], data: "2024-02-05" }
];

// Funzione migliorata per generare i Tag cliccabili
function creaCardHTML(art) {
    const tagsHTML = art.tags.map(t => `<span class="tag-link">${t}</span>`).join(' ');
    return `
        <a href="${art.link}" class="card">
            <span class="card-category">${art.categoria}</span>
            <h3>${art.titolo}</h3>
            <p>${art.descrizione}</p>
            <div class="card-tags">${tagsHTML}</div>
        </a>`;
}

function render() {
    const recenti = [...databaseArticoli].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 3);
    document.getElementById('latest-container').innerHTML = recenti.map(creaCardHTML).join('');
    renderGriglia("Tutti");
}

function renderGriglia(cat) {
    const grid = document.getElementById('article-grid');
    const filtrati = cat === "Tutti" ? databaseArticoli : databaseArticoli.filter(a => a.categoria === cat);
    
    if (filtrati.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #8b949e;">Nessun contenuto trovato per questa categoria.</p>`;
    } else {
        grid.innerHTML = filtrati.map(creaCardHTML).join('');
    }
}

// Funzione Filtro con scroll automatico per evitare il "salto"
function filtraCategoria(cat) {
    renderGriglia(cat);
    
    // Aggiorna i pulsanti attivi
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.innerText.includes(cat) || (cat === 'Tutti' && b.innerText === 'Tutti'));
    });
    
    // Fa scorrere la pagina dolcemente verso l'indice
    const target = document.getElementById('articoli');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Ricerca migliorata
document.getElementById('searchInput').addEventListener('keyup', function() {
    let f = this.value.toLowerCase();
    const cards = document.querySelectorAll('#article-grid .card');
    cards.forEach(c => {
        let text = c.innerText.toLowerCase();
        c.style.display = text.includes(f) ? "" : "none";
    });
});

// Gestione della Barra di Ricerca
document.getElementById('searchInput').addEventListener('input', function(e) {
    const valoreRicerca = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('#article-grid .card');
    const sezioneIndice = document.getElementById('articoli');
    
    // Se l'utente scrive e la griglia è lontana, scorri verso l'indice
    if (valoreRicerca.length > 1) {
        sezioneIndice.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    cards.forEach(card => {
        // Cerca nel titolo, nella descrizione e nei tag
        const testoCard = card.innerText.toLowerCase();
        
        if (testoCard.includes(valoreRicerca)) {
            card.style.display = "flex"; // Mostra
            card.style.animation = "fadeIn 0.3s ease"; // Piccolo effetto apparizione
        } else {
            card.style.display = "none"; // Nascondi
        }
    });
    
    // Se non ci sono risultati, mostra un messaggio (opzionale)
    const risultatiVisibili = Array.from(cards).filter(c => c.style.display !== "none").length;
    if (risultatiVisibili === 0 && valoreRicerca !== "") {
        console.log("Nessun risultato trovato");
        // Qui potresti iniettare un messaggio "Nessun risultato" nella griglia
    }
});


window.onload = render;