export function removeIf(list, predicate){
    let toDelete = list.filter(predicate);

    toDelete.forEach(value => {
        list.splice(list.indexOf(value), 1)
    })
}
