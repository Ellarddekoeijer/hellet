// import {getLatestVersion} from '../libs/version';
import {getLatestVersion} from '../libs/version';
import {championggApi} from '../libs/api';

// console.log(getLatestVersion(function(version){
//     console.log(version);
// }));
// 
const version = "8.23.1";

var leagueUrls = {
    championImage: "https://ddragon.leagueoflegends.com/cdn/" + version + "/img/champion/",
    championFullImage: "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/",
    championInfo: "http://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion/",
    allChampionsInfo: "http://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion.json",
    spellImage: "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/",
    passiveImage: "http://ddragon.leagueoflegends.com/cdn/" + version + "/img/passive/"
};

var championggUrls = {
	championDetails: "http://api.champion.gg/v2/champions/",
	championDataSet: "?champData=kda,damage,averageGames,totalHeal,killingSpree,minions,gold,hashes,positions,normalized,groupedWins,trinkets,runes,firstitems,summoners,skills,finalitems,masteries,maxMins,matchups&api_key=" + championggApi
}

export {leagueUrls, championggUrls};