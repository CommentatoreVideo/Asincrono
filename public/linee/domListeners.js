document.getElementById("rangeT").oninput = function () {
	t = Number(this.value);
	document.getElementById("lblT").innerText = "t=" + t.toFixed(2);
	ricalcolaLinee();
};
document.getElementById("btnAbilitaPrecedenti").onclick = function () {
	disegnaLineaCompleta = true;
	generaPuntiGlobali();
	this.hidden = true;
	document.getElementById("btnDisabilitaPrecedenti").hidden = false;
};
document.getElementById("btnDisabilitaPrecedenti").onclick = function () {
	disegnaLineaCompleta = false;
	generaPuntiGlobali();
	this.hidden = true;
	document.getElementById("btnAbilitaPrecedenti").hidden = false;
};