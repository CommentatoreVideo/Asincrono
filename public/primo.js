//Punto 1: Dichiaro due variabili numeriche a,b
let a = 1;
const b = 2;

//Punto 3: Funzione asincrona. setTimeout serve per eseguire del codice dopo che passa un tot di tempo. Questa funzione è asincrona. Da notare come essendo asincrona non viene eseguita in ordine con le altre.
setTimeout(function () {
	console.log("Async");
}, 2000);

//Punto 4: Funzione fetch che finisce prima di async. Fetch serve per ottenere dei dati. Vedremo più avanti come funziona. Per ora: alla funzione viene passato l'url dal quale ricevere i dati. Con il .then si passa una funzione chiamata callback che verrà eseguita quando il fetch ha finito
fetch("https://jsonplaceholder.typicode.com/users/1").then(function () {
	console.log("Fetch");
});

setTimeout(function () {
	console.log("Valore a", a);
}, 1000);
//Punto 5 Variabile modificata e timeout. Vediamo come il setTimeout prende il valore aggiornato della variabile.
a = 10;

//Punto 2: Eseguo il console.log di queste coordinate. Tutto come al solito
console.log("Sincrono");
console.log("a "+a);
console.log("b "+b);

//Punto 6: Notare come finisce prima il timer da 2000 rispetto che il timer da 5000
setTimeout(function () {
	console.log("Scaduto timer 5000");
}, 5000);
setTimeout(function () {
	console.log("Scaduto timer 2000");
}, 2000);

//Liberamente tratto da https://youtu.be/Kpn2ajSa92c.