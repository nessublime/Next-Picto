import { ClientUserData } from "./user.model";

export interface SocketData<T> {
	userData: ClientUserData;
	msgData: T;
}
