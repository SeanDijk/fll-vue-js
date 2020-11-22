export default {
    createBlank() {
        return {
            name: {},
            logo: {},
            missions: []
        }
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
