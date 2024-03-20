import { useSelector } from "react-redux";
import { View, FlatList, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Loading from "../components/LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const FavoritesScreen = ({ navigation }) => {
	const { campsitesArray, isLoading, errMess } = useSelector(
		(state) => state.campsites
	);
	const favorites = useSelector((state) => state.favorites);

	const renderFavoriteItem = ({ item: campsite }) => {
		console.log(campsite, "campsite that should be navigated to");
		return (
			<ListItem
				onPress={() =>
					navigation.navigate("DirectoryScreen", {
						screen: "CampsiteInfo", //navigate to a screen inside Directory?
						params: { campsite },
					})
				}
			>
				<Avatar rounded source={{ uri: baseUrl + campsite.image }} />
				<ListItem.Content>
					<ListItem.Title>{campsite.name}</ListItem.Title>
					<ListItem.Subtitle>{campsite.description}</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		);
	};
	if (isLoading) {
		return <Loading />;
	}

	if (errMess) {
		<View>
			<Text>{errMess}</Text>
		</View>;
	}

	return (
		<FlatList
			data={campsitesArray.filter((campsite) =>
				favorites.includes(campsite.id)
			)}
			renderItem={renderFavoriteItem}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
};

export default FavoritesScreen;
