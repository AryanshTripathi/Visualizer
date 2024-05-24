import { CTR1, CTR4, CTR6 } from "../3/Sorting";

export const mergeSort = (array) => {
	if (array.length <= 1) {
		return [];
	}

	const animations = [];
	const auxiliaryArray = array.slice();

	mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

	return animations;
};

const mergeSortHelper = (array, st, en, auxiliaryArray, animations) => {
	if (st == en) {
		return;
	}

	const mid = Math.floor((st + en) / 2);

	mergeSortHelper(auxiliaryArray, st, mid, array, animations);
	mergeSortHelper(auxiliaryArray, mid + 1, en, array, animations);
	merge(array, st, mid, en, auxiliaryArray, animations);
};

const merge = (mainArray, st, mid, en, auxiliaryArray, animations) => {
	let i = st,
		j = mid + 1,
		k = st;

	while (i <= mid && j <= en) {
		animations.push([i, j, auxiliaryArray[i], auxiliaryArray[j], CTR1]);
		animations.push([i, j, auxiliaryArray[i], auxiliaryArray[j], CTR4]);
		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			animations.push([k, i, auxiliaryArray[k], auxiliaryArray[i], CTR6]);
			animations.push([k, i, auxiliaryArray[k], auxiliaryArray[i], CTR4]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
			animations.push([k, j, auxiliaryArray[k], auxiliaryArray[j], CTR6]);
			animations.push([k, j, auxiliaryArray[k], auxiliaryArray[j], CTR4]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}

	while (i <= mid) {
		animations.push([i, i, auxiliaryArray[i], auxiliaryArray[i], CTR1]);
		animations.push([i, i, auxiliaryArray[i], auxiliaryArray[i], CTR4]);
		animations.push([k, i, auxiliaryArray[k], auxiliaryArray[i], CTR6]);
		animations.push([k, i, auxiliaryArray[k], auxiliaryArray[i], CTR4]);

		mainArray[k++] = auxiliaryArray[i++];
	}

	while (j <= en) {
		animations.push([j, j, auxiliaryArray[j], auxiliaryArray[j], CTR1]);
		animations.push([j, j, auxiliaryArray[j], auxiliaryArray[j], CTR4]);
		animations.push([k, j, auxiliaryArray[k], auxiliaryArray[j], CTR6]);
		animations.push([k, j, auxiliaryArray[k], auxiliaryArray[j], CTR4]);

		mainArray[k++] = auxiliaryArray[j++];
	}
};

/* MY OLD VISUALIZING APPROACH */

// export const mergeSort = (array) => {
// 	if (array.length <= 1) {
// 		return [];
// 	}

// 	const animations = [];
// 	const auxiliaryArray = array.slice();

// 	mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

// 	return animations;
// };

// const mergeSortHelper = (array, st, en, auxiliaryArray, animations) => {
// 	if (st == en) {
// 		return;
// 	}

// 	const mid = Math.floor((st + en) / 2);

// 	mergeSortHelper(auxiliaryArray, st, mid, array, animations);
// 	mergeSortHelper(auxiliaryArray, mid + 1, en, array, animations);
// 	merge(array, st, mid, en, auxiliaryArray, animations);
// };

// const merge = (mainArray, st, mid, en, auxiliaryArray, animations) => {
// 	let i = st,
// 		j = mid + 1,
// 		k = st;

// 	while (i <= mid && j <= en) {
// 		animations.push([i, j]);
// 		animations.push([i, j]);
// 		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
// 			animations.push([k, auxiliaryArray[i]]);
// 			mainArray[k++] = auxiliaryArray[i++];
// 		} else {
// 			animations.push([k, auxiliaryArray[j]]);
// 			mainArray[k++] = auxiliaryArray[j++];
// 		}
// 	}

// 	while (i <= mid) {
// 		animations.push([i, i]);
// 		animations.push([i, i]);
// 		animations.push([k, auxiliaryArray[i]]);

// 		mainArray[k++] = auxiliaryArray[i++];
// 	}

// 	while (j <= en) {
// 		animations.push([j, j]);
// 		animations.push([j, j]);
// 		animations.push([k, auxiliaryArray[j]]);

// 		mainArray[k++] = auxiliaryArray[j++];
// 	}
// };
