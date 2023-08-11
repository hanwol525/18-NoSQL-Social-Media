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
];

const getUsers = () => {
    let users = [];
    for (let i = 0; i < usernames.length; i++){
        users.push({
            username: usernames[i],
            email: emails[i],
            friends: [],
            thoughts: []
        });
    };
    return users;
};

module.exports = { getUsers }