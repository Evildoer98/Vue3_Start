export function reactive(target: object) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
        return target
    }
    return createReactiveObject (
        target,
        false,
        mutableHandlers,
        mutableCollectionHandlers,
        reactiveMap
    )
}
