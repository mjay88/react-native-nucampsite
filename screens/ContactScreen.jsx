import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

const ContactScreen = () => {
	const sendMail = () => {
		MailComposer.composeAsync({
			recipients: ["campsites@nucamp.co"],
			subject: "Inquiry",
			body: "To whom it may concern:",
		});
	};

	return (
		<ScrollView style={styles.outerContainer}>
			<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
				<Card wrapperStyle={{ margin: 20 }} style={styles.card}>
					<Card.Title style={styles.title}>Contact Information</Card.Title>
					<Card.Divider />
					<Text>1 Nucamp Way</Text>
					<Text> Seattle, WA 98001</Text>
					<Text> U.S.A. </Text>
					<Text></Text>
					<Text>Phone: 1-206-555-1234</Text>
					<Text> Email: campsites@nucamp.co</Text>
					<Button
						title="Send Email"
						buttonStyle={{ backgroundColor: "#5637dd", margin: 40 }}
						icon={
							<Icon
								name="envelope-o"
								type="font-awesome"
								color="#fff"
								iconStyle={{ marginRight: 10 }}
							/>
						}
						onPress={() => sendMail()}
					/>
				</Card>
			</Animatable.View>
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
