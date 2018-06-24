import squirrelData from "../assets/squirrelData.json"
import images from '../assets/images/Images.js'

// Join the pictures into the data.
for (let squirrel in squirrelData) {
    squirrelData[squirrel]["pictures"] = images[squirrel];
    squirrelData[squirrel]["icon"] = images[squirrel][0];
}

export default squirrelData;
