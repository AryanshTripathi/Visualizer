import { CTR1, CTR2, CTR3, CTR4, CTR5 } from "../3/Sorting";

export const bubbleSort = (arr) => {
	if (arr.length <= 1) {
		return [];
	}
	const animations = [];

	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			animations.push([i, j, arr[i], arr[j], CTR1]); // Chose 2 elements to compare
			if (arr[i] > arr[j]) {
				animations.push([i, j, arr[i], arr[j], CTR2]); // If swap needed ==> color -> red
				animations.push([i, j, arr[i], arr[j], CTR5]); // Swap the elements then show color -> green
				let tmp = arr[i];
				arr[i] = arr[j];
				arr[j] = tmp;
			} else {
				animations.push([i, j, arr[i], arr[j], CTR3]); // If no swap is needed ==> color -> green
			}
			animations.push([i, j, arr[i], arr[j], CTR4]); // Finally show the initial color
		}
	}

	return animations;
};
