import squirrelGeoData from '../resources/data/squirrels.json';
const geoDataKeys = ["territory", "favorite_spot", "nests"];


let squirrelStories = {
    "Charlotte": {
        "sex": "female",
        "icon": require("../resources/images/charlotte_1.jpg"),
        "dob": "2010 - Present",
        "description": "Charlotte is a really great squirrel. She was the first squirrel to approach the Squirrels of IU, and is kind of a big deal around IU campus.",
        "interestingFact": "Charlotte has extra pointy claws.",
        "likes": ["Apples", "Cashews", "Singing in the rain"],
        "dislikes": ["Dogs", "Mouldy Acorns", "Sampson"],
        "family": [
            {"name": "Sampson", "relation": "Brother"}
        ]
    },

    "Sampson": {
        "sex": "male",
        "icon": require("../resources/images/sampson_1.jpg"),
        "dob": "2011 - Present",
        "description": "Sampson is a boy squirrel. He's one of the older squirrels on campus and an all-around grouch.",
        "interestingFact": "Sampson is a huge proponent of renewable energy.",
        "likes": ["Acorn Sushi", "Pink Floyd"],
        "dislikes": ["Potatoes", "Squirrels that don't put the toilet seat down after using the bathroom"],
        "family": [
            {"name": "Charlotte", "relation": "Sister"}
        ]
    }
}


// TODO: Validate the JSON data at some point.

for (let squirrel in squirrelStories) {
    for (let key in geoDataKeys) {
        squirrelStories[squirrel][key] = squirrelGeoData[squirrel][key];
    }
}


export default squirrelStories;
