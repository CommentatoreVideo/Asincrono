const postUrl = "https://jsonplaceholder.typicode.com/posts/";
const headers = new Headers();
//Aggiungo un header al pacchetto. In questo caso è un codice di autorizzazione che il server ignorerà
headers.append("Authorization", "Bearer dsfsdfdsf$$££$£$");
const postId=1;
const init = {
	headers: headers,
	method: "GET",
};

//Modo 1
fetch(postUrl + postId, init)
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
	const result = await fetch(postUrl + postId, init);
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
