let ddragonVersion = "6.24.1";

//Gets champion image (square)
//Append Champion id + .png to this one.. expect for Fiddlesticks.... because... fuck fiddlesticks?
let championImage = "https://ddragon.leagueoflegends.com/cdn/"+ddragonVersion+"/img/champion/";

//Append Champion.json to this one
let championInfo = "http://ddragon.leagueoflegends.com/cdn/"+ddragonVersion+"/data/en_US/champion/"

//Gets list of all champions
let allChampionsInfo = "http://ddragon.leagueoflegends.com/cdn/"+ddragonVersion+"/data/en_US/champion.json";

export {championImage, championInfo, allChampionsInfo};