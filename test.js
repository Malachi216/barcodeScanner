const { findAllPackage, removePackage, updatePackage, findPackagesLocation } = require("./database/db-func");



updatePackage('A', 'B', 'C1', 'D11')
     .then(() => {
         findPackagesLocation('D11')
             .then(documents => {
             console.log(documents)
             })
     })
