const btnAcc = document.getElementById("testBtn")
const valFreq = document.getElementById("frequencySpan")
const btncentrale = document.getElementById("btncentrale")
const btncresce = document.getElementById("btncresce")
const btncala = document.getElementById("btncala")
const tolleranza = 1

btnAcc.innerHTML = "OFF"
btnAcc.style.background = "black"
valFreq.innerHTML = "frequenza:..."

// **Analisi in tempo reale**
function analyzeD() {
    if (!isAnalyzing) return;

    const buffer = new Float32Array(analyser.fftSize)//è un array delle dimensioni del buffer della fft
    analyser.getFloatTimeDomainData(buffer)//mette i dati e li memorizza del buffer
    const frequency = analyzePitch(buffer) || 0 //se non riesce a capire la freq scrive 0

    valFreq.innerHTML = `Frequenza: ${frequency.toFixed(2)} Hz`
    if (isAnalyzing) { // Stampiamo in console solo se l'analisi è attiva
        console.log(`Frequenza rilevata: ${frequency.toFixed(2)} Hz`)
    }

    const closestNumber = findClosestNumber(freq, frequency);

    btncentrale.style.backgroundColor = "white"
    btncresce.style.backgroundColor = "white"
    btncala.style.backgroundColor = "white"

    if (Math.abs(frequency - closestNumber) <= tolleranza) {
        btncentrale.style.backgroundColor = "green"
    } else if (frequency > closestNumber + tolleranza) {
        btncresce.style.backgroundColor = "red"
    } else {
        btncala.style.backgroundColor = "red"
    }

    requestAnimationFrame(analyzeD)//mette in loop la funzione il che vuol dire che funziona in tempo reale
}

/////visual

// **Avvio e stop dell'analisi con il pulsante**
var btnCondition = false;

btnAcc.addEventListener("click", () => {
    if (!btnCondition) {
        if (!isAnalyzing) {
            isAnalyzing = true
            analyzeD()
        }
        btnAcc.innerHTML = "ON"
        btnAcc.style.background = "green"
        btnCondition = true
    } else {
        isAnalyzing = false
        btnAcc.innerHTML = "OFF"
        btnAcc.style.background = "black"
        valFreq.innerHTML = ""
        btnCondition = false
    }
});
