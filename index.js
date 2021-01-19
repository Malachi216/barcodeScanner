const { findAllPackage, removePackage, updatePackage } = require("./database/db-func");
// const spawn = require("child_process").spawn;
// // const pythonProcess = spawn('python3', ["usb/usb.py"]);
// const pythonProcess = spawn('python', ["usbar/usb_test.py"]);

// let slot1 = null;
// let slot2 = null;

// pythonProcess.stdout.on('data', async (data) => {
//     // console.log(data.toString());
//     let code = data.toString();
//     let splitPayload = code.split('*');
//     if (splitPayload.length === 3) {
//         console.log('Product\n');
//         if (slot1 == null) {
//             slot1 = splitPayload;
//             console.log('slot1: ', slot1)
//         }
//         else if (slot1 !== null && slot2 == null) {
//             slot2 = splitPayload;
//             console.log('slot2: ', slot2)

//             //remove if thesame;
//             if ((slot1[0] == slot2[0]) && (slot1[1] == slot2[1]) && (slot1[2] == slot2[2])) {
//                 removePackage(slot1[0], slot1[1], slot1[2]).then(x => { console.log('removed success: ', x) })
//                 slot1 = null;
//                 slot2 = null;
//             }
//             else {
//                 slot1 = slot2;
//                 slot2 = null;
//                 console.log('slot2: ', slot2)
//             }

//         }

//     }
//     else if (slot1 !== null && slot2 == null) {
//         console.log('Location');
//         slot2 = code;
//         console.log('Adding to DB, slot1: ', slot1, ' Slot2: ', slot2);
//         //add new or update;
//         updatePackage(slot1[0], slot1[1], slot1[2], slot2).then(x => console.log("Successfully added or upsetted: ", x));
//         slot1 = null;
//         slot2 = null;
//     }


// });


updatePackage('A', 'B', 'C1', 'D11').then(x => console.log(x))
    .then(() => {
        findAllPackage()
            .then(documents => {
                console.log(documents)
            })
            .then(() => {
                updatePackage('A1', 'B', 'C1', 'D1').then(x => console.log(x))
                    .then(() => {
                        removePackage('A1', 'B', 'C1', 'D1').then(x => console.log(x))
                    })
            })
    })
