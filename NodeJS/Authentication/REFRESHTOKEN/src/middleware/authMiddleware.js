import pkg from 'jsonwebtoken';

const { verify } = pkg;

const authenticateToken = (req, res, next) => {
	const token = req.headers['authorization'];

	if (!token) {
		return res.sendStatus(401);
	}

	verify(token, 'youraccesstokensecrethere', (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
};

export default authenticateToken;
