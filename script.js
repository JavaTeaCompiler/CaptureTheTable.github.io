// Variablene til spillet

// Variabel som sier hvor mye tilleggstid spillerne skal få pr trekk.
let tilleggsTid = 5;

// Variabel som sier hvor mye tid spillerne skal begynne runden med
let spillerTid = 60;

// Variabel som er sann dersom superpowers
let superpowers = false

// Finn ut
let superSwitched = 0;

// En array som inneholder alle objektene til de forskjellige spillerne
let spillerArray = []

// En variabel som holder styr på hvilken tid som skal trekkes fra. Spiller 1 har index 0, siden variabelen skal brukes til å nå en 0-index array
let spillerIndex = 0

// En variabel til fargekodene i spillet
let fargekoder = ["#EF476F", "#06D6A0", "#118AB2", "#778AD9" ]

// Trykkelyden som legges til mellom tastetrykkene
let tastetrykk = new Audio("click.mp3")

// Lyden som lager lyd når effekten neste spiller aktiveres
let NESTE = new Audio("NESTE.mp3")

// En variabel som er mer enn 0 når spillet starter
let startet = 0

// Hvordan trekkingen av superPowers skal foregå:

// Vi har en liste med like mange tall fra 0, som det er superpowers:

let tempTallListe = []

for(let i = 0; i < 11; i++){
    tempTallListe[i] = i;
}

// Vi kopierer listen, og trekker ut et tall etter det andre til listen er tom. Da fylles den på igjen. 








// En liste med funksjonene til alle superPowersene i samme rekkefølge de finnes i regelheftet
let superList = [
    function(){
        document.getElementById("superPowerText").innerHTML = "Dobbel runde!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"

}, function(){
        document.getElementById("superPowerText").innerHTML = "Hestehopp!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"

},function(){
        document.getElementById("superPowerText").innerHTML = "Fjern brikke!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
},function(){
        document.getElementById("superPowerText").innerHTML = "Kinahopp!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
},function(){
        document.getElementById("superPowerText").innerHTML = "-10 sekunder!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
        spillerArray[spillerIndex].endreTid(-10)
},function(){
        document.getElementById("superPowerText").innerHTML = "+10 sekunder!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
        spillerArray[spillerIndex].endreTid(10)
},function(){
        document.getElementById("superPowerText").innerHTML = "Smugtitt!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
},function(){
        document.getElementById("superPowerText").innerHTML = "Bytt brikker!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
},function(){
        document.getElementById("superPowerText").innerHTML = "Flytt andres!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
},function(){
        document.getElementById("superPowerText").innerHTML = "3 frem!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
},function(){
        document.getElementById("superPowerText").innerHTML = "Hoppes over!"
        document.getElementById("superImage").src = "CaptureTheTable_Logo.png"
        NESTE.play()
        nesteSpiller(0);
}]


class superPower{
    constructor(tekst){
        this.tekst = tekst
    }
}


// Klasse som modellerer funksjonaliteten til de individuelle timerene. 
class playerTimer{
    constructor(documentId, index, fargekode){
        this.documentId = documentId
        this.tid = 0  
        this.index = index
        this.fargekode = fargekode
    }

    set_tid(tid){
        this.tid = tid
        this.documentId.innerHTML = toMinuteFormat(tid)
    }

    oppdater(){
        this.tid--;
        document.getElementById("body").style.backgroundColor = this.fargekode
        document.getElementById("timer").innerHTML = toMinuteFormat(this.tid)
        this.documentId.innerHTML = toMinuteFormat(this.tid)

        // Sjekkeŕom spilleren har mer tid igjen
        if(this.tid <= 0){
            nesteSpiller(2)
        }
    }
    
    tillegg(){
        this.tid += tilleggsTid + 1;
    }
    endreTid(endring){
        this.tid += endring;
    }
    
    
    
}

// En funksjon til index.html, som oppdaterer spillertiden ved endring i input
function changeTime(element){
    let tid = Number(element.value);
    document.getElementById("tidLabel").innerHTML = `Velg spillertid: ${toMinuteFormat(tid)}`
}




// En funksjon som konverterer tall som representerer antall sekunder, til string med minutter og sekunder
function toMinuteFormat(sekunder){

    let minutter = sekunder % 60
    if (minutter < 10 ){
        minutter = `0${minutter}` 
    }
    return `${Math.floor(sekunder / 60)}:${minutter}`
}



for(let i = 1; i < 5; i++){
    spillerArray[spillerArray.length] = new playerTimer(document.getElementById(`timer${i}`), i-1, fargekoder[i-1])
}








function nesteSpiller(ekstratid){
    
        // En enkel kode som gjør at funksjonen ikke aktiveres fra et forestående trykk
        if(startet == 0){
            startet =1
            return 0
        }

        if(ekstratid == 1){
            tastetrykk.play();
            // Legger til tilleggstid
            spillerArray[spillerIndex].tillegg();
            spillerArray[spillerIndex].oppdater();
            
            
        }

        spillerIndex++;
        if (spillerIndex == 4){
            spillerIndex = 0;
        }


        if(spillerArray[spillerIndex].tid <= 0){
            spillerIndex++
            return 0
        }
    
        if((ekstratid > 0) && (superpowers == true) ){
            if(tempTallListe.length < 1){
                for(let i = 0; i < 11; i++){
        tempTallListe[i] = i;
    }
    
            }
            let tilfeldigTall = Math.floor(Math.random() * tempTallListe.length)
    
            console.log(tilfeldigTall)
            console.log(tempTallListe)
    
            superList[tempTallListe[tilfeldigTall]]()
            tempTallListe.splice(tilfeldigTall,1)
        }
        // Funksjonen som ordner superPowers

    }
    


// Spillet starter ved at spillerene videreføres fra oppstartssiden
function tilTimer(){
    document.getElementById("skjermknapp").style.display = "block";
    document.getElementById("body").style.backgroundColor = "#EF476F";
    document.getElementById("timerDelen").style.display = "block";
    document.getElementById("oppstartsDelen").style.display = "none";

    if(!superpowers){
        document.getElementById("superPower").style.display = "none";
    }else{
        document.getElementById("superPower").style.display = "inline-block";
    }

    for(let i = 0; i < 4; i++){
        spillerArray[i].set_tid(spillerTid);
    }
    spillerArray[0].oppdater()

    
    setInterval(function(){

        spillerArray[spillerIndex].oppdater();
        }, 1000)
    
    document.getElementById("skjermknapp").addEventListener("click", function(){
        nesteSpiller(1);


    }   
    )
}
