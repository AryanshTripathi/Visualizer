import { CTR1, CTR2, CTR4, CTR6 } from "../3/Sorting";

export const insertionSort = (array) => {
	if (array.length <= 1) {
		return [];
	}
	const animations = [];

	for (let i = 1; i < array.length; i++) {
		const key = array[i];
		let j = i - 1;

		animations.push([i, j, array[i], array[j], CTR1]); // Chose 2 elements to compare
		while (j >= 0 && array[j] > key) {
			animations.push([i, j, key, array[j], CTR2]); // If current element is smaller ==> color -> red
			animations.push([i, j, key, array[j], CTR4]); // Show the initial color
			animations.push([j + 1, j, array[j + 1], array[j], CTR6]); // Copy second element to first
			animations.push([j + 1, j, array[j + 1], array[j], CTR4]); // Show the initial color
			array[j + 1] = array[j];
			j--;
		}
		animations.push([j + 1, i, array[j + 1], key, CTR6]); // Copy second element to first
		animations.push([j + 1, i, array[j + 1], key, CTR4]); // Show the initial color
		array[j + 1] = key;
	}

	return animations;
};
