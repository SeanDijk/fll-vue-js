//todo retrieve either out of assets or uploaded cache

export function getImageSrc(fromAssets, challengeId, path){
    if(fromAssets) {
        if (path)
            return require(`@/assets/challenges/${challengeId}/${path}`)
    } else {
        return ''
    }
}