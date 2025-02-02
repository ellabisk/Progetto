/**
 * Funzione chiamata dal bottone button#audioContext
 * 
 * Accendi e spegni il audioContext
 * 
 * @param { HTMLElement } gui il bottone che chiama l'azione
 * @param { AudioContext } ac 
 * @param {HTMLElement} btn
 * @param {Number} frequenza
 * @param {number} [amp=0.1]
 * @param {AudioNode} connessione
 * @returns {object} 
 */
function audioOnOff(btnMaster, audioContext) {
	if (audioContext.state == "suspended") {
		audioContext.resume()
		btnMaster.innerHTML = "Stop Audio"
	} else {
		audioContext.suspend()
		btnMaster.innerHTML = "Start Audio"
	}
}

// variabili globali


/**
 * Funzione chiamata dal bottone button#test-btn ('Test Audio')
 * 
 * se NON 'sta_suonando' crea un oscillatore un gain a li
 * collega al master altrimenti lo ferma
 */

//facciamo partire un osc, fatto da un osc con controllo sull'ampiezza, con una rampa per non sentire i click
function startOSC(audioContext, freq, amp = 0.1, connessione) {
	const osc = audioContext.createOscillator()
	const gain = audioContext.createGain()

	osc.frequency.value = freq
	gain.gain.value = 0


	osc.connect(gain)

	if (!connessione) { //se noon ti dico a chi collegarti collegati  direttamente al nodo audiocontext
		gain.connect(audioContext.destination)
	}
	else {
		gain.connect(connessione)
	}


	osc.start()
	return { oscillatore: osc, ampiezza: gain, stasuonando: false }
}


function semitono(freq, sem) {
	return freq * Math.pow(2, sem / 12)
}




/**
 * 
 * @param {AudioContext} audioContext 
 * @param {HTMLElement} container 
 * @param {object} nodi 
 * @param {OscillatorNode}nodi.oscillatore
 * @param {GainNode}nodi.ampiezza
 * @param {boolean} nodi.stasuonando
 */


function creaBottoni(audioContext, container, nodi, nota) {
	 

	const bottone = document.createElement("button")
		
	bottone.textContent= `${nota}`

	
	
	bottone.classList.add("osc-btn")
	bottone.addEventListener("click", () => {//così con onclick cambio l'ampiezza del gain
		
		if (!nodi.stasuonando) {
			nodi.ampiezza.gain.setTargetAtTime(0.3, audioContext.currentTime, 0.1)
			nodi.stasuonando = true
			bottone.style.background = "blue"
		} else {
			nodi.ampiezza.gain.setTargetAtTime(0.0, audioContext.currentTime, 0.1)
			nodi.stasuonando = false
			bottone.style.background = "black"
		}
	})
	
	container.append(bottone)
	}

