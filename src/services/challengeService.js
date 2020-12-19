import {ChallengeModel} from "@/models/ChallengeModel";
import {ImageWrapper} from "@/models/ImageWrapper";

export default {
    createBlank() {
        return new ChallengeModel()
    },
    createFrom(challengeJson){
        let clone = JSON.parse(JSON.stringify(challengeJson))
        let challenge = new ChallengeModel()
        challenge.id = clone.id
        challenge.name = clone.name
        challenge.logo = new ImageWrapper(clone.logo.path, undefined, clone.logo.path.description)
        challenge.missions = clone.missions
        return challenge
    },

    getAll() {
        let ctx = require.context('@/assets/challenges/', true, /\.json$/);
        return ctx.keys()
            .map(key => {
                let data = ctx(key)
                data.id = key.split('/')[1]
                return data
            })
    },
    save() {

    },
    submit() {

    }
}
