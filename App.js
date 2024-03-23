//components and screens
import Main from "./screens/MainComponent";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingComponent from "./components/LoadingComponent";

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<LoadingComponent />} persistor={persistor}>
				<NavigationContainer>
					<Main />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
