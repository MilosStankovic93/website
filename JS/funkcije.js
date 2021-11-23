var currentUser = null;



function toggle(id){
	var element = document.getElementById(id);
	if(element != null){
		element.classList.toggle("hidden-element");
	}
	if(element = null){
		console.log("X")
	}
}


function zakazi_page(){
	window.location.href = "zakazi.html"
}


function log_in_page(){
	window.location.href = "login.html";
	
}

function registerpg(){
	window.location.href = "register.html"
}

function hide(id){
	var element = document.getElementById(id);
	element.classList.add("hidden-element");
}


function btnHandleLogin() {

	document.getElementById("text-error").innerHTML = "";
	var email = document.getElementById("input_lgn_email").value.trim()
	var password = document.getElementById("input_lgn_password").value.trim()
	
	
	


	axios.post("http://localhost:3000/login", {
		email: email,
		password: password
	}).then((res) => {
		if(res.data.result == "OK"){
			loginUser(res.data.data);
			window.location.href = "index.html#kontakt2";
			return
		}
		showError(res.data.message);
	});


}

	function loginUser(user){
		currentUser = user;
		
		localStorage.setItem("logged-user", JSON.stringify(user));
	
		console.log("Bravo", user);
		toggle("login_container")
		toggle("lgn_btn");
		toggle("logout_btn");
		toggle("rgr_btn");
		pokaziLevel();

	}
 


	function showError(text){
		document.getElementById("text-error").innerHTML = text;
	}

	function checkLogin(){
		var rememberedUser = localStorage.getItem("logged-user");
		if(rememberedUser != null){
			rememberedUser = JSON.parse(rememberedUser);
			loginUser(rememberedUser);
		}
	}




function Logout(){
	if(currentUser && currentUser.level == 3){
		toggle("admin_cenovnik");
	}
	toggle("login_container");
	toggle("logout_btn");
	toggle("lgn_btn");
	toggle("logged_in_forma");
	toggle("rgr_btn");
	toggle("userForma");
	toggle("noneuserForma");
	currentUser = null;
	localStorage.removeItem("logged-user");
	if(currentUser){
		email = document.getElementById("input_lgn_email").value = ""	
		password = document.getElementById("input_lgn_password").value = ""
	}
}

function pokaziLevel(){
	if(currentUser && currentUser.level == 3){
		console.log("Admin");
		toggle("logged_in_forma");
		toggle("admin_cenovnik");
		toggle("userForma");
		toggle("noneuserForma");
		

		
		
	}
	if(currentUser && currentUser.level == 2){
		console.log("Logged in");
		toggle("logged_in_forma");
		toggle("userForma");
		toggle("noneuserForma");
		
	}

}







function fadeInUp(){
	$(window).scroll(function() {
		if(window.scrollY > 2620 ) {
			$(".style_flex").addClass("fadeInUp");

		}

		else {
			$(".style_flex").removeClass("fadeInUp");
		}
	});
}


function fadeInUp2(){
	$(window).scroll(function() {
		if(window.scrollY > 250 ) {
			$("#fiU").addClass("fadeInUp");

		}

		else {
			$("#fiU").removeClass("fadeInUp");
		}
	});
}

function fadeInX(){
	$(window).scroll(function() {
		if(window.scrollY > 1100 ) {
			$("#test-desno").addClass("fadeIn");

		}

		else {
			$("#test-desno").removeClass("fadeIn");
		}
	});
}

function fadeInX2(){
	$(window).scroll(function() {
		if(window.scrollY > 1100 ) {
			$("#test-levo").addClass("fadeInLeft");

		}

		else {
			$("#test-levo").removeClass("fadeInLeft");
		}
	});
}



function fadeInX3(){
	$(window).scroll(function() {
		if(window.scrollY > 3100 ) {
			$("#test-desno2").addClass("fadeIn");

		}

		else {
			$("#test-desno2").removeClass("fadeIn");
		}
	});
}

function fadeInX4(){
	$(window).scroll(function() {
		if(window.scrollY > 3100 ) {
			$("#test-levo2").addClass("fadeInLeft");

		}

		else {
			$("#test-levo2").removeClass("fadeInLeft");
		}
	});
}


function fadeInKontakt(){
	$(window).scroll(function(){
		if(window.scrollY > 6200){
			$(".contactInfo").addClass("fadeInLeft");
		}
		else{
			$(".contactInfo").removeClass("fadeInLeft");
		}
	})
}


function fadeInKontakt2(){
	$(window).scroll(function(){
		if(window.scrollY > 6200){
			$(".contactForm").addClass("fadeIn");
		}
		else{
			$(".contactForm").removeClass("fadeIn");
		}
	})
}






function vrati2(){
	$("html").animate({scrollTop:0}, 700);
}


function arrowUp(){
	$(window).scroll(function() {
		if(window.scrollY > 700 ) {
			$("#vratigore").fadeIn("slow");
			

		}

		else {
			$("#vratigore").fadeOut("slow");
		}
	});
}


function gdeSam(){
	console.log(window.scrollY);
}















var slideIndex = 1;


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  	var slides = document.getElementsByClassName("mySlides");
  	var dots = document.getElementsByClassName("dot");


  	if (n > slides.length) {
  		slideIndex = 1;
  	}

    if (n < 1) {
    	slideIndex = slides.length;
    }

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (var i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active"; 
} 

fadeInUp();
fadeInUp2();
fadeInX()
fadeInX2()
fadeInX3()
fadeInX4()
arrowUp()
fadeInKontakt()
fadeInKontakt2()


checkLogin();





