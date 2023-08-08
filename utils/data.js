const dayJS = require('dayjs');

const usernames = [
    'perfectly_beginning123',
    '_dripoutspoken_',
    'trappedtreasure05',
    'funlikable',
    'amazingbroker',
    'stomachloafers',
    'jumpropeboyscouts87',
    'night_equal1998',
    'subtletyimprove',
    'yelpadjust25',
    'reiterate_lapel',
    'jabberpanicky42',
    'home4team4shortcake',
    'vastgrandiose_',
    '07_exercisecherries',
    'boars_goujon',
    '246radishtear',
    'passionate_pinch_1337',
    'adequatejoyous666',
    'xxx_placesurface_xxx',
    'fastenfloat',
    'consonant_heel'
]

const emails = [
    'perfectly_beginning123@gmail.com',
    '_dripoutspoken_@gmail.com',
    'trappedtreasure05@gmail.com',
    'funlikable@gmail.com',
    'amazingbroker@gmail.com',
    'stomachloafers@gmail.com',
    'jumpropeboyscouts87@gmail.com',
    'night_equal1998@gmail.com',
    'subtletyimprove@gmail.com',
    'yelpadjust25@gmail.com',
    'reiterate_lapel@gmail.com',
    'jabberpanicky42@gmail.com',
    'home4team4shortcake@gmail.com',
    'vastgrandiose_@gmail.com',
    '07_exercisecherries@gmail.com',
    'boars_goujon@gmail.com',
    '246radishtear@gmail.com',
    'passionate_pinch_1337@gmail.com',
    'adequatejoyous666@gmail.com',
    'xxx_placesurface_xxx@gmail.com',
    'fastenfloat@gmail.com',
    'consonant_heel@gmail.com'
]

const possibleThoughts = [
   `I saw the Barbie movie and loved it!`,
    `Going on vacayyyy`,
    `Why does God look away when people suffer?`,
    `If someone could send me the notes from chem today, that'd be great`,
    `What is the DEAL with airline food?`,
    `The darkness calls. I try to run, but I must answer`,
    `New shoes!`,
    `My kids are driving me nuts #parenthood`,
    `Come to my housewarming party this Friday`,
    `They're watching me oh god they're always watching me help help help h`,
    `Thinking about what color I should paint my nails...`,
    `Art commissions open--hit me up!`,
    `"Whatchu know about rollin down in the deep?" - Masked Wolf, Astronaut in the Ocean`,
    `New season of Demon Slayer goes hard`,
    `I really relate to the main character in "I Have No Mouth and I Must Scream". I, too, have no mouth and must scream.`,
    `New account! My old one got deleted :(`,
    `ChatGPT just told me I would die alone when I asked how to get a girlfriend, what's up with that? LOL`,
    `Hell is real and I live in it`,
    `My mom rules!`,
    `I made a new tiktok; check it out!`,
    `This morning, my reflection in the mirror moved on its own and asked me if I ever thought about mortality.`,
    `Looking for a good brownie recipe, if anyone has one...`
]

const possibleReactions = [
    `Too long; didn't read`,
    `I was thinking the EXACT same thing`,
    `Woah, no need to get political!`,
    `I definitely disagree`,
    `Hi, wanna be friends?`,
    `You're so brave for posting this`,
    `What does this even mean?`,
    `Okay cool I guess...?`,
    `I love this!`,
    `This made me laugh`,
    `Great post! Love, Grandma`,
    `OMG, I thought you died last year! What's up?`,
    `Mood`,
    `Think before posting next time`,
    `How did you end up in my friends list?`,
    `My dad used to say this all the time`,
    `LOL`
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsers = (int) => {
    let friends = [];
    for (let i = 0; i < int; i++){
        friends.push(getRandomArrItem(usernames));
    };
    return friends;
};

const getUsers = () => {
    let users = [];
    for (let i = 0; i < usernames.length; i++){
        users.push({
            username: usernames[i],
            email: emails[i],
            friends: [...getRandomUsers(10)]
        });
    };
    return users;
};

const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++){
        results.push({
            thoughtText: getRandomArrItem(possibleThoughts),
            username: getRandomArrItem(usernames),
            reactions: [...getRandomReact(3)]
        })
    }; 
    return results;
};

const getRandomReact = (int) => {
    if (int === 1){
        return getRandomArrItem(possibleReactions);
    }
    let results = [];
    for (let i = 0; i < int; i++){
        results.push({
            reactionBody: getRandomArrItem(possibleReactions),
            username: getRandomArrItem(usernames)
        });
    };
    return results;
};

module.exports = { getUsers, getRandomThoughts }