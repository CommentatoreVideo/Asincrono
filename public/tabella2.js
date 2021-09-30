const url = "https://jsonplaceholder.typicode.com/todos/";

document.querySelector("#divDettagli .navbar").onclick = function () {
	document.getElementById("divDettagli").hidden = true;
	document.body.classList.remove("noOverflow");
};

function creaCard(todo) {
	const card = document.createElement("div");
	card.classList.add("card");
	const cardBody = document.createElement("div");
	cardBody.classList.add("card-body");
	const cardTitle = document.createElement("h5");
	cardTitle.classList.add("card-title");
	cardTitle.innerText = todo.title;
	cardBody.appendChild(cardTitle);
	card.appendChild(cardBody);
	cardTitle.onclick = function () {
		document.body.classList.add("noOverflow");
		document.getElementById("divDettagli").hidden = false;
		document.querySelector("#divDettagli .corpo table tbody").innerHTML = "";
		for (const chiave in todo) {
			const riga = document.createElement("tr");
			const tdChiave = document.createElement("td");
			tdChiave.innerText = chiave;
			const tdValore = document.createElement("td");
			tdValore.innerText = todo[chiave];
			riga.appendChild(tdChiave);
			riga.appendChild(tdValore);
			document.querySelector("#divDettagli .corpo table tbody").appendChild(riga);
		}
	};
	return card;
}
(async function () {
	const response = await fetch(url);
	const data = await response.json();
	for (const todo of data) {
		document.querySelector(".container-fluid").appendChild(creaCard(todo));
	}
})();
