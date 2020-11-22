import {log} from "@/main";


export function getImageSrc(fromAssets, challengeId, path) {
    if (fromAssets) {
        // If no path is given, we have noting to look for.
        if (path) {
            // If the path does not result in a file, catch the exception and return nothing
            try {
                return require(`@/assets/challenges/${challengeId}/${path}`)
            } catch (e) {
                log.debug("Can't find image. See stacktrace: ", e)
            }
        }
    } else {
        //todo retrieve either out of assets or uploaded cache
        return ''
    }
}