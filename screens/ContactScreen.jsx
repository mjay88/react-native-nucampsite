import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
const ContactScreen = () => {
	return (
		<ScrollView style={styles.outerContainer}>
			<Card wrapperStyle={{ margin: 20 }} style={styles.card}>
				<Card.Title style={styles.title}>Contact Information</Card.Title>
				<Card.Divider />
				<Text>1 Nucamp Way</Text>
				<Text> Seattle, WA 98001</Text>
				<Text> U.S.A. </Text>
				<Text></Text>
				<Text>Phone: 1-206-555-1234</Text>
				<Text> Email: campsites@nucamp.co</Text>
			</Card>
		</ScrollView>
	);
};

export default ContactScreen;

const styles = StyleSheet.create({
	title: {
		padding: 10,
		fontSize: 15,
	},
});
