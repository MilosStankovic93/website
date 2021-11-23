
console.log("Server online");



var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "denIrO7nekodE7lfin",
	database: "z_rad"
});


con.connect(function(err){
	if(err){
		throw err
	}
	console.log("Connected!")
});






var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))


app.use((req, res, next) =>{
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET, POST,PUT,PATCH,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

var currentUser = null;







app.post("/login", function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	var currentUser = null;


	con.query("SELECT * FROM accounts WHERE usr_email = ? AND usr_pass = ?", [email, password], function(err, result, field){
		if(err){
				res.json({
					result: "ERROR"
				})
				return;
			}


		
		var u = result
		console.log(u)
		console.log(email)
		console.log(password)
		if(result.length >0){

		if(u[0].usr_email == email && u[0].usr_pass == password){
			currentUser = u;

		}
	}


		if(currentUser){
				res.json({
					result: "OK",
					data: {
						email: currentUser[0].usr_email,
						fullName: currentUser[0].usr_name + " " + currentUser[0].usr_lastname,
						level: currentUser[0].usr_lvl
					}

				})
				return;
			}
			res.json({
				result: "ERROR",
				message: "Invaild credentials",
				
			})
			

		})
 })




app.post("/cene", function(req, res){
	var cena_ime = req.body.ime;
	var cena_cena = req.body.cena;
	var cena_valuta = req.body.valuta;

	con.query("INSERT INTO cene (cena_ime, cena_cena, cena_valuta) VALUES (?,?,?)",
		[cena_ime, cena_cena, cena_valuta], function(err, result, field){
			if(err){
				res.json({
					result: "ERROR"
				})
				return;
			}


			res.json({
				result: "OK"
				
			})
		})
})

var delsql = "DELETE FROM cene WHERE cena_ime = ?";

app.post("/ceneD", function(req, res){
	var cena_ime = req.body.ime;
	var cena_cena = req.body.cena;
	var cena_valuta = req.body.valuta;

	con.query(delsql, cena_ime, function(err, result, field){
			if(err){
				console.log("Err " +result);
				res.json({
					result: "ERROR"
				})
				return;
			}
			console.log("Ok " +result);
			
			res.json({
				result: "OK"
				
			})
		})
})


app.get("/cene", function(req, res){
	var cene_ime = req.query.cene_ime;
	var cena_cena = req.query.cene_cena;
	var cena_valuta = req.query.cene_valuta;

	con.query("SELECT * FROM cene", function(err, result, field){
			if(err) throw err;
				console.log(result);
				res.json({
					data: result
					});
				});
			return;
		});





app.get("/", function(req, res){
	console.log("Dosao Klient");
	res.json({"msg": "Hello World from Node!"});
});


app.post("/chat", function(req, res){
	var chat_ime = req.body.author;
	var chat_cont = req.body.content;

	con.query("INSERT INTO chat (chat_ime, chat_cont) VALUES (?,?)",
		[chat_ime, chat_cont], function(err,result, field){
			if(err){
				res.json({
					result: "ERROR"
				})
				return;
				
			}
			
			res.json({
				result: "OK"
			})

		})

})


app.get("/chat", function(req, res){
	var chat_ime = req.query.chat_ime;
	var chat_cont = req.query.chat_cont;

	con.query("SELECT * FROM chat", function(err, result, field){
			if(err) throw err;
				res.json({
					data: result
					});
				});
			return;
		});









app.post("/korisnici", function(req, res){
	var usr_email = req.body.email;
	var usr_name = req.body.name;
	var usr_lastname = req.body.lastname;
	var usr_pass = req.body.pass;
	var usr_lvl = req.body.lvl;

	con.query("INSERT INTO accounts (usr_email, usr_name, usr_lastname, usr_pass, usr_lvl) VALUES (?,?,?,?,?)",
		[usr_email, usr_name, usr_lastname, usr_pass, usr_lvl], function(err,result, field){
			if(err){
				res.json({
					result: "ERROR"
				})
				return;
				
			}
			res.json({
				result: "OK"
			})

		})

})


app.listen(port, function(){
	console.log("Aplikacija radi na portu "+port);
})




app.post("/komentari", function(req, res){
	var kom_ime = req.body.author;
	var kom_kom = req.body.content;

	con.query("INSERT INTO komentari (kom_ime, kom_kom) VALUES (?,?)",
		[kom_ime, kom_kom], function(err,result, field){
			if(err){
				res.json({
					result: "ERROR"
				})
				return;
				
			}
			
			res.json({
				result: "OK"
			})

		})

})


app.get("/komentari", function(req, res){
	var kom_ime = req.query.kom_ime;
	var kom_kom = req.query.kom_kom;

	con.query("SELECT * FROM komentari", function(err, result, field){
			if(err) throw err;
				res.json({
					data: result
					});
				});
			return;
		});



app.post("/komentariD", function(req, res){
	var kom_kom = req.body.kom_kom;

	con.query("DELETE FROM komentari WHERE kom_kom = ?", kom_kom, function(err, result, field){
			if(err){
				console.log("Err " +result);
				res.json({
					result: "ERROR"
				})
				return;
			}
			console.log("Ok " +result);
			
			res.json({
				result: "OK"
				
			})
		})
})








app.post("/zakazi", function(req, res){
	var zak_ime = req.body.ime;
	var zak_prezime = req.body.prezime;
	var zak_vreme = req.body.vreme;
	var zak_vremeKraj = req.body.vremeKraj;
	var zak_datum = req.body.datum

	con.query("INSERT INTO zakazi (zak_ime, zak_prezime, zak_vreme, zak_vremeKraj, zak_datum) VALUES (?,?,?,?,?)",
		[zak_ime, zak_prezime, zak_vreme, zak_vremeKraj, zak_datum], function(err, result, field){
			if(err){
				res.json({
					result: "ERROR"
				})
				return;
			}


			res.json({
				result: "OK"
				
			})
		})
})



app.get("/zakazi", function(req, res){

	con.query("SELECT DATE_FORMAT(zak_vreme,'%k:%i') AS 'zak_vreme', DATE_FORMAT(zak_vremeKraj,'%k:%i') AS 'zak_vremeKraj', DATE_FORMAT(zak_datum, '%Y-%m-%d') AS 'zak_datum' FROM zakazi", function(err, result, field){
			if(err) throw err;
				console.log(result);
				res.json({
					data: result
					});
				});
			return;
		});








