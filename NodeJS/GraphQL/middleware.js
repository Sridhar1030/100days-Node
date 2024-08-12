// middleware.js
export const loggingMiddleware = async (resolve, root, args, context, info) => {
	console.log(`Request received for ${info.fieldName}`);
	return resolve(root, args, context, info);
};
