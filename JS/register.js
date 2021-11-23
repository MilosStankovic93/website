function noviUser(email, firstname, lastname, password){
			var inputEmail = document.getElementById("r_input_email");
			var inputIme = document.getElementById("r_input_name");
			var inputPrezime = document.getElementById("r_input_lastn");
			var inputSifra = document.getElementById("r_input_pass");
			var regError = document.getElementById("reg-error");
			regError.innerHTML = "";

			var email = inputEmail.value.trim();
			var ime = inputIme.value.trim();
			var prezime = inputPrezime.value.trim();
			var sifra = inputSifra.value.trim();
			var lvl = 2;

			var validacijaUspesna = true;
			var monkey = false;
			var brojTacaka = 0;

			for(var i = 0; i<email.length; i++){
				if(email[i] == "@"){
					monkey = true;
				}
				if(email[i] == "."){
					brojTacaka++;
				}

			}

			if(monkey == false || sifra == "" || ime == "" || prezime == ""){
				validacijaUspesna = false;
			}
			if(brojTacaka !=1 || sifra == "" || ime == "" || prezime == ""){
				validacijaUspesna = false;
			}
			
			if(validacijaUspesna){
				axios.post("http://localhost:3000/korisnici",{
				email: email,
				name: ime,
				lastname: prezime,
				pass: sifra,
				lvl: lvl
				}).then((res) =>{
					console.log(res.data);
					result = res.data.result;
					console.log(result); 
					inputEmail.value = ""
					inputIme.value = ""
					inputPrezime.value = ""
					inputSifra.value = ""  
					regError.innerHTML = ""
					if(result != "ERROR"){
					window.location.href = "login.html";
					}
					if(result == "ERROR"){
						regError.innerHTML = "Email adresa je vec iskoriscena"
					}
				})
			}

			if(monkey == false || brojTacaka !=1){
				regError.innerHTML = "Email adresa nije validna"
			}
			
			if(sifra == ""){
				regError.innerHTML = "Unesi sifru!"
				
			}

			if(ime == ""){
				regError.innerHTML = "Unesi ime!"
			}

			if(prezime == ""){
				regError.innerHTML = "Unesi prezime!"
			}
			
		}

