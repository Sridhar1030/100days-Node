import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./user.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const users = [
	{ id: 1, name: "John Doe" },
	{ id: 2, name: "Jane Smith" },
];

function getUser(call, callback) {
	const user = users.find((u) => u.id === call.request.id);
	if (!user) {
		return callback({
			code: grpc.status.NOT_FOUND,
			details: "User not found",
		});
	}
	callback(null, user);
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { GetUser: getUser });
server.bindAsync(
	"127.0.0.1:50051",
	grpc.ServerCredentials.createInsecure(),
	() => {
		console.log("User gRPC Server running at http://127.0.0.1:50051");
		server.start();
	}
);
