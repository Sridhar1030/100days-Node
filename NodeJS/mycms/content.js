let contents = [
	{ id: 1, title: "First Content", body: "This is the first content." },
	{ id: 2, title: "Second Content", body: "This is the second content." },
];

const createContent = (data) => {
	const newContent = { id: contents.length + 1, ...data };
	contents.push(newContent);
	return newContent;
};

const updateContent = (id, data) => {
	const contentIndex = contents.findIndex((content) => content.id == id);
	if (contentIndex !== -1) {
		contents[contentIndex] = { id: Number(id), ...data };
		return contents[contentIndex];
	}
	return null;
};

const deleteContent = (id) => {
	const initialLength = contents.length;
	contents = contents.filter((content) => content.id != id);
	return contents.length < initialLength;
};

module.exports = { contents, createContent, updateContent, deleteContent };
