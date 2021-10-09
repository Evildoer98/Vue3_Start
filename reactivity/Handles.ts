/**
 * 对象类型判断
 * @lineNumber 41
 */

function targetTypeMap (rawType: string) {
    switch (rawType) {
        case 'Object':
        case 'Array':
            return TargetType.COMMON
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return TargetType.COLLECTION
        default:
            return targetType.INVALID
    }
}
// 会在 new Proxy 的根据返回的 targetType 判断
const proxy = new Proxy(
    target,
    targetType === targetType.COLLECTION ? collectionHandlers : baseHandlers
)