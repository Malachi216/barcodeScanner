require('@babel/polyfill');
const {
    addRxPlugin,
    createRxDatabase
} = require('rxdb');

addRxPlugin(require('pouchdb-adapter-leveldb')); // leveldown adapters need the leveldb plugin to work
addRxPlugin(require('pouchdb-adapter-http'));
const leveldown = require('leveldown');


const Database = {};

const testSchema = {
    title: 'test schema',
    description: 'describes a simple test',
    version: 0,
    type: 'object',
    properties: {
        colA: {
            type: 'string',
        },
        colB: {
            type: 'string',
        },
        colC: {
            type: 'string',
        },
        location: {
            type: 'string',
            primary: true
        }
    },
    required: ['colA', 'colB', 'colC', 'location'],
    indexes: [
        'location',
        ['colA', 'colB', 'colC']
    ]
};
// const SYNC_URL = 'http://localhost:10102/';

const create = async () => {
    const database = await createRxDatabase({
        name: 'testdb',
        adapter: leveldown,
        multiInstance: true
    });
    await database.addCollections({

        test: {
            schema: testSchema,
            statics: {
                updateDB: async function (colA, colB, colC, location) {

                    return this.upsert({
                        colA, colB, colC, location
                    });
                },
                scream: async () => {
                    return 'AAAH!!';
                }
            }
        }
    });

    // database.collections.heroes.sync({
    //     remote: SYNC_URL + 'hero/'
    // });
    return database;
};


let createPromise = null;
Database.get = async () => {
    if (!createPromise) createPromise = create();
    return createPromise;
};



module.exports = Database;