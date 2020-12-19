export class ImageWrapper {
    constructor(path, src, description) {
        this.path = path
        this.src = src
        this.description = description
    }

    toJSON(){
        return {
            path: this.path,
            description: this.description
        };
    }

}