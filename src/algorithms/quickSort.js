import { CTR1, CTR2, CTR3, CTR4, CTR5 } from "../3/Sorting";

export const quickSort = (array) => {
	if (array.length <= 1) {
		return [];
	}
	const animations = [];

	quickSortHelper(array, 0, array.length - 1, animations);
	return animations;
};

const quickSortHelper = (array, l, r, animations) => {
	if (l >= r) {
		return;
	}

	const partitionIndex = partition(array, l, r, animations);

	quickSortHelper(array, l, partitionIndex - 1, animations);
	quickSortHelper(array, partitionIndex + 1, r, animations);
};

const partition = (array, l, r, animations) => {
	let i = l - 1;
	const pivot = array[r];

	for (let j = l; j <= r; j++) {
		animations.push([j, r, array[j], array[r], CTR1]); // Compare b/w array[j] & array[r]
		if (array[j] < pivot) {
			animations.push([j, r, array[j], array[r], CTR2]);
			i++;
			animations.push([i, j, array[i], array[j], CTR5]);
			animations.push([i, j, array[i], array[j], CTR4]); // Show the initial color
			let tmp = array[j];
			array[j] = array[i];
			array[i] = tmp;
		} else {
			animations.push([j, r, array[j], array[r], CTR3]);
		}
		animations.push([j, r, array[j], array[r], CTR4]); // Show the initial color
	}
	i++;
	animations.push([i, r, array[i], array[r], CTR5]);
	animations.push([i, r, array[i], array[r], CTR4]); // Finally show the initial color
	let tmp = array[i];
	array[i] = array[r];
	array[r] = tmp;

	return i;
};
