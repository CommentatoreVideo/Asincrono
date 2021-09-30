const url="https://jsonplaceholder.typicode.com/todos/1";
(async function() {
  const response=await fetch(url);
  const data=await response.json();
  for(const chiave in data) {
    const riga=document.createElement("tr");
    const tdChiave=document.createElement("td");
    tdChiave.innerText=chiave;
    const tdValore=document.createElement("td");
    tdValore.innerText=data[chiave];
    riga.appendChild(tdChiave);
    riga.appendChild(tdValore);
    document.getElementById("tbody").appendChild(riga);
  }
})();