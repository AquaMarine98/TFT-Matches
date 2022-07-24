const summonerURL = axios.create({
    baseURL: 'https://la2.api.riotgames.com/tft/summoner/v1/summoners',
    params: { 'api_key': API_KEY, }
})
const matchesURL = axios.create({
    baseURL: 'https://americas.api.riotgames.com/tft/match/v1/matches',
    params: {
        'api_key': API_KEY,
    },
})
// Summoner icon URL
const summonerIconURL = (iconId) => `http://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/${iconId}.png`;

// Needs to past a name for the search
async function getSummonerInformationByName() {
    const { data } = await summonerURL(`/by-name/V%C3%90%20Ultra%20UwU`);
    console.log(data);

    // Filling the summoner information
    summonerName.innerText = data.name;
    summonerIcon.setAttribute('alt', data.profileIconId)
    summonerIcon.setAttribute('src', summonerIconURL(data.profileIconId));
    summonerLvl.innerText = 'Level: ' + data.summonerLevel;

    // Matches id
    getMatchesId(data.puuid);
}

// Call the history based on the puuid given by the getSummonerInformationByName()
async function getMatchesId(puuid) {
    const { data: matches } = await matchesURL(`/by-puuid/${puuid}/ids`)
    console.log(matches);

    matches.map((match) => {
        getMatchesHistory(match, puuid);
    })
}
async function getMatchesHistory(matchId, puuid) {
    const { data } = await matchesURL(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`);
    //console.log(data);

    const participants = data.info.participants;
    //console.log(participants)

    // Map the participants to see if the puuid matches with the summoner searched
    participants.map((player) => {
        if(player.puuid === puuid) {
            console.log(player)
        }
    })
}

//getSummonerInformationByName();