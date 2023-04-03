import { SWAP_DIRECTIONS } from '../constants/move-directions';

export const findIndexByKey = <T, U extends keyof T>(
  array: Array<T>,
  key: U,
  value: T[U]
) => array.findIndex((item) => item[key] === value);

export const swap = <T>(array: Array<T>, index: number, direction: keyof typeof SWAP_DIRECTIONS) => {
    if (direction === SWAP_DIRECTIONS.LEFT || direction === SWAP_DIRECTIONS.UP) {
        if (index === 0) return array;
        [array[index], array[index - 1]] = [array[index - 1], array[index]];
    } else if (direction === SWAP_DIRECTIONS.RIGHT || direction === SWAP_DIRECTIONS.DOWN) {
        if (index === array.length - 1) return array;
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
    }
    return array;
}