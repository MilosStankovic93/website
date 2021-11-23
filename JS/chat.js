var svePoruke = [];

var poruka = document.getElementById("kontent-chat");
poruka.addEventListener("keydown", function(event) {

  // Number 13 is the "Enter" key on the keyboard
  if(event.keyCode === 13 && event.shiftKey == true){
  	poruka.value += "<br>";
  }
  if (event.keyCode === 13 && event.shiftKey == false) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btn-posalji").click();
  }
}); 

function ChatMessage(author, content){
	this.author = author;
	this.content = content;

	this.prikaziSe = function(){
		var msgDiv = document.createElement("div");
		msgDiv.className = "chat someone";

		var pName = document.createElement("p");
		pName.className = "user-photo"
		pName.innerHTML = this.author + ':';

		var pContent = document.createElement("p")
		pContent.className ="chat-message" 
		pContent.innerHTML = this.content;

		msgDiv.appendChild(pName);
		msgDiv.appendChild(pContent);

		return msgDiv;
	}
}


function napraviPoruku(){
	var msgAuthor = document.getElementById("ime-chat-korisnik");
	var msgContent = document.getElementById("kontent-chat");

	var Autor = msgAuthor.value.trim();
	var Poruka = msgContent.value.trim();

	var uspesnaPoruka = true;
	if(Autor.length == 0 || Poruka.length == 0){
		uspesnaPoruka = false;
		console.log("PRAZNA PORUKA");
	}


	if(uspesnaPoruka){
		axios.post("http://localhost:3000/chat",{
				author: Autor,
				content: Poruka,
				}).then((res) =>{
					console.log(res.data); 
					//msgAuthor.value = ""
					msgContent.value = ""
					fetchPoruke()
				})
	fetchPoruke()
	}


	
}


function fetchPoruke(){
			axios.get("http://localhost:3000/chat")
			.then((res) => {
				var serverPoruke = res.data.data;
				svePoruke = [];
				for(var i = 0; i<serverPoruke.length; i++){
					svePoruke.push(new ChatMessage(
						serverPoruke[i].chat_ime,
						serverPoruke[i].chat_cont
						))
				}
				prikaziSvePoruke();
			})
		}


function prikaziSvePoruke(){
	var divChatroom = document.getElementById("chatlogs");
	divChatroom.innerHTML = "";

	for(var j=0; j<svePoruke.length; j++){
		divChatroom.appendChild(svePoruke[j].prikaziSe());

	}

	var idiGore = document.getElementById('chatlogs');
   idiGore.scrollTop = idiGore.scrollHeight;
}

fetchPoruke();

function toggle(id){
	var element = document.getElementById(id);
	if(element != null){
		element.classList.toggle("hidden-element");
	}
	if(element = null){
		console.log("X")
	}
}


function openChat() {
	toggle("chatbox")
	toggle("chatlogs")
	$('.btn-chat').hide();
}
    
function closeChat() {
	toggle("chatbox")
	toggle("chatlogs")
	$('.btn-chat').show();
}

/*
function obrisiPoruku() {
	var obrisiPoruku = document.getElementById("ime-chat-obrisi")
	var PorukaObrisana = obrisiPoruku.value;

	axios.post("http://localhost:3000/chatD",{
                chat_cont: PorukaObrisana,
                }).then((res) =>{
                    console.log(res.data);
                    fetchPoruke();
                })
    
}
*/





