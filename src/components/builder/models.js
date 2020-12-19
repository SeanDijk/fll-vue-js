import {v4 as uuidv4} from 'uuid';

export class Wrapper {
    constructor(data) {
        this.data = data
        this.id = uuidv4()
    }

    toJSON(){
        if (typeof this.data.toJSON === "function") {
            return this.data.toJSON()
        }
        return this.data;
    }
}
