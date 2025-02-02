// Funzione per gestire il click sul bottone "Scegli file"
document.getElementById('choose-file-btn').addEventListener('click', function() {
    document.getElementById('score').click(); // Simula il click sull'input file
});

// Funzione per caricare il file e cambiare il colore del bottone
// Funzione per monitorare quando il file viene caricato
document.getElementById('score').addEventListener('change', function() {
const fileInput = document.getElementById('score');
const button = document.getElementById('choose-file-btn');

if (fileInput.files.length > 0) {
    // Cambia il colore del bottone in verde
    button.style.backgroundColor = "green"; // Colore verde
    button.style.color = "white"; // Cambia il testo in bianco per visibilità
} else {
    // Ripristina il colore originale del bottone
    button.style.backgroundColor = "black"; // Colore originale (nero)
    button.style.color = "white"; // Colore del testo originale
}
});
//viualizza
function loadFile(ev){			
    ev.preventDefault();
    const file = document.getElementById('score').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
        document.getElementById('score-viewer').data = e.target.result;
    });
    reader.readAsDataURL(file);
}