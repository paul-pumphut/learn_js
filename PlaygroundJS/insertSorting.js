console.log('=== Insert Sorting ===');

function insertSorting(arr) {
	for (let i = 1; i < arr.length; i++) {
		for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--)
			[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
	}
}

const arr = [1, 4, 5, 6, 18, 3, 99, 7, 5, 33, 41, 5, 4, 3, 2, 1];
insertSorting(arr);
console.log(arr);