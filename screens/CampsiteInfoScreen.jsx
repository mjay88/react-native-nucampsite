import { useState } from "react";
import { FlatList, View, Text, StyleSheet, Button, Modal } from "react-native";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { Input, Rating } from "react-native-elements";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
	const [showModal, setShowModal] = useState(false);
	const [rating, setRating] = useState(5);
	const [author, setAuthor] = useState("");
	const [text, setText] = useState("");
	const { campsite } = route.params;
	const comments = useSelector((state) => state.comments);
	// const [favorite, setFavorite] = useState(false);
	const favorites = useSelector((state) => state.favorites);
	const dispatch = useDispatch();

	const handleFormSubmission = () => {
		const newComment = {
			author,
			rating,
			text,
			campsiteId: campsite.id,
		};
		dispatch(postComment(newComment));
		setShowModal(!showModal);
	};

	const resetForm = () => {
		setRating(5);
		setAuthor("");
		setText("");
	};

	const handleOnSubmit = () => {
		handleFormSubmission();
		resetForm();
	};

	const renderCommentItem = ({ item }) => {
		return (
			<View style={StyleSheet.commentItem}>
				<Text style={{ fontSize: 14 }}>{item.text}</Text>
				<Rating
					type="star"
					readonly
					startingValue={item.rating}
					imageSize={10}
					style={{ paddingVertical: "5%", alignItems: "flex-start" }}
				></Rating>
				<Text style={{ fontSize: 12 }}>{`--${item.author}`}</Text>
			</View>
		);
	};
	//Flatlist needs to be at the top level of the component so it can calculate the scroll height accurately
	return (
		<>
			<FlatList
				data={comments.commentsArray.filter(
					(comment) => comment.campsiteId === campsite.id
				)}
				renderItem={renderCommentItem}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{
					marginHorizontal: 20,
					paddingVertical: 20,
				}}
				ListHeaderComponent={
					<>
						<RenderCampsite
							campsite={campsite}
							isFavorite={favorites.includes(campsite.id)}
							markFavorite={() => dispatch(toggleFavorite(campsite.id))}
							onShowModal={() => setShowModal(!showModal)}
						/>
						<Text style={styles.commentsTitle}>Comments</Text>
					</>
				}
			/>
			<Modal
				animationType="slide"
				transparent={false}
				visible={showModal}
				onRequestClose={() => setShowModal(!showModal)}
			>
				<View style={styles.modal}>
					<Rating
						type="star"
						showRating
						startingValue={rating}
						imageSize={40}
						style={{ paddingVertical: 10 }}
						onFinishRating={(rating) => setRating(rating)}
					/>
					<Input
						placeholder="Author"
						leftIcon={{ type: "font-awesome", name: "user-o" }}
						leftIconContainerStyle={{ paddingRight: 10 }}
						onChangeText={(author) => setAuthor(author)}
						value={author}
					/>
					<Input
						placeholder="Comment"
						leftIcon={{ type: "font-awesome", name: "comment-o" }}
						leftIconContainerStyle={{ paddingRight: 10 }}
						onChangeText={(text) => setText(text)}
						value={text}
					/>
					<View style={{ margin: 10 }}>
						<Button
							onPress={() => {
								handleOnSubmit();
							}}
							color="#5637DD"
							title="Submit"
						/>
					</View>
					<View style={{ margin: 10 }}>
						<Button
							onPress={() => {
								setShowModal(!showModal);
								resetForm();
							}}
							color="#808080"
							title="Cancel"
						/>
					</View>
				</View>
			</Modal>
		</>
	);
	//
	// <RenderCampsite campsite={campsite} />;
};

const styles = StyleSheet.create({
	commentsTitle: {
		textAlign: "center",
		backgroundColor: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		color: "#43484D",
		padding: 10,
		paddingTop: 30,
	},
	commentItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#fff",
	},
	modal: {
		justifyContent: "center",
		margin: 20,
	},
});

export default CampsiteInfoScreen;
