import React from "react";
import { ClientChatData } from "../../../../../shared/models/chat.model";
import { SocketData } from "../../../../../shared/models/socket.model";
import ChatMessage from "../../Atoms/ChatMessage";
import styles from "./index.module.css";

interface Props {
	messageQueue: SocketData<ClientChatData>[];
	elementToFocus: React.MutableRefObject<HTMLDivElement>;
}

const ChatList: React.FC<Props> = ({ messageQueue, elementToFocus }) => {
	return (
		<ul className={styles["chat-list"]}>
			{messageQueue.map((m, index) => (
				<ChatMessage key={index} message={m} />
			))}
			{/* Empty div for autofocus */}
			<div ref={elementToFocus}></div>
		</ul>
	);
};

export default ChatList;
