var serverZakazani = [];
var pocetakPregleda = [];
var krajPregleda = [];
var zahtevZaPregled =[];
var pocetak = "";
var kraj = "";


function noviPregled(){
    var pregledIme = document.getElementById("zakazi_ime");
    var pregledPrezime = document.getElementById("zakazi_prezime");
    var pregledVreme = document.getElementById("zakazi_vreme");
    var pregledVremeKraj = document.getElementById("zakazi_vremeKraj");
    var pregledDatum = document.getElementById("zakazi_datum");
    var zakError = document.getElementById("zak_error");
    
    var zakIme = pregledIme.value.trim();
    var zakPrezime = pregledPrezime.value.trim();
    var zakVreme = pregledVreme.value.trim();
    var zakVremeKraj = pregledVremeKraj.value.trim();
    var zakDatum = pregledDatum.value.trim();

    var moguceVreme = true;
     pocetakPregleda = [];
     krajPregleda = [];

     var testVreme = zakVreme.split(':');
     var testVremePocetak = parseInt(testVreme[0])*60+parseInt(testVreme[1]);



     /*

    for(var t = 0; t<serverZakazani.length; t++){
        var temp = serverZakazani[t]["zak_vreme"].split(':');
        var pocetak = parseInt(temp[0])*60+parseInt(temp[1]);
        var kraj = (parseInt(temp[0])*60+parseInt(temp[1])+30);
        pocetakPregleda.push(pocetak)
        krajPregleda.push(kraj)
    }
    */
             
    for(var i = 0; i<serverZakazani.length; i++){
                if(serverZakazani[i]["zak_vreme"] == zakVremeKraj && serverZakazani[i]["zak_datum"] == zakDatum){ 
                    console.log(serverZakazani[i]["zak_datum"]+ " Server datum")
                    console.log(serverZakazani[i]["zak_vreme"]+" server vreme", zakVreme+ " Moje vreme")             
                 
                    console.log("NOPE!")
                    zakError.innerHTML = "Ovo vreme nije dostupno"
                    moguceVreme = false;
                    break;
                }
            }         
            

    zahtevZaPregled =[];







    
    if(moguceVreme){
    axios.post("http://localhost:3000/zakazi",{
                ime: zakIme,
                prezime: zakPrezime,
                vreme: zakVreme,
                vremeKraj: zakVremeKraj,
                datum: zakDatum
                }).then((res) =>{
                    console.log(res.data);
                    zakRes = res.data.result;
                    pregledIme.value = "";
                    pregledPrezime.value = "";
                    pregledVreme.value = "";
                    pregledVremeKraj.value = "";
                    pregledDatum.value = "";
                    zakError.innerHTML = ""
                    if(zakRes == "ERROR"){
                        zakError.innerHTML = "Doslo je do greske!"      
                    }
                   
                    fetchUsluge()
                    
                })
    }

}




function fetchUsluge(){
            axios.get("http://localhost:3000/zakazi")
            .then((res) => {
                serverZakazani = res.data.data;
                console.log(serverZakazani)              
            })
        }

fetchUsluge()






