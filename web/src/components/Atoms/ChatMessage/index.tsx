import React from "react";
import { ClientChatData } from "../../../../../shared/models/chat.model";
import { SocketData } from "../../../../../shared/models/socket.model";
import styles from "./index.module.css";

interface Props {
	message: SocketData<ClientChatData>;
}
const ChatMessage: React.FC<Props> = ({ message }) => {
	return (
		<li
			className={`${styles["message"]}
				${message.msgData.isMine ? styles["my-message"] : styles["other-message"]}`}
		>
			<div>
				<strong>{message.userData.username}:</strong>
				<p>{message.msgData.text}</p>
			</div>
		</li>
	);
};

export default ChatMessage;
