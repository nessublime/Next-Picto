import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../../../../shared/models/user.model";
import styles from "./index.module.css";

interface Props {
	user: UserData;
	joinedRoomId: string;
	error: boolean;
	handleUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleJoinedRoomId: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onCreate: (event: React.FormEvent<HTMLFormElement>) => void;
	onJoin: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RoomSelect: React.FC<Props> = ({
	error,
	handleUsername,
	handleJoinedRoomId,
	onCreate,
	onJoin,
	user,
	joinedRoomId,
}) => {
	const [isJoining, setIsJoining] = useState<boolean>(false);

	const usernameError = () => {
		return !!user.username;
	};

	return (
		<>
			<div className={styles["box-container"]}>
				<div className={styles["select-button__container"]}>
					<button
						className={`${!isJoining && styles["active"]}`}
						onClick={() => setIsJoining(false)}
					>
						Create
					</button>
					<button
						className={`${isJoining && styles["active"]}`}
						onClick={() => setIsJoining(true)}
					>
						Join
					</button>
				</div>
				<form onSubmit={isJoining ? onJoin : onCreate}>
					<label>Enter username:</label>
					<input
						type="text"
						value={user.username}
						onChange={handleUsername}
						className={usernameError() ? "" : styles["error"]}
					></input>
					{isJoining && (
						<>
							<label>Enter room code:</label>
							<input
								autoFocus={true}
								type="text"
								value={joinedRoomId}
								onChange={handleJoinedRoomId}
							></input>
						</>
					)}
					<button
						type="submit"
						disabled={!user.username}
						className={styles["main-button"]}
					>
						{isJoining ? "Join Room" : "Create Room"}
					</button>
				</form>
			</div>
			{error && <p>Error creating game</p>}
		</>
	);
};

export default RoomSelect;
