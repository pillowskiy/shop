export const isEquals = (firstObj: object, secondObj: object) => {
    return JSON.stringify(firstObj) === JSON.stringify(secondObj);
}