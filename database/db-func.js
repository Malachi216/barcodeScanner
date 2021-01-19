require('@babel/polyfill');

const { async } = require('rxjs');
const Database = require('./db');
// let db;

function randomint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// exports.init = async () => {
//     let db = await Database.get();
// }
// this.init();

exports.updatePackage = async (colA, colB, colC, location) => {
    return new Promise(async (resolve, reject) => {

        let db = await Database.get();
        let result = await db.test.findOne({
            selector: {
                colA,
                colB,
                colC,
                location,
            }
        }).exec();
        if (!result) {
            console.log("result = ")
            let resp = await db.test.updateDB(colA, colB, colC, location);
            resolve(resp.toJSON())
        }
        else {
            if (result.location !== location) {
                result.location = location;
                result.save()
            }
            resolve(result.toJSON());
        }

    })


}

exports.removePackage = async (colA, colB, colC) => {
    return new Promise(async (resolve, reject) => {
        let db = await Database.get();
        let result = await db.test.findOne({
            selector: {
                colA,
                colB,
                colC
            }
        }).exec();
        if (!result) {
            resolve({ message: "Not existing" })
        } else {
            result.remove();
            resolve({ message: "success" })

        }
    })

}

exports.findAllPackage = async () => {
    return new Promise(async (resolve, reject) => {
        let output = [];
        let db = await Database.get();
        let docs = await db.test.find().exec();
        if (docs.length !== 0) {
            docs.forEach(x => {
                output.push(x.toJSON());
            });
        }

        resolve(output);
    })

}