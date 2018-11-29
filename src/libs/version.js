function getLatestVersion() {
	fetch("https://ddragon.leagueoflegends.com/api/versions.json")
		.then((response) => response.json())
		.then((versions) => {
			return versions[0];
		})
}



export {getLatestVersion};