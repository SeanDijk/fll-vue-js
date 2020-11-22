import {log} from "@/main";
import {db} from "@/services/database";

export default {
    async saveScoresheet(name, totalScore, challengeJson) {
        log.debug(`Saving score. Name: ${name}, Total score: ${totalScore}, json: `, challengeJson);
        return  db.scores(db.READ_WRITE, (store) => {
            return store.put({
                name: name,
                totalScore: totalScore,
                challenge: challengeJson,
                savedAt: Date.now()
            })
        });
    },

    async getScoresheets(challengeId){
        console.log(log)
        if(challengeId)
            log.debug('Retrieving saved scoresheets for challengeId', challengeId)
        else
            log.debug('Retrieving all saved scoresheets')

        return db.scores(db.READ_ONLY, (store) => {
            return store.index("challengeId")
                        .getAll(challengeId)
        })
    }
}