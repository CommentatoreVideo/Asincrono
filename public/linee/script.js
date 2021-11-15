const dataPunti = [
	{ x: 100, y: 300, id: 0, collegamento: 1 },
	{ x: 100, y: 100, id: 1, collegamento: 2 },
	{ x: 300, y: 100, id: 2, collegamento: 3 },
	{ x: 300, y: 300, id: 3 },
];
let disegnaLineaCompleta = false;
let idCerchioPremuto;
const puntiCurva = [];
let lastId = 3;
const tuttiPunti = [];
let t = 0.5;
const tutteLinee = [];
let tuttiPuntiIniziali = [];
function setup() {
	createCanvas(500, 500);
	generaPuntiGlobali();
}
function generaPuntiGlobali() {
	tuttiPunti.length = 0;
	puntiCurva.length = 0;
	tutteLinee.length = 0;
	for (const { x, y, id, collegamento } of dataPunti) {
		tuttiPunti.push(new Punto(x, y, id, collegamento));
	}
	tuttiPuntiIniziali = tuttiPunti.slice();
	if (disegnaLineaCompleta) for (let i = 0; i < t; i += 0.01) calcolaLinee(tuttiPuntiIniziali, false, i);
	calcolaLinee(tuttiPuntiIniziali, true);
}

function draw() {
	background(0);
	// Disegno prima le linee, altrimenti si sovrappongono ai punti rendendo più brutta la grafica
	tutteLinee.forEach(linea => linea.mostra());
	tuttiPunti.forEach(punto => punto.mostra());
	noFill();
	stroke(255, 0, 0);
	strokeWeight(5);
	beginShape();
	puntiCurva.forEach(({ x, y }) => vertex(x, y));
	endShape();
}
function ricalcolaLinee() {
	lastId = 3;
	tutteLinee.length = 0;
	generaPuntiGlobali();
}
function calcolaLinee(punti, mostra, t1 = t) {
	const nuoveLinee = [];
	const nuoviPunti = [];
	for (const punto of punti) {
		const { collegamento } = punto;
		const arrivo = punti.find(punto => punto.id == collegamento);
		if(arrivo==undefined) continue;
		nuoveLinee.push(new Linea(punto, arrivo, mostra));
		const puntoInLinea = nuoveLinee.last().calcolaPuntoInLinea(t1, ++lastId, mostra);
		nuoviPunti.push(puntoInLinea);
	}
	if (nuoveLinee.length == 2) nuoveLinee.forEach(linea => (linea.colore = [0, 0, 255]));
	if (nuoveLinee.length == 1) nuoveLinee.forEach(linea => (linea.colore = [245, 66, 227]));
	tutteLinee.push(...nuoveLinee);
	for (let i = 0; i < nuoviPunti.length - 1; i++) {
		const { id: id2 } = nuoviPunti[i + 1];
		nuoviPunti[i].collegamento = id2;
	}
	tuttiPunti.push(...nuoviPunti);
	if (nuoviPunti.length > 1) return calcolaLinee(nuoviPunti, mostra, t1);
	puntiCurva.push(nuoviPunti[0]);
}

function mousePressed() {
	let trovato = false;
	dataPunti.forEach(punto => {
		const oggetto = new Punto(punto.x, punto.y, punto.id, null, true);
		if (oggetto.premuto()) {
			if (idCerchioPremuto != undefined) tuttiPuntiIniziali.find(punto => punto.id == idCerchioPremuto).pressed = false;
			idCerchioPremuto = oggetto.id;
			tuttiPuntiIniziali.find(punto => punto.id == idCerchioPremuto).pressed = true;
			trovato = true;
		}
	});
	if (trovato || idCerchioPremuto == undefined) return;
	const punto = dataPunti.find(punto => punto.id == idCerchioPremuto);
	if (punto == undefined) return;
	if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
	punto.x = mouseX;
	punto.y = mouseY;
	idCerchioPremuto = undefined;
	generaPuntiGlobali();
}

Array.prototype.last = function () {
	return this[this.length - 1];
};
