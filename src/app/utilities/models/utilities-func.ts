export const isEmpty = (obj: Object): boolean => {
    if (obj && Object.keys(obj).length === 0) return true;
    else return false
}