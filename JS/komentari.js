var sviKomentari = [];

function Komentar(author, komentar){
	this.author = author;
	this.komentar = komentar

	this.prikaziSe = function(){
		var comDiv = document.createElement("div");
		comDiv.className = "box-comment-container";

		var cboxDiv = document.createElement("div");
		cboxDiv.className = "comment-box";
		cboxDiv.innerHTML = this.komentar;

		var cautDiv = document.createElement("div");
		cautDiv.className = "author-name-com"
		cautDiv.innerHTML = this.author;

		var delcBtn = document.createElement("button");
		delcBtn.className = "btn-comment hidden-element";
		if(currentUser && currentUser.level == 3){
			delcBtn.classList.remove("hidden-element");
			delcBtn.onclick = () => {
			obrisiKomentar(this.komentar);
		}
		}
		else{
			delcBtn.classList.add("hidden-element"); 
		}
		delcBtn.innerHTML = "Delete"
		

		comDiv.appendChild(cboxDiv);
		comDiv.appendChild(cautDiv);
		comDiv.appendChild(delcBtn);

		return comDiv;
	}
}

function napraviKomentar(){
	var komAutor = document.getElementById("input-name-comment");
	var komContent = document.getElementById("input-comment");

	var kAutor = komAutor.value.trim();
	var kPoruka = komContent.value.trim();

	var uspesanKomentar = true;
	if(kAutor.length == 0 || kPoruka.length == 0){
		uspesanKomentar = false;
		console.log("PRAZNA PORUKA");
	}


	if(uspesanKomentar){
		axios.post("http://localhost:3000/komentari",{
				author: kAutor,
				content: kPoruka,
				}).then((res) =>{
					console.log(res.data); 
					//msgAuthor.value = ""
					komContent.value = ""
					fetchKomentare()
				})
	
	}


	
}




function fetchKomentare(){
			axios.get("http://localhost:3000/komentari")
			.then((res) => {
				var serverKomentari = res.data.data;
				sviKomentari = [];
				for(var k = 0; k<serverKomentari.length; k++){
					sviKomentari.push(new Komentar(
						serverKomentari[k].kom_ime,
						serverKomentari[k].kom_kom
						))
				}
				prikaziPoruke();
				
			})
		}




function prikaziPoruke(){
	var divKomentari = document.getElementById('comment-container');
	divKomentari.innerHTML = "";
	for(var s=0; s<sviKomentari.length; s++){
		divKomentari.appendChild(sviKomentari[s].prikaziSe())
	}

}

fetchKomentare()





function obrisiKomentar(komentar){
    this.komentar = komentar;
    
    var delKom = this.komentar;
 
    axios.post("http://localhost:3000/komentariD",{
                kom_kom: delKom,
                }).then((res) =>{
                    console.log(res.data);
                    fetchKomentare();
                })
    
}

function proveridelBtn(){
	if(currentUser == null){
		fetchKomentare()
	}
}





