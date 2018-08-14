/*----------------*/
/* FIREBASE SETUP */
/*----------------*/

// firebase configuration
var config = {
	apiKey: "AIzaSyAnQBTNzsGBiAS5BJhDNmRKEJn9QPB4mFA",
	authDomain: "padseek-oylo-info.firebaseapp.com",
	databaseURL: "https://padseek-oylo-info.firebaseio.com",
	projectId: "padseek-oylo-info",
	storageBucket: "padseek-oylo-info.appspot.com",
	messagingSenderId: "573441583035"
};

// initializing communication with database
firebase.initializeApp(config);

// creating database object reference 
var database = firebase.database();