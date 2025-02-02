let attivo = false; // se è acceso o spento
let intervalloId = null; // memorizza il setInterval per poter fermare il metronomo
let contatorebattiti = 0;

// let audioContext = new (window.AudioContext);

const valorebpm = document.getElementById("bpm");
const startstopBottone = document.getElementById("start/stop");
const sliderBattiti = document.getElementById("sliderBattiti");
const valBattiti = document.getElementById("valBattiti");
const volumeSlider = document.getElementById("volume");
const sliderValue = document.getElementById("sliderValue");//span del volume

let volume = volumeSlider.value;
sliderValue.textContent = parseFloat(volume).toFixed(2);

// per creare il click con l'oscillatore
function playClick(frequenza) {
    const oscillatore = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillatore.type = "sine";
    oscillatore.frequency.setValueAtTime(frequenza, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    oscillatore.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillatore.start();
    oscillatore.stop(audioContext.currentTime + 0.1); // Click breve di 100ms (0.1 sec)
}

// Avviamo il metronomo
function startMetronomo() {
    const bpm = parseInt(valorebpm.value);
    if (bpm.toString() !== valorebpm.value.trim()) {//il val del bpm deve essere compreso tra 20 e 500,così se ci sono valori non numerici js accetta solo il valore num e ignora il resto, trim serve ad eliminare gli spazi prima e dopo il numero che viene inserito
        stopMetronomo(); // Ferma il metronomo se il BPM non è valido o se risulta vuoto
        return;
    }
    const intervallo = 60000 / bpm;//  1 sec/ i bpm in quel momento
    const accenti = parseInt(sliderBattiti.value);

    contatorebattiti = 0;

    if (intervalloId) clearInterval(intervalloId); //se l'intervallo di tempo è gia partito allora lo ferma
    intervalloId = setInterval(() => { //viene salvato l'Id dell'intervallo in IntervalId
        contatorebattiti++;
        let frequenza
        if (contatorebattiti % accenti === 1) { //quindi se conincidono sull'1 il conto dei battiti e il primo accento
            frequenza = 880//così ho l'acuto come accento sul primo battito
        } else {
            frequenza = 440//tutti gli altri battiti
        }

        playClick(frequenza);
    }, intervallo);
}

// Funzione per fermare il metronomo
function stopMetronomo() {
    clearInterval(intervalloId);
    contatorebattiti = 0;
}

startstopBottone.addEventListener("click", () => {
    if (attivo) {
        stopMetronomo();
        startstopBottone.textContent = "Start";
    } else {
        startMetronomo();
        startstopBottone.textContent = "Stop";
    }
    attivo = !attivo;
});

sliderBattiti.addEventListener("input", () => {
    valBattiti.textContent = sliderBattiti.value
    if (attivo) {
        startMetronomo(); // Riavvia il metronomo per aggiornare il numero di accenti
    }
});

//per riaggiornare il metronomo quando cambio il valore
valorebpm.addEventListener("input", () => {
    setTimeout(() => {//questa vuol dire che applica la funzione dopo un tot di ritardo (1000)
        const bpm = parseInt(valorebpm.value)
        if (bpm >= 20, bpm <= 500) {
            if (attivo) {
                startMetronomo() // se il bpm è compreso tra 20 e 500 e "attivo" è falso, attivalo ("attivo" è un let all'inizio messo come falso)
            }
        } else {
            stopMetronomo()
        }
    }, 1000);//delay di 1 sec nella ripartenza del metronomo
});

volumeSlider.addEventListener("input", () => {
    volume = volumeSlider.value;
    sliderValue.textContent = parseFloat(volume).toFixed(2);
});
