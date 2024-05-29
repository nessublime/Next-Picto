export interface ChatData {
	text: string;
}

export interface ClientChatData extends ChatData {
	isMine: boolean;
}
