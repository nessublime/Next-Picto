import { ServerUserData } from "../../../shared/models/user.model";

export default class UserService {
	private static users: ServerUserData[] = [];

	public static saveUser(data: ServerUserData) {
		return new Promise<ServerUserData>((resolve, reject) => {
			if (this.users.findIndex((user) => user.userId === data.userId) !== -1) {
				reject(new Error(`User with id: ${data.userId} already registered`));
				return;
			}

			if (
				this.users.findIndex((user) => user.socketId === data.socketId) !== -1
			) {
				reject(
					new Error(`Socket with id: ${data.socketId} already registered`)
				);
				return;
			}

			this.users.push(data);
			resolve(data);
		});
	}

	public static removeUserBySocketId(socketId: string) {
		return new Promise<ServerUserData>((resolve, reject) => {
			const index = this.users.findIndex((user) => user.socketId === socketId);
			if (index === -1) {
				reject(new Error(`Socket with id: ${socketId} not found`));
				return;
			}

			const user = this.users.splice(index, 1);
			resolve(user[0]);
		});
	}
}
