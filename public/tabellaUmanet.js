const url = "https://www.umanet.net/api/subjects/?format=json";
function creaRiga() {
	const riga = document.createElement("div");
	riga.classList.add("row");
	return riga;
}
function creaColonna() {
	const colonna = document.createElement("div");
	colonna.classList.add("col-4");
	return colonna;
}
function creaTHead() {
	const thead = document.createElement("thead");
	const tr = document.createElement("tr");
	const thChiave = document.createElement("th");
	thChiave.innerText = "Chiave";
	const thValore = document.createElement("th");
	thValore.innerText = "Valore";
	tr.appendChild(thChiave);
	tr.appendChild(thValore);
	thead.appendChild(tr);
	return thead;
}
function creaTabella() {
	const tabella = document.createElement("table");
	tabella.classList.add("table");
	tabella.appendChild(creaTHead());
	const tbody = document.createElement("tbody");
	tabella.appendChild(tbody);
	return tabella;
}
(async function () {
	const response = await fetch(url,{mode:"no-cors"});
	const data = await response.json();
	let colonne = [];
	let riga = creaRiga();
	for (const materia of data) {
		const colonna = creaColonna();
		const tabella = creaTabella();
		for (const chiave in data) {
			const tr = document.createElement("tr");
			const tdChiave = document.createElement("td");
			tdChiave.innerText = chiave;
			const tdValore = document.createElement("td");
			tdValore.innerText = data[chiave];
			tr.appendChild(tdChiave);
			tr.appendChild(tdValore);
			tabella.querySelector("tbody").appendChild(tr);
		}
		colonna.appendChild(tabella);
		colonne.push(colonna);
		if (colonne.length === 3) {
			for (const colonna of colonne) riga.appendChild(colonna);
			colonne = [];
      document.querySelector(".container-fluid").appendChild(riga);
      riga=creaRiga();
		}
	}
})();
