import React from "react";
import styles from "./index.module.css";

interface Props {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatForm: React.FC<Props> = ({ onSubmit, value, onChange }) => {
	return (
		<form onSubmit={onSubmit} className={styles["container"]}>
			<input type="text" value={value} onChange={onChange} />
			<button type="submit">Send</button>
		</form>
	);
};

export default ChatForm;
