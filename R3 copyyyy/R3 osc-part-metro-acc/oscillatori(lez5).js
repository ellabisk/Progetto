const armoniche= []
const fondamentale= 261.63 //se metto 440 lui mette il primo bottone a 440 quindi il do. 261.63 è il do

const numArmoniche=12
const contenitore= document.getElementById("controlli")
const volumeOsc=document.getElementById("volumeOsc")
const sliderValueOsc= document.getElementById("sliderValueOsc")

let oscillatoreVolume=0.5

volumeOsc.addEventListener("input",()=>{
	const volume=parseFloat(volumeOsc.value).toFixed(2)
	sliderValueOsc.textContent=volume
	oscillatoreVolume=volume

})



	


// INIZIALIZZO LE VARIBILI AUDIO
// SEZIONE MASTER
const dac = new AudioContext()
const masterGain = dac.createGain()
// collego il gain alle casse
masterGain.connect(dac.destination)


// INIZIALIZZO I CONTROLLI E L'INTERFACCIA PER LA SEZIONE MASTER
// const btnMaster = document.getElementById("dac") //se no non posso mettere lo slider per il volume del metronomo
const volumeCtrl = document.getElementById("volumeOsc")
const volumeValue = document.getElementById("sliderValueOsc")

const testBtn = document.getElementById("test-btn")
// assegno il valore inziale del gain master dal valore di default dello slider
masterGain.gain.value = volumeCtrl.value
sliderValueOsc.innerHTML = parseFloat(volumeCtrl.value).toFixed(2)


volumeCtrl.addEventListener("input", (ev)=>{
	const val = parseFloat(ev.target.value)
	// console.log(val)
	volumeValue.innerHTML = val.toFixed(2)
	masterGain.gain.value = val
})



const note =['DO','DO#','RE','RE#','MI','FA','FA#','SOL','SOL#','LA','LA#','SI']
//per fare il semitono
for(let i =0; i< numArmoniche; i++){
	const freq= semitono(fondamentale, i)
    const amp= 1/ (i+1) 
	armoniche [i]= freq
	nota = note [i]
    const nuovoOsc= startOSC(dac,armoniche[i], amp, masterGain) //[un osc e ampiezza, stasuonando]
	creaBottoni(dac, contenitore, nuovoOsc, nota)	//così mette il nome alla nota

	 
}
 //////////////////////////////////
// per fare le parziali armoniche
// for(let i =0; i< numArmoniche; i++){
// 	const armonica= fondamentale * (i+1) //così è come se avessi usato scale, e ora va da -30 a 30
// 	const amp= 1/ (i+1) 
// 	armoniche [i]= armonica
// 	const nuovoOsc= startOSC(dac,armoniche[i], amp, masterGain) //[un osc e ampiezza, stasuonando]
// 	creaBottoni(dac, contenitore, nuovoOsc)	
	
// }


//PER FARE DENTE DI SEGA


// for(let i =0; i< numArmoniche; i++){
// 	const armonica= fondamentale+ (Math.random()*60) -30 //così è come se avessi usato scale, e ora va da -30 a 30
// 	const amp= 1/ (i+1) 
// 	armoniche [i]= freq
// 	startOSC(dac,armonica, amp) 
// }




