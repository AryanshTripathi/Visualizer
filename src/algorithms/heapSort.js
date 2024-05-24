import { CTR1, CTR2, CTR3, CTR4, CTR5 } from "../3/Sorting";

export const heapSort = (array) => {
	if (array.length <= 1) {
		return [];
	}
	const animations = [];
	let N = array.length;

	for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
		heapify(array, N, i, animations);
	}

	// One by one extract an element from heap
	for (let i = N - 1; i > 0; i--) {
		// Move current root to end
		animations.push([i, 0, array[i], array[0], CTR1]); // Select 2 elements
		animations.push([i, 0, array[i], array[0], CTR5]); // Swap 2 elements
		animations.push([i, 0, array[i], array[0], CTR4]); // Show initial color
		let temp = array[0];
		array[0] = array[i];
		array[i] = temp;

		// call max heapify on the reduced heap
		heapify(array, i, 0, animations);
	}

	return animations;
};

// To heapify a subtree rooted with node i which is
// an index in array[]. n is size of heap
const heapify = (array, N, i, animations) => {
	let largest = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;

	if (l < N && array[l] > array[largest]) {
		largest = l;
		animations.push([l, largest, array[l], array[largest], CTR1]); // Select 2 elements
		if (array[l] > array[largest]) {
			animations.push([l, largest, array[l], array[largest], CTR2]); // Show red color
		} else {
			animations.push([l, largest, array[l], array[largest], CTR3]); // Show green color
		}
		animations.push([l, largest, array[l], array[largest], CTR4]); // Show initial color
	}

	if (r < N && array[r] > array[largest]) {
		largest = r;
		animations.push([r, largest, array[r], array[largest], CTR1]); // Select 2 elements
		if (array[r] > array[largest]) {
			animations.push([r, largest, array[r], array[largest], CTR2]); // Show red color
		} else {
			animations.push([r, largest, array[r], array[largest], CTR3]); // Show green color
		}
		animations.push([r, largest, array[r], array[largest], CTR4]); // Show initial color
	}

	if (largest != i) {
		animations.push([i, largest, array[i], array[largest], CTR1]); // Select 2 elements
		animations.push([i, largest, array[i], array[largest], CTR5]); // Swap 2 elements
		animations.push([i, largest, array[i], array[largest], CTR4]); // Show initial color
		let swap = array[i];
		array[i] = array[largest];
		array[largest] = swap;

		heapify(array, N, largest, animations);
	}
};
