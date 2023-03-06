const tree = {
	data: 1,
	refs: [
		{
			data: 5,
			refs: [{ data: 10 }, {
				data: 7,
				refs: [{ data: 9 }, { data: 8 }]
			}, { data: 6 }]
		},
		{
			data: 2,
			refs: [{ data: 4 }, { data: 3 }]
		}
	]
};

function traverse(tree) {
	const path = [tree];
	let curr;
	while (curr = path.pop()) {
		console.log(curr.data);
		if (curr.refs) {
			for (let r of curr.refs)
				path.push(r);
		}
	}
}

traverse(tree);