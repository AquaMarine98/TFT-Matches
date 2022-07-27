const listOfAugments = {
    'Traitless1': 'BuiltDifferent1',
    'Traitless2': 'BuiltDifferent2',
    'Traitless3': 'BuiltDifferent3',

    'Distancing': 'Exiles1',
    'Distancing2': 'Exiles2',
    'Distancing3': 'Exiles3',

    'Diversify1': 'StandUnited1',
    'Diversify2': 'StandUnited2',
    'Diversify3': 'StandUnited3',

    'FuturePeepers': 'FutureSight1',
    'FuturePeepers2': 'FutureSight2',

    'TomeOfTraits1': 'AncientArchives1',
    'TomeOfTraits2': 'AncientArchive2',

    'ThrillOfTheHunt1': 'ThrilloftheHunt1',
    'ThrillOfTheHunt2': 'ThrilloftheHunt2',
    'ThrillOfTheHunt3': 'ThrilloftheHunt3',

    'LudensEcho1': `Luden'sEcho1`,
    'LudensEcho2': `Luden'sEcho2`,
    'LudensEcho3': `Luden'sEcho3`,

    'HyperRoll': 'Hustler',

    'TargetDummies': 'PhonyFrontline',

    'RevelTrait': 'RevelHearth',
    'RevelEmblem': 'RevelCrest',
    'RevelEmblem2': 'RevelCrown',

    'CannoneerTrait': 'CannoneerHearth',

    'ThreesCompany': `Three'sCompany`,

    'BandOfThieves1': 'BandofThieves1',
    'BandOfThieves2': 'BandofThieves2',

    'UrfsGrabBag1': `Urf'sGrabBag1`,
    'UrfsGrabBag2': `Urf'sGrabBag2`,

    'FirstAidKit': 'FirstAidKit1',
    'FirstAidKit2': 'FirstAidKit2',
    'FirstAidKit3': 'FirstAidKit3',

    'AssassinTrait': 'AssassinHeart',
    'AssassinEmblem': 'AssassinCrest',
    'AssassinEmblem2': 'AssassinCrown',

    'ShimmerscaleTrait': 'ShimmerscaleHeart',
    'ShimmerscaleEmblem': 'ShimmercaleCrest',
    'ShimmerscaleEmblem2': 'ShimmerscaleCrown',

    'CannoneerEmblem': 'CannoneerHeart',
    'CannoneerEmblem2': 'CannoneerCrown',

    'SwiftshotTrait': 'SwiftshotHeart',
    'SwiftshotEmblem': 'SwiftshotCrest',
    'SwiftshotEmblem2': 'SwiftshotCrown',

    'MageTrait': 'MageHeart',
    'MageEmblem': 'MageCrest',
    'MageEmblem2': 'MageCrown',

    'DragonmancerTrait': 'DragonmancerHeart',
    'DragonmancerEmblem': 'DragonmancerCrest',
    'DragonmancerEmblem2': 'DragonmancerCrown',

    'Bloodlust1': 'CombatTraining1',
    'Bloodlust2': 'CombatTraining2',
    'Bloodlust3': 'CombatTraining3',

    'PandorasBench': `Pandora'sBench`,

    'ForceOfNature': 'NewRecruit',
}

function fetchAugments(augmentId, imageSource) {
    const [a, b, augmentName] = augmentId.split('_');

    const regEx = new RegExp(/([I*]+)$/g);

    fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json')
        .then(response => response.json())
        .then(data => {
            data.items.map((item) => {
                if (item.name != null && item.name != '') {
                    const nameWithRegex = item.name.replace(/\s/g, '');
                    const nameWithRegex2 = nameWithRegex.replace(regEx, '');
                    let tier = nameWithRegex.match(regEx);
                    let finishName = '';
                    if (tier == null) {
                        finishName = nameWithRegex2;
                    }
                    else {
                        finishName = nameWithRegex.replace(regEx, tier.toString().length);
                    }

                    // Quitandole los +(plus) al nombre pasado por parametro
                    let nameToMatch = augmentName.replace(/\+/g, '');
                    // Chequeando que sea un emblema
                    let lastCheck = '';
                    if (listOfAugments[nameToMatch] != null) {
                        lastCheck = listOfAugments[nameToMatch];
                    } else { lastCheck = nameToMatch; console.log(nameToMatch); }

                    let nameMatch = lastCheck.includes(finishName);

                    if (nameMatch) {
                        let imageEndpoint = item.icon.replace('.dds', '.png').toLowerCase();
                        imageSource.setAttribute('src', `https://raw.communitydragon.org/latest/game/${imageEndpoint}`);
                        imageSource.setAttribute('alt', lastCheck);
                    }
                }
            })
        })
}

//fetchAugments("TFT7_Augment_ScalescornEmblem2")

//Best Friends I
//--
//BestFriends1

//ASSETS/Maps/Particles/TFT/Item_Icons/Augments/Hexcore/Best-Friends-I.TFT_Set7.png