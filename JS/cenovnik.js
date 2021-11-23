var sveUsluge = [];


function usluga(ime, cena, valuta){
	this.ime = ime;
	this.cena = cena;
	this.valuta = valuta;

	this.prikaziSe = function(){
		var tr = document.createElement("tr");
		

		var tdIme = document.createElement("td");
		tdIme.innerHTML = this.ime;

		var tdCena = document.createElement("td");
		tdCena.innerHTML = this.cena + this.valuta;

		tr.appendChild(tdIme);
		tr.appendChild(tdCena);
		
	return tr;
	}
}


	
if(currentUser && currentUser.level == 3){
	function novaUsluga(){
	    var valueIme = document.getElementById("cena_ime");
	    var valueCena = document.getElementById("cena_cena");
	    var valueValuta = document.getElementById("cena_valuta");
	    
	    var cenaIme = valueIme.value.trim();
	    var cenaCena = valueCena.value.trim();
	    var cenaValuta = valueValuta.value.trim();

	    

	    axios.post("http://localhost:3000/cene",{
	                ime: cenaIme,
	                cena: cenaCena,
	                valuta: cenaValuta,
	                }).then((res) =>{
	                    console.log(res.data);
	                    valueIme.value = "";
	                    valueCena.value = "";
	                    valueValuta.value = "";
	                    fetchUsluge();
	                })
	    fetchUsluge();
	}
}



function fetchUsluge(){
			axios.get("http://localhost:3000/cene")
			.then((res) => {
				var serverUsluge = res.data.data;
				sveUsluge = [];
				for(var i = 0; i<serverUsluge.length; i++){
					sveUsluge.push(new usluga(
						serverUsluge[i].cena_ime,
						serverUsluge[i].cena_cena,
						serverUsluge[i].cena_valuta,
						))
				}
				prikaziUsluge();
			})
		}


function prikaziUsluge(){
			var uslugeContainer = document.getElementById('usluge');
			uslugeContainer.innerHTML = "";
			for(var j = 0; j<sveUsluge.length; j++){
				uslugeContainer.appendChild(sveUsluge[j].prikaziSe())
			}

		}

if(currentUser && currentUser.level == 3){
	function obrisiUslugu(){
	    var valueIme = document.getElementById("cena_ime");
	    var valueCena = document.getElementById("cena_cena");
	    var valueValuta = document.getElementById("cena_valuta");
	    
	    var cenaIme = valueIme.value.trim();
	    var cenaCena = valueCena.value.trim();
	    var cenaValuta = valueValuta.value.trim();

	    
	    axios.post("http://localhost:3000/ceneD",{
	                ime: cenaIme,
	                cena: cenaCena,
	                valuta: cenaValuta,
	                }).then((res) =>{
	                    console.log(res.data);
	                    valueIme.value = "";
	                    valueCena.value = "";
	                    valueValuta.value = "";
	                    fetchUsluge();
	                })
	    fetchUsluge();
	}
}



	
fetchUsluge();