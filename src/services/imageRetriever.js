import Vue from "vue";

function imageFromAssets(challengeId, filename){
    // If the path does not result in a file, catch the exception and return nothing
    try {
        return require(`@/assets/challenges/${challengeId}/${filename}`);
    } catch (e) {
        Vue.$log.debug("Can't find image. See stacktrace: ", e)
    }
}

export function getImageSrc(challengeId, imageWrapper) {
    if(imageWrapper.src) {
        return imageWrapper.src
    } else {
        // If no path is given, we have noting to look for.
        if (imageWrapper.path) {
            return imageFromAssets(challengeId, imageWrapper.path)
        }
    }
}