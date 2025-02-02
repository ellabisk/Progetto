/**
 * Questo documento utilizza una copia della libreria Node 'pitchfinder'
 * https://www.npmjs.com/package/pitchfinder
 * che ho convertito appositamente per il Browser (vedi file pitch-finder.lib.js)
 * La libreria implementa gli algoritmi 
 * - YIN (https://www.youtube.com/watch?v=W585xR3bjLM)
 * - AMDF - Average Magnitude Differential Function (https://notedetection.weebly.com/amdf.html)
 * e consente di fare un'analisi in frequenza quantizzata nel tempo
 */


// **Inizializza AudioContext**
const audioContext = new AudioContext
const analyser = audioContext.createAnalyser();

analyser.fftSize = 16384;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);//creo un array dentro il quale metto i valori della FFT


//Trova il Pitch
// **Configurazione Algoritmi di Pitch Detection**
const yinDetectionOptions = {
	sampleRate: audioContext.sampleRate,
    threshold: 0.1,
    probabilityThreshold: 0.1
}
const amdfDetectionOptions = {
	sampleRate: audioContext.sampleRate,
    minFrequency: 82,
    maxFrequency: 1000,
    sensitivity: 0.1,
    ratio: 5
}

// https://github.com/peterkhayes/pitchfinder/blob/master/README.md
const yin = Pitchfinder.YIN(yinDetectionOptions);
const amdf = Pitchfinder.AMDF(amdfDetectionOptions);

//Analizziamo il pitch
let isAnalyzing = false;

// **Funzione per il rilevamento del pitch**
function analyzePitch(buffer) {//la funzione ha come argomento l'array di dati
    const frequencies = Pitchfinder.frequencies([yin, amdf], buffer);//usa i due algoritmi yin e amdf per trovare la frequenza
    return frequencies.length > 0 ? frequencies[0] : 0; // Prende la prima frequenza trovata
}

// **Accesso al microfono**
if(navigator.mediaDevices) {
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
}).catch((error) => {
    console.error("Errore nell'accesso al microfono:", error);
});
}



// **Genero le frequenze per il confronto**
const freq = Array.from({ length: 20000 }, (_, i) => 55 * Math.pow(2, i / 12));//crea un array di 20000 elementi a distanza di un semitono partendo da 55 come fondamentale

function findClosestNumber(array, freqInput) {
    return array.reduce((closest, num) => //reduce legge l'array 
        Math.abs(num - freqInput) < Math.abs(closest - freqInput) ? num : closest //trova il numero piu vicino alla freq di input
    );
}



// /**
//  * Monophonic Pitch detection
//  * @param { Float32Array } buffer 
//  * @returns un array di frequenza da convertire in note quantizzato secondo le optioni dichiarate
//  */
// function analyzePitch(buffer){
	// combino i 2 algoritmi per un risultato più efficace
 	// se se ne vuole usare uno solo è sufficiente indicarne 
	// uno senza l'array
	// 	return Pitchfinder.frequencies([yin, amdf], buffer, {
	// quantizzazione in funzione della partitura (forse poco rilevante per un accordatore) 
   // 		tempo: 130,
   // 		quantization: 4
// 	})
// }
		
		//questo era per calcolare il pitch nella registrazione
// stream =  navigator.mediaDevices.getUserMedia({audio:true,video:false})
// 		.then(stream => {
// 			// instanzio un registratore
// 			mediaRecorder = new MediaRecorder(stream)
			
// 			// risponde solo dopo l'istruzione mediaRecorder.stop()
// 			// vedi btn.addEventListener
// 			mediaRecorder.ondataavailable = async (e) => {
// 				// e.data è un'instanza di Blob
// 				// https://developer.mozilla.org/en-US/docs/Web/API/Blob
// 				if (e.data.size !== 0){
// 					// converto il Blob in ArrayBuffer (un array di bytes)
// 					// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
// 					const arrayBuffer = await e.data.arrayBuffer()
// 					// che decodifico con l'audio context
// 					const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
// 					// leggendo un canele ottengo il Float32Array per l'analisi
// 					const audioData = audioBuffer.getChannelData(0)
					
// 					const freqs = analyzePitch(audioData)
// 					const recDur = audioData.length/audioBuffer.sampleRate
// 					console.log(`Recorded ${recDur.toFixed(2)} seconds of audio`)
// 					console.log(freqs)
// 				}
// 			}
			
// 		})
// 		.catch(err => console.log(err))

// questo era per il pulsante di registrazione quindi non in tempo reale
		
// let mediaRecorder
// let recording = false
		
// btn.addEventListener("click", (ev)=>{
// 	if(!recording) {
// 		mediaRecorder.start()
// 		ev.freqInput.innerHTML = "Stop"
// 		recording = true
// 	} else {
// 		mediaRecorder.stop()
// 		ev.freqInput.innerHTML = "Record"
// 		recording = false
	// 	}
// })
					
/**
 * TODO:
 * il sistema di confronto tra la "partitura" è l'array risultante dall'analisi
 * potenzialmente convertendo le frequenze in MIDI o in "NOTE"
*/ 
					
					
