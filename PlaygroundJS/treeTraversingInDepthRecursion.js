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
	console.log(tree.data);
	if (!tree.refs) return;
	for (let i = tree.refs.length - 1; i >= 0; i--) {
		traverse(tree.refs[i]);
	}
}

traverse(tree);