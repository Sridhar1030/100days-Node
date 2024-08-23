import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./user.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService(
	"127.0.0.1:50051",
	grpc.credentials.createInsecure()
);

client.GetUser({ id: 1 }, (error, response) => {
	if (error) {
		console.error(error);
	} else {
		console.log("User:", response);
	}
});
