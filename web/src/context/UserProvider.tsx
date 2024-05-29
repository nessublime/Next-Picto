import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { UserData } from "../../../shared/models/user.model";
import { v4 } from "uuid";

interface IUserContext {
	user: UserData;
	setUser: React.Dispatch<React.SetStateAction<UserData>>;
	saveUserData: () => void;
}

const initialValues: UserData = {
	username: "",
	userId: v4(),
};

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<UserData>();
	const router = useRouter();

	useEffect(() => {
		let userData: UserData;

		try {
			userData = JSON.parse(localStorage.getItem("userData"));
			console.log(userData);
			if (!userData) {
				setUser(initialValues);
				router.push("/");
				return;
			}
			setUser(userData);
		} catch (error) {
			console.error(error);
			setUser(initialValues);
		}
	}, []);

	const saveUserData = () => {
		localStorage.setItem("userData", JSON.stringify(user));
	};

	return (
		<UserContext.Provider value={{ user, setUser, saveUserData }}>
			{user && children}
		</UserContext.Provider>
	);
};
