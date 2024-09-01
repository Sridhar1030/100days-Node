// db.js
let games = [
	{ id: "1", title: "Call of Duty", platform: ["Switch", "PS5"] },
	{ id: "2", title: "FIFA", platform: ["Switch", "Android"] },
	{ id: "3", title: "GTA", platform: ["Switch", "PS5", "Android"] },
	{ id: "4", title: "PUBG", platform: ["Switch", "PS5", "Android"] },
	{ id: "5", title: "Valorant", platform: ["Switch", "PS5", "Android"] },
	{ id: "6", title: "Fortnite", platform: ["Switch", "PS5", "Android"] },
	{ id: "7", title: "Apex Legends", platform: ["Switch", "PS5", "Android"] },
	{ id: "8", title: "Minecraft", platform: ["Switch", "PS5", "Android"] },
	{ id: "9", title: "Among Us", platform: ["Switch", "PS5", "Android"] },
	{ id: "10", title: "Cyberpunk", platform: ["Switch", "PS5", "Android"] },
];

let authors = [
	{ id: "1", name: "Sridhar", verified: true },
	{ id: "2", name: "Jane Doe", verified: true },
	{ id: "3", name: "XYZ", verified: false },
	{ id: "4", name: "Jane Doe", verified: true },
	{ id: "5", name: "John Doe", verified: true },
];

let reviews = [
	{
		id: "1",
		rating: 5,
		content: "Awesome Game",
		author_id: "1",
		game_id: "1",
	},
	{ id: "2", rating: 4, content: "Good Game", author_id: "2", game_id: "2" },
	{
		id: "3",
		rating: 3,
		content: "Average Game",
		author_id: "2",
		game_id: "3",
	},
	{ id: "4", rating: 2, content: "Bad Game", author_id: "4", game_id: "4" },
	{ id: "5", rating: 1, content: "Worst Game", author_id: "5", game_id: "5" },
];

export default { games, authors, reviews };
