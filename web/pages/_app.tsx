import { SocketProvider } from "../src/context/SocketProvider";
import { UserProvider } from "../src/context/UserProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<SocketProvider url="http://localhost:5000">
				<Component {...pageProps} />
			</SocketProvider>
		</UserProvider>
	);
}

export default MyApp;
