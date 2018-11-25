import {apiVersion} from '../libs/version';

console.log(apiVersion.getLatestVersion(function(version){
    console.log
}));

var leagueUrls = {
    championImage: "https://ddragon.leagueoflegends.com/cdn/" + apiVersion.getLatestVersion() + "/img/champion/",
    championInfo: "http://ddragon.leagueoflegends.com/cdn/" + apiVersion.getLatestVersion() + "/data/en_US/champion/",
    allChampionsInfo: "http://ddragon.leagueoflegends.com/cdn/" + apiVersion.getLatestVersion() + "/data/en_US/champion.json"
};

export {leagueUrls};