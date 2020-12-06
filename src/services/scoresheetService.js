import {db} from "@/services/database";
import Vue from "vue";

let getWhere = async function(cursor, predicate) {

    let results = [];
    while (cursor) {
        let value = cursor.value;
        value.id = cursor.key;
        if (predicate(cursor.key, value)) {
            results.push(value);
        }
        cursor = await cursor.continue();
    }
    return results;
}


export default {
    async saveScoresheet(name, totalScore, challengeJson) {
        Vue.$log.debug(`Saving score. Name: ${name}, Total score: ${totalScore}, json: `, challengeJson);
        return db.scores(db.READ_WRITE, (store) => {
            return store.put({
                name: name,
                totalScore: totalScore,
                challenge: challengeJson,
                savedAt: Date.now()
            })
        });
    },

    /**
     * Get all score sheets and add the id as field
     * @returns {Promise containing the scoresheets.}
     */
    async getAllScoresheets() {
        Vue.$log.debug('Retrieving all saved scoresheets')

        return db.scores(db.READ_ONLY, async (store) => {
            let cursor = await store.openCursor();
            return getWhere(cursor, () => true)
        })
    },

    async getScoresheetById(id) {
        Vue.$log.debug('Retrieving scoresheets for id', id)

        return db.scores(db.READ_ONLY, async (store) => {
            let cursor = await store.openCursor();
            return getWhere(cursor, (key) => {
                return key === Number(id)
            })
        }).then(value => value[0])
    },

    async deleteScoresheetForIds(ids) {
        return Promise.all(ids.map(id => {
            db.scores(db.READ_WRITE, (store) => {
                return store.delete(Number(id))
            });
        }))
    },

}