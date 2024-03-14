import { FlatList, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Tile } from "react-native-elements";
import LoadingComponent from "../components/LoadingComponent";
const DirectoryScreen = ({ navigation }) => {
	const campsites = useSelector((state) => state.campsites);

	if (campsites.isLoading) {
		return <LoadingComponent />;
	}

	if (campsites.errMess) {
		return (
			<View>
				<Text>{campsites.errMess}</Text>
			</View>
		);
	}

	const renderDirectoryItem = ({ item: campsite }) => {
		return (
			<Tile
				title={campsite.name}
				caption={campsite.description}
				featured
				onPress={() => navigation.navigate("CampsiteInfo", { campsite })}
				imageSrc={{ uri: baseUrl + campsite.image }}
			/>
		);
	};

	return (
		<FlatList
			data={campsites.campsitesArray}
			renderItem={renderDirectoryItem}
			keyExtractor={(item) => item.id.toString()}
		></FlatList>
	);
};

export default DirectoryScreen;
