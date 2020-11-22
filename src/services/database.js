import {openDB} from 'idb';
import {log} from "@/main";

const instance = openDB('FLL_SCORE_APP', 1, {
    upgrade(localDb, oldVersion, newVersion) {
        log.debug(`IDB oldVersion: ${oldVersion}, newVersion: ${newVersion}`)
        // Scores
        localDb.createObjectStore('scores', {autoIncrement: true})
            .createIndex('challengeId', 'challenge.id', {unique: false})

    }


});

const READ_WRITE = 'readwrite';
const READ_ONLY = 'readonly';

export const db = {
    READ_WRITE: READ_WRITE,
    READ_ONLY: READ_ONLY,
    inst: instance,

    scores: (type, lamda) => {
        return instance.then(x => {
            let tx = x.transaction("scores", type)
            let store = tx.objectStore("scores")
            let result = lamda(store)

            if (type === READ_WRITE) {
                return tx.complete;
            } else {
                return result;
            }
        })
    }


}

