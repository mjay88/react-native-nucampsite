import { Picker } from "@react-native-picker/picker";
import { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Switch,
	Button,
	Platform,
	Modal,
	Animated,
	Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

const ReservationScreen = () => {
	const [campers, setCampers] = useState(1);
	const [hikeIn, setHikeIn] = useState(false);
	const [date, setDate] = useState(new Date());
	console.log(date.toISOString());
	const [showCalender, setShowCalendar] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const scaleValue = useRef(new Animated.Value(0)).current;
	const scaleAnimation = Animated.timing(scaleValue, {
		toValue: 1,
		duration: 1500,
		useNativeDriver: true,
	});

	const onDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowCalendar(Platform.OS === "ios");
		setDate(currentDate);
	};
	const resetForm = () => {
		setCampers(1);
		setHikeIn(false);
		setDate(new Date());
		setShowCalendar(false);
	};

	const handleReservation = () => {
		console.log("campers:", campers);
		console.log("hikeIn:", hikeIn);
		console.log("date:", date);
		// setShowModal(!showModal);
		Alert.alert(
			"Begin Search?",
			`Number of Campers: ${campers} \nHike-In?: ${hikeIn}\nDate: ${date.toLocaleDateString(
				"en-US"
			)}`,

			[
				{
					text: "Cancel",
					onPress: () => {
						setCampers(1);
						setDate(new Date());
						setHikeIn(false);
					},
					style: "cancel",
				},
				{
					text: "Ok",
					onPress: () => {
						presentLocalNotification(date.toLocaleDateString("en-US"));
						resetForm();
					},
				},
			],
			{ cancelable: false }
		);
	};

	useEffect(() => {
		scaleAnimation.start();
	}, []);

	const presentLocalNotification = async (reservationDate) => {
		const sendNotification = () => {
			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: true,
					shouldSetBadge: true,
				}),
			});
			Notifications.scheduleNotificationAsync({
				content: {
					title: "Your Campsite Reservation Search",
					body: `Search for ${reservationDate} requested`,
				},
				trigger: null,
			});
		};
		let permissions = await Notifications.getPermissionsAsync();
		if (!permissions.granted) {
			permissions = await Notifications.requestPermissionsAsync();
		}
		if (permissions.granted) {
			sendNotification();
		}
	};

	return (
		<ScrollView>
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Number of Campers</Text>
					<Picker
						style={styles.formItem}
						selectedValue={campers}
						onValueChange={(itemValue) => setCampers(itemValue)}
					>
						<Picker.Item label="1" value={1} />
						<Picker.Item label="2" value={2} />
						<Picker.Item label="3" value={3} />
						<Picker.Item label="4" value={4} />
						<Picker.Item label="5" value={5} />
						<Picker.Item label="6" value={6} />
					</Picker>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Hike In?</Text>
					<Switch
						style={styles.formItem}
						value={hikeIn}
						trackColor={{ true: "#5637DD", false: null }}
						onValueChange={(value) => setHikeIn(value)}
					></Switch>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>Date:</Text>
					<Button
						onPress={() => setShowCalendar(!showCalender)}
						title={date.toLocaleDateString("en-US")}
						color="#5637DD"
						accessibilityLabel="Tap me to select a reservation date"
					></Button>
				</View>
				{showCalender && (
					<DateTimePicker
						style={styles.formItem}
						value={date}
						mode="date"
						display="default"
						onChange={onDateChange}
					/>
				)}
				<View style={styles.formRow}>
					<Button
						onPress={() => handleReservation()}
						title="Search Availabilty"
						color="#5637DD"
						accessibilityLabel="Tap me to search for availability"
					></Button>
				</View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={showModal}
					onRequestClose={() => setShowModal(!showModal)}
				>
					<View style={styles.modal}>
						<Text style={styles.modalTitle}>Search Campsite Reservations</Text>
						<Text style={styles.modalText}>Number of Campers: {campers}</Text>
						<Text style={styles.modalText}>
							Hike-In?: {hikeIn ? "Yes" : "No"}
						</Text>
						<Text style={styles.modalText}>
							Date: {date.toLocaleDateString("en-US")}
						</Text>
					</View>
					<Button
						onPress={() => {
							setShowModal(!showModal);
							resetForm();
						}}
						color="#5637DD"
						title="Close"
					></Button>
				</Modal>
			</Animated.View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	formRow: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
		margin: 20,
	},
	formLabel: {
		fontSize: 18,
		flex: 2,
	},
	formItem: {
		flex: 1,
	},
	modal: {
		justifyContent: "center",
		margin: 20,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "bold",
		backgroundColor: "#5637DD",
		textAlign: "center",
		color: "#fff",
		marginBottom: 20,
	},
	modalText: {
		fontSize: 18,
		margin: 10,
	},
});

export default ReservationScreen;
