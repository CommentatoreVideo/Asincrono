/*globals Chart*/
const ctx = document.getElementById("myChart").getContext("2d");
new Chart(ctx, {
	type: "pie",
	data: {
		labels: ["Primo", "Secondo", "Terzo", "Quarto", "Quinto"],
		datasets: [
			{
				data: [8, 3, 6, 2, 8],
				backgroundColor: ["red", "green", "blue", "cyan", "yellow", "brown"],
				hoverOffset: 4,
			},
		],
	},
	options: {
		maintainAspectRatio: false,
	},
});
