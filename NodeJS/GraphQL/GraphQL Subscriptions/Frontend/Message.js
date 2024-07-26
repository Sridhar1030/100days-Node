import React from "react";
import { useSubscription, gql } from "@apollo/client";

const MESSAGE_SENT = gql`
	subscription OnMessageSent {
		messageSent {
			id
			content
		}
	}
`;

const Messages = () => {
	const { data, loading } = useSubscription(MESSAGE_SENT);

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h3>Messages:</h3>
			{data && <p>{data.messageSent.content}</p>}
		</div>
	);
};

export default Messages;
