import { useEffect } from "react";
import { View, Platform, Button, StyleSheet, Image, Text } from "react-native";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import ReservationScreen from "./ReservationScreen.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import {
	createDrawerNavigator,
	DrawerItemList,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import FavoritesScreen from "./FavoritesScreen.jsx";
import logo from "../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { fetchPartners } from "../features/partners/partnersSlice.js";
import { fetchCampsites } from "../features/campsites/campsiteSlice.js";
import { fetchPromotions } from "../features/promotions/promotionsSlice.js";
import { fetchComments } from "../features/comments/commentsSlice.js";

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
				options={({ navigation }) => ({
					title: "Home",
					headerLeft: () => (
						<Icon
							name="home"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
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
				name="About"
				component={AboutScreen}
				options={({ navigation }) => ({
					headerLeft: () => (
						<Icon
							name="info-circle"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
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
				options={({ navigation }) => ({
					title: "Contact Us",
					headerLeft: () => (
						<Icon
							name="address-card"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			></Stack.Screen>
		</Stack.Navigator>
	);
};
const ReservationNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="Reservatsion"
				component={ReservationScreen}
				options={({ navigation }) => ({
					title: "Reservation Search",
					headerLeft: () => (
						<Icon
							name="tree"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

const FavoritesNavigator = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name="FavoritesScreen"
				component={FavoritesScreen}
				options={({ navigation }) => ({
					title: "Favorites Screen",
					headerLeft: () => (
						<Icon
							name="heart"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
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
				options={({ navigation }) => ({
					title: "Campsite Directory",
					headerLeft: () => (
						<Icon
							name="list"
							type="font-awesome"
							iconStyle={styles.stackIcon}
							onPress={() => navigation.toggleDrawer()}
						/>
					),
				})}
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

const CustomDrawerContent = (props) => (
	<DrawerContentScrollView {...props}>
		<View style={styles.drawerHeader}>
			<View style={{ flex: 1 }}>
				<Image source={logo} style={styles.drawerImage} />
			</View>
			<View style={{ flex: 2 }}>
				<Text styles={styles.drawerHeaderText}>NuCamp</Text>
			</View>
		</View>
		<DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
	</DrawerContentScrollView>
);

const Main = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCampsites());
		dispatch(fetchPromotions());
		dispatch(fetchPartners());
		dispatch(fetchComments());
	}, [dispatch]);

	return (
		<View
			style={{
				flex: 1,
				paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
			}}
		>
			<Drawer.Navigator
				initialRouteName="Home"
				drawerContent={CustomDrawerContent}
				drawerStyle={{ backgroundColor: "#CEC8FF" }}
			>
				<Drawer.Screen
					name="HomeScreen"
					component={HomeNavigator}
					options={{
						title: "Home",
						drawerIcon: ({ color }) => (
							<Icon
								name="home"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="DirectoryScreen"
					component={DirectoryNavigator}
					options={{
						title: "Campsite Directory",
						drawerIcon: ({ color }) => (
							<Icon
								name="list"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="ReserveCampsite"
					component={ReservationNavigator}
					options={{
						title: "Reserve Campsite",
						drawerIcon: ({ color }) => (
							<Icon
								name="list"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="Favorited Campsites"
					component={FavoritesNavigator}
					options={{
						title: "My Favorites",
						drawerIcon: ({ color }) => (
							<Icon
								name="heart"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="AboutScreen"
					component={AboutNavigator}
					options={{
						title: "About",
						drawerIcon: ({ color }) => (
							<Icon
								name="info-circle"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
				<Drawer.Screen
					name="ContactScreen"
					component={ContactNavigator}
					options={{
						title: "Contact",
						drawerIcon: ({ color }) => (
							<Icon
								name="address-card"
								type="font-awesome"
								size={24}
								iconStyle={{ width: 24 }}
								color={color}
							/>
						),
					}}
				/>
			</Drawer.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	stackIcon: {
		marginLeft: 10,
		color: "#fff",
		fontSize: 24,
	},
	drawerHeader: {
		backgroundColor: "#5637DD",
		height: 140,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
	},
	drawerHeaderText: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
	},
	drawerImage: {
		margin: 10,
		height: 60,
		width: 60,
	},
});

export default Main;
