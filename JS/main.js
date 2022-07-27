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
    const { data } = await summonerURL(`/by-name/Nexoox`);
    //console.log(data);

    // Filling the summoner information
    summonerName.innerText = data.name;
    summonerIcon.setAttribute('alt', data.profileIconId)
    summonerIcon.setAttribute('src', summonerIconURL(data.profileIconId));
    summonerLvl.innerText = 'Level: ' + data.summonerLevel;


    // Erase all the content from the match history before create the new matches
    matchesContainer.innerHTML = '';

    // Matches id
    getMatchesId(data.puuid);
}

// Call the history based on the puuid given by the getSummonerInformationByName()
async function getMatchesId(puuid) {
    const { data } = await matchesURL(`/by-puuid/${puuid}/ids`, {
        params: {
            'count': '20',
        },
    })

    const matches = data;

    matches.map((match, index) => {
        setTimeout(() => {
            getMatchesHistory(match, puuid)
        }, 500 * index)
    })
}
async function getMatchesHistory(matchId, puuid) {
    const { data } = await matchesURL(`https://americas.api.riotgames.com/tft/match/v1/matches/${matchId}`);

    const participants = data.info.participants;
    const matchInfo = data.info;

    // Map the participants to see if the puuid matches with the summoner searched
    participants.forEach((player) => {
        if(player.puuid === puuid) {
            createMatch(player, matchInfo, data)
            console.log([player])
        }
    })
}

// Create all the elements for individual match
function createMatch(player, matchInfo, data) {
    const match = document.createElement('article');
    match.classList.add('match');
    match.setAttribute('id', data.metadata.match_id);

    //MATCHES
    matchesContainer.appendChild(match);

    // Match information
    const information = document.createElement('div');
    information.classList.add('match-information');

    const placement = document.createElement('h2');
    placement.innerText = 'Position ' + player.placement;

    const lvlGameMode = document.createElement('h1');
    
    lvlGameMode.innerText = `Level ${player.level} • ${matchInfo.tft_game_type.charAt(0).toUpperCase() + matchInfo.tft_game_type.slice(1)}`;

    const div = document.createElement('div');

    const date = document.createElement('p');
    const dateInMiliseconds = matchInfo.game_datetime;
    const dateString = new Date(dateInMiliseconds);
    const [fecha, tiempo] = dateString.toLocaleString().split(',');
    date.innerText = fecha;
    
    information.appendChild(placement);
    information.appendChild(lvlGameMode);
    information.appendChild(div);
    information.appendChild(date);

    match.appendChild(information);

    // Augments
    const augments = document.createElement('article');
    augments.classList.add('augments');
    player.augments.map((augment) => {
        const image = document.createElement('img');
        image.classList.add('augment');
        //augmentsURL(augment, image);
        fetchAugments(augment, image);

        augments.appendChild(image);
    })
    match.appendChild(augments);

    // Champions
    const champions = document.createElement('article');
    champions.setAttribute('id', 'MATCH_CHAMPIONS');
    player.units.map((unit) => {
        const champContainer = document.createElement('div');
        champContainer.classList.add('champion');

        const champImg = document.createElement('img');
        champImg.classList.add('champ-img');
        champImg.classList.add('rarity' + unit.rarity);
        let champId = unit.character_id.toLowerCase();
        let champName = '';
        let isNomsy = false;
        if(champId == 'tft7_dragongold') {
            champName = 'tft7_shimmerscaledragon';
        }
        else if(champId == 'tft7_dragonblue') {
            champName = 'tft7_miragedragon';
        }
        else if(champId == 'tft7_dragongreen') {
            champName = 'tft7_jadedragon';
        }
        else if(champId == 'tft7_dragonpurple') {
            champName = 'tft7_whispersdragon';
        }
        else if(champId == 'tft7_trainerdragon') {
            champId = 'tft_itemunknown';
            champName = 'tft7_nomsy';
            isNomsy = true;
        }
        else {
            champName = champId;
        }

        if(isNomsy) {
            champImg.setAttribute('src', `https://raw.communitydragon.org/latest/game/assets/characters/${champId}/skins/skin0/${champName}_square.tft_set7.png`)
        } 
        else {
            champImg.setAttribute('src', `https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/${champName}_square.tft_set7.png`)
        }
        

        champContainer.appendChild(champImg);

        const stars = document.createElement('div');
        stars.classList.add('stars');

        for(let i = 0; i <= unit.tier - 1; i++) {
            const star = document.createElement('div');
            star.classList.add('star')
            star.innerText = '⭐';

            stars.appendChild(star);
        }
        champContainer.appendChild(stars);

        champions.appendChild(champContainer);
    })

    match.appendChild(champions);
}

getSummonerInformationByName();