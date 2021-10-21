/*globals Chart*/
//NB. Per quanto possibile ho cercato di seguire il primo principio SOLID(Single Responsibility)
const urlTodos = "https://jsonplaceholder.typicode.com/todos";
async function getTodos(url) {
	const result = await fetch(url);
	const data = await result.json();
	return data;
}
function calcolaNumeroTodos(todos) {
	const daFare = todos.reduce((tot, todo) => tot + todo.completed, 0);
	return [daFare, todos.length - daFare];
}
function calcolaPercentuali(numeroDaFare, numeroFatti) {
	const totTodos = numeroDaFare + numeroFatti;
	const percDaFare = ((numeroDaFare / totTodos) * 100).toFixed(2);
	const percFatti = ((numeroFatti / totTodos) * 100).toFixed(2);
	return [percDaFare, percFatti];
}
function generaGrafico(percDaFare, percFatti) {
	const ctx = document.getElementById("myChart").getContext("2d");
	new Chart(ctx, {
		type: "pie",
		data: {
			labels: ["Da fare", "Fatti"],
			datasets: [
				{
					data: [percDaFare, percFatti],
					backgroundColor: ["rgb(255, 0, 0)", "rgb(0, 255, 0)"],
					hoverOffset: 4,
				},
			],
		},
		options: {
			maintainAspectRatio: false,
		},
	});
}
(async function () {
	const todos = await getTodos(urlTodos);
	const [numeroDaFare, numeroFatti] = calcolaNumeroTodos(todos);
	const [percDaFare, percFatti] = calcolaPercentuali(numeroDaFare, numeroFatti);
	generaGrafico(percDaFare, percFatti);
})();
