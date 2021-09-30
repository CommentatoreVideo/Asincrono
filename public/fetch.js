const postUrl = "https://jsonplaceholder.typicode.com/posts/1";
const postId=1;

fetch(postUrl).then(result=>result.json()).then(data=>{
	
}).catch(error=>{
	
});;
//Modo 1
fetch(postUrl + postId)
	.then(result => {
		console.dir(result);
		//Controllo che il risultato sia ok
		if (!result.ok) throw new Error("Response failed");
		//Controllo che il tipo di risultato sia quello che mi interessa
		if (!result.headers.get("Content-Type").includes("application/json")) throw new Error("response type is not json");
		//Procedo a trasformarlo in json
		return result.json();
	})
	.then(json => {
		console.log(json);
	})
	.catch(err => {
		console.log(err);
	});

//Modo 2: Funzione invocata immediatamente(Immediately invoked function). Await non si può usare nel global scope, per questo viene creata una funzione senza nome che viene immediatamente chiamata.
(async function () {
	const result = await fetch(postUrl + postId);
	console.log(result);
	//Controllo che il risultato sia ok
	if (!result.ok) throw new Error("Response failed");
	//Controllo che il tipo di risultato sia quello che mi interessa
	if (!result.headers.get("Content-Type").includes("application/json")) throw new Error("response type is not json");
	//Procedo a trasformarlo in json
	const data = await result.json();
	console.log(data);
	return data;
})().catch(err => console.log(err));
