import {v4 as uuidv4} from 'uuid';

export class Wrapper {
    constructor(data) {
        this.data = data
        this.id = uuidv4()
    }

    toJSON(){
        return this.data;
    }
}

export class Mission {

    constructor(id, name) {
        this.id = id
        this.name = name
        this.missionParts = []
    }
}

export class MissionPart {

    constructor(type) {
        this.type = type
    }
}

//
// export class LocalizedString {
//
//     constructor() {
//         this.dictionary =
//     }
// }