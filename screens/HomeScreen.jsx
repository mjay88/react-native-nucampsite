import { View, Text, ScrollView } from "react-native";
// import { useState } from "react";
import { Card } from "react-native-elements";
// import { CAMPSITES } from "../shared/campsites";
// import { PROMOTIONS } from "../shared/promotions";
// import { PARTNERS } from "../shared/partners";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import LoadingComponent from "../components/LoadingComponent";

const FeaturedItem = (props) => {
	const { item } = props;

	if (props.isLoading) {
		return <LoadingComponent />;
	}
	if (props.errMess) {
		return (
			<View>
				<Text>{props.errMess}</Text>
			</View>
		);
	}
	if (item) {
		return (
			<Card containerStyle={{ padding: 0 }}>
				<Card.Image source={{ uri: baseUrl + item.image }}>
					<View style={{ justifyContent: "center", flex: 1 }}>
						<Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
							{item.name}
						</Text>
					</View>
				</Card.Image>
				<Text style={{ margin: 20 }}>{item.description}</Text>
			</Card>
		);
	}
	return <View></View>;
};

const HomeScreen = ({ navigation }) => {
	// const [campsites, setCampsites] = useState(CAMPSITES);
	// const [promotions, setPromotions] = useState(PROMOTIONS);
	// const [partners, setPartners] = useState(PARTNERS);
	const campsites = useSelector((state) => state.campsites);
	const promotions = useSelector((state) => state.promotions);
	const partners = useSelector((state) => state.partners);

	const featCampsite = campsites.campsitesArray.find((item) => item.featured);
	const featPromotion = promotions.promotionsArray.find(
		(item) => item.featured
	);
	const featPartner = partners.partnersArray.find((item) => item.featured);

	return (
		<ScrollView>
			<FeaturedItem
				item={featCampsite}
				isLoading={campsites.isLoading}
				errMess={campsites.errMess}
			/>
			<FeaturedItem
				item={featPromotion}
				isLoading={promotions.isLoading}
				errMess={promotions.errMess}
			/>
			<FeaturedItem
				item={featPartner}
				isLoading={partners.isLoading}
				errMess={partners.errMess}
			/>
		</ScrollView>
	);
};

export default HomeScreen;
