export function groupBy(collection, keyFunction) {
    return collection.reduce((r, v, i, a, k = keyFunction(v)) => ((r[k] || (r[k] = [])).push(v), r), {})
}