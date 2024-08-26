// handlers.js
const accountState = {};

const handlers = {
	AccountCreated: (event) => {
		accountState[event.data.accountId] = {
			balance: 0,
			...event.data,
		};
	},
	MoneyDeposited: (event) => {
		const account = accountState[event.data.accountId];
		if (account) {
			account.balance += event.data.amount;
		}
	},
	MoneyWithdrawn: (event) => {
		const account = accountState[event.data.accountId];
		if (account) {
			account.balance -= event.data.amount;
		}
	},
};

const handleEvent = (event) => {
	const handler = handlers[event.type];
	if (handler) {
		handler(event);
	}
};

const getAccountState = (accountId) => {
	return accountState[accountId];
};

module.exports = {
	handleEvent,
	getAccountState,
};
