let attivo=false //se è acceso o spento
let intervalloId= null //memorizza il setTargetAtTime per poter fermare il metronomo
let contatorebattiti=0



let audioContext

const valorebpm= document.getElementById("bpm")
const startstopBottone= document.getElementById("start/stop")

const suonoclick=document.getElementById("suonoclick")
const suonoclickDiverso=document.getElementById("suonoclickDiverso")

const sliderBattiti= document.getElementById("sliderBattiti")
const valBattiti=document.getElementById("valBattiti")
const volumeSlider= document.getElementById("volume")
const sliderValue=document.getElementById("sliderValue")


//volume iniziale
suonoclick.volume=volumeSlider.value //volume è un attributo dell'oggetto audio (per questo meglio se non chiamo altre costanti volume!)
suonoclickDiverso.volume=volumeSlider.value

//il suono si deve aggiornare quando lo slider si muove
volumeSlider.addEventListener("input",()=>{
    const volume=volumeSlider.value
    suonoclick.volume=volume
    suonoclickDiverso.volume=volume
    sliderValue.textContent=parseFloat(volume).toFixed(2)
})

//per contare i battiti e cambiare suono del click
function playClick(){
    contatorebattiti++ //incrementa il conto
    const intervalloSlider=parseInt(sliderBattiti.value)//legge il valore dello slider
if (!audioContext){
    audioContext= new(window.AudioContext)
}

// const osc=audioContext.createOscillator()
// const gainNode= audioContext.createGain()

// osc.type="sine"
// osc.frequency.setValueAtTime(1000, audioContext.currentTime)
// gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
// osc.connect(gainNode)
// gainNode.connect(audioContext.destination)
// osc.start(
//     osc.stop(audioContext.currentTime+ 0.1) //qunato dura l'impulso
// )

//per fare il click con il file audio
if (contatorebattiti % intervalloSlider === 0){//se il contatorebattiti è un num divisibile per il valSlider allora fa il click diverso
    suonoclickDiverso.currentTime =0
    suonoclickDiverso.play()
}else {
    suonoclick.currentTime=0
    suonoclick.play()}

}

// // per riprodurre il suonoclick
// function playClick(){
//     suonoclick.currentTime=0 //fa ripartire il suono dall'inizio
//     suonoclick.play()
// }

//per far ripartire il metronomo
function startMetronomo(){
    const bpm= parseInt(valorebpm.value) //così leggo il valore (intero) dei bpm 
    const intervallo= 60000/bpm  //calcola l'intervallo in ms(60000=1min)
if (intervalloId)clearInterval(intervalloId)//per ripulire ed evitare duplicati
 intervalloId=setInterval(playClick, intervallo)//richiama la function suonoclick e la ripete ad ogni intervallo di ms

}

//per fermare il metronomo
function stopMetronomo(){
    clearInterval(intervalloId)
    contatorebattiti=0
}

startstopBottone.addEventListener("click", ()=> {
    if (attivo){
        stopMetronomo()//ogni volta che viene cliccato se "attivo" è falso allora chiama la function stopMetronomo e scrivi sul tasto "Start"
        startstopBottone.textContent="Start"
    } else{
        startMetronomo()
        startstopBottone.textContent="Stop"
    }
    attivo=!attivo //se il metronomo era arrivo lo mette falso e viceversa
})

sliderBattiti.addEventListener("input",()=>{
    valBattiti.textContent=sliderBattiti.value
})
