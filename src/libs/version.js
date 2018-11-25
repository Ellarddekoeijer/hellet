var apiVersion = {

    getLatestVersion : function (version) {
        fetch("https://ddragon.leagueoflegends.com/api/versions.json")
            .then((response) => response.json())
            .then((versions) => {
                version(versions[0]);
            });

    }
};

var leagueVersion = apiVersion.getLatestVersion();

export {apiVersion, leagueVersion};