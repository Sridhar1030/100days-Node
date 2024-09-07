const items = [];

const resolvers = {
  Query: {
    getItems: () => items,
  },
  Mutation: {
    addItem: (_, { name, description }) => {
      const item = { id: items.length + 1, name, description };
      items.push(item);
      return item;
    },
  },
};

export default resolvers;
