export default {
    createBlank() {
        return {
            name: {},
            logo: {},
            missions: []
        }
    },
    getAll() {
        let ctx = require.context('../assets/challenges/', true, /\.json$/);
        return ctx.keys()
            .map(key => {
                let data = ctx(key)
                data.id = key.split('/')[1]
                return data
            })
    },
    save() {
        var db;
        var request = indexedDB.open("MyTestDatabase");
        request.onerror = function(event) {
            console.log("Why didn't you allow my web app to use IndexedDB?!", event);
        };
        request.onsuccess = function(event) {
            db = event.target.result;
            console.log(db)
        };


    },
    submit() {

    }
}
