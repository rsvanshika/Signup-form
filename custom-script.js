 function getPageName() {
 	var pageURL = window.location.pathname;
 	var pageName = pageURL.split('/').pop();
 	var filename = pageName.split('.').slice(0, -1).join('.'); //index/profile

 	const userData = JSON.parse(localStorage.getItem("user"));
 	if(filename === "profile"){

 		if(!userData || !userData.name || !userData.password || !userData.email || !userData.token){
 			window.location.href = 'index.html';
 		}

 		const details= document.getElementById("details");

 		details.innerHTML=`
 		Fullname: ${userData.name} <br>
 		Email: ${userData.email}<br>
 		Token: ${userData.token}<br>
 		Password: ${userData.password}<br>`
 	}

 	if(filename === "index"){
 		if(userData && userData.name && userData.password && userData.email && userData.token){
 			window.location.href = 'profile.html';
 		}
 	}

 }

 window.onload = getPageName;

 document.getElementById('signup-form')?.addEventListener('submit', function(event) {
 	event.preventDefault(); 
 	signUp();
 });

 function generateRandom16BitString() {
 	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
 	let random16BitString = '';
 	for (let i = 0; i < 16; i++) {
 		const randomIndex = Math.floor(Math.random() * characters.length);
 		random16BitString += characters.charAt(randomIndex);
 	}
 	return random16BitString;
 }

 function signUp(){
 	const name = document.getElementById("your_name").value.trim();
 	const email = document.getElementById("email").value.trim();
 	const password = document.getElementById("pswd").value.trim();
 	const confirmPassword = document.getElementById("confirm-pswd").value.trim();

 	const errorDiv = document.getElementById("form-error");

 	if(!name || !email || !password || !confirmPassword){
 		errorDiv.innerHTML = "Error : All fields are mandatory!";
 		return true;
 	} else if(password !== confirmPassword) {
 		errorDiv.innerHTML = "Error : Password Didn't Matched!";
 		return true;
 	} else {
 		errorDiv.innerHTML = "";
 	}

 	const userData = {
 		name,
 		email,
 		token: generateRandom16BitString(),
 		password
 	};

 	localStorage.setItem("user", JSON.stringify(userData));

 	window.location.href = 'profile.html';
 }

 function logout(){
 	localStorage.clear();
 	window.location.href = 'index.html';
 }