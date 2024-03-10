import { useState } from "react";
import { View, Platform } from "react-native";
import Constants from "expo-constants";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";

const Drawer = createDrawerNavigator();

const screenOptions = {
	headerStyle: {
		backgroundColor: "#5637DD",
	},
	headerTintColor: "#fff",
};
const HomeNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ title: "Home" }}
			></Stack.Screen>
		</Stack.Navigator>
	);
};
//about navigator
const AboutNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="About Us"
				component={AboutScreen}
				options={{ title: "About" }}
			></Stack.Screen>
		</Stack.Navigator>
	);
};
//contact Navigator
const ContactNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Contact"
				component={ContactScreen}
				options={{ title: "Contact" }}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

const DirectoryNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
			<Stack.Screen
				name="Directory"
				component={DirectoryScreen}
				options={{ title: "Campsite Directory" }}
			/>

			<Stack.Screen
				name="CampsiteInfo"
				component={CampsiteInfoScreen}
				options={({ route }) => ({
					title: route.params.campsite.name,
				})}
			/>
		</Stack.Navigator>
	);
};

const Main = () => {
	return (
		<View
			style={{
				flex: 1,
				paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
			}}
		>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerStyle={{ backgroundColor: "#CEC8FF" }}
			>
				<Drawer.Screen
					name="HomeScreen"
					component={HomeNavigator}
					options={{ title: "Home" }}
				/>
				<Drawer.Screen
					name="DirectoryScreen"
					component={DirectoryNavigator}
					options={{ title: "Directory" }}
				/>
				<Drawer.Screen
					name="AboutScreen"
					component={AboutNavigator}
					options={{ title: "About" }}
				/>
				<Drawer.Screen
					name="ContactScreen"
					component={ContactNavigator}
					options={{ title: "Contact" }}
				/>
			</Drawer.Navigator>
		</View>
	);
};

export default Main;
