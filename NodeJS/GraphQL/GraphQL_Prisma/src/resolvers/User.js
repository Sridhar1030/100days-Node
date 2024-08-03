// src/resolvers/User.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resolvers = {
	Query: {
		users: async () => await prisma.user.findMany(),
		user: async (parent, args) =>
			await prisma.user.findUnique({ where: { id: args.id } }),
	},
	Mutation: {
		createUser: async (parent, args) =>
			await prisma.user.create({
				data: { email: args.email, name: args.name },
			}),
		updateUser: async (parent, args) =>
			await prisma.user.update({
				where: { id: args.id },
				data: { email: args.email, name: args.name },
			}),
		deleteUser: async (parent, args) =>
			await prisma.user.delete({ where: { id: args.id } }),
	},
};

export default resolvers;
