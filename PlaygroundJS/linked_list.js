console.log('=== Linked List ===');

function printLinkedList(list) {
	do {
		console.log(list.value);
	}
	while (list = list.next)
}

function createLinkedListFromArray(arr) {
	let zeroNode = {};
	let curr = zeroNode;
	let prev = null;

	for (a of arr) {
		if (curr)
			curr.value = a;
		else
			curr = { value: a };
		if (prev)
			prev.next = curr;
		prev = curr;
		curr = null;
	}
	return zeroNode;
}

function reverseLinkedList(list) {
	let prev = null;
	do {
		if (!prev) {
			prev = list;
			list = list.next;
			delete prev.next;
		}
		else {
			let future = list.next;
			list.next = prev;
			prev = list;
			list = future;
		}
	}
	while (list)
	return prev;
}



const linkedList = createLinkedListFromArray([1, 2, 3, 4, 5, 6]);
// printLinkedList(linkedList);
const reversedLL = reverseLinkedList(linkedList);
printLinkedList(reversedLL);