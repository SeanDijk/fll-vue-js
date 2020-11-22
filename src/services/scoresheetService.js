import {log} from "@/main";
import {db} from "@/services/database";

export default {
    async saveScoresheet(name, totalScore, challengeJson) {
        log.debug(`Saving score. Name: ${name}, Total score: ${totalScore}, json: `, challengeJson);
        return db.scores(db.READ_WRITE, (store) => {
            return store.put({
                name: name,
                totalScore: totalScore,
                challenge: challengeJson,
                savedAt: Date.now()
            })
        });
    },

    async getAllScoresheets() {
        log.debug('Retrieving all saved scoresheets')

        return db.scores(db.READ_ONLY, async (store) => {
            let cursor = await store.openCursor();
            let results = [];
            while (cursor) {
                let value = cursor.value;
                value.id = cursor.key;
                results.push(value);
                cursor = await cursor.continue();
            }
            return results;
        })
    },

    async deleteScoresheet(scoresheets) {
        return Promise.all(scoresheets.map(scoresheet => {
            if (!scoresheet.id) {
                log.error("Can't remove: No id found for scoresheet", scoresheet)
            } else {
                db.scores(db.READ_WRITE, (store) => {
                    return store.delete(scoresheet.id)
                });
            }
        }))
    }
}