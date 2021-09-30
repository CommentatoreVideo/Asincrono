class HttpError extends Error {
	constructor(response) {
		super(`${response.status} for ${response.url}`);
		this.name = "HttpError";
		this.response = response;
	}
}

function loadJson(url) {
	return fetch(url).then(response => {
		if (response.status == 200) return response.json();
		else throw new HttpError(response);
	});
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
	const name = prompt("Enter a name?", "CommentatoreVideo");

	return loadJson(`https://api.github.com/users/${name}`)
		.then(user => {
			alert(`Full name: ${user.login}.`);
			return user;
		})
		.catch(err => {
			if (err instanceof HttpError && err.response.status == 404) {
				alert("No such user, please reenter.");
				return demoGithubUser();
			} else throw err;
		});
}

// demoGithubUser();

async function loadJsonAsync(url) {
	const response = await fetch(url);
	if (response.status == 200) return response.json();
	throw new HttpError(response);
}

async function demoGithubUserAsync() {
	let user;
	while (true) {
		const name = prompt("Enter a name?", "CommentatoreVideo");
		try {
      /*eslint-disable-next-line*/
			user = await loadJsonAsync(`https://api.github.com/users/${name}`);
			break; //Usciamo
		} catch (err) {
			if (err instanceof HttpError && err.response.status == 404) alert("Utente non trovato. Riprova");
			else throw err;
		}
	}

	alert(`Full name: ${user.name}.`);
	return user;
}
demoGithubUserAsync();
