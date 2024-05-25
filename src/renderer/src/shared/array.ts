/**
 * 把一维数组切割成二位数组
 * @param arr 
 * @param size 
 * @returns 
 */
export function chuankArray<T>(arr: T[], size: number) {
    if(arr.length === 0) return []
    
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}