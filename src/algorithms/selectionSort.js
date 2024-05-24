import { CTR1, CTR2, CTR3, CTR4, CTR5 } from "../3/Sorting";

export const selectionSort = (arr) => {
	if (arr.length <= 1) {
		return [];
	}
	const animations = [];

	for (let i = 0; i < arr.length; i++) {
		let k = i;
		for (let j = i + 1; j < arr.length; j++) {
			animations.push([i, j, arr[i], arr[j], CTR1]); // Chose 2 elements to compare
			if (arr[j] < arr[k]) {
				animations.push([i, j, arr[i], arr[j], CTR2]); // If current element is smaller ==> color -> red
				animations.push([i, j, arr[i], arr[j], CTR4]); // Show the initial color
				k = j;
			} else {
				animations.push([i, j, arr[i], arr[j], CTR3]); // Else ==> color -> GREEN
				animations.push([i, j, arr[i], arr[j], CTR4]); // Show the initial color
			}
		}
		animations.push([i, k, arr[i], arr[k], CTR5]); // Swap the elements
		let tmp = arr[k];
		arr[k] = arr[i];
		arr[i] = tmp;
		animations.push([i, k, arr[i], arr[k], CTR4]); // Show the initial color
	}

	return animations;
};
