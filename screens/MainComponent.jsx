import { useState } from "react";
import DirectoryScreen from "./DirectoryScreen";
import { CAMPSITES } from "../shared/campsites";

const Main = () => {
	const [campsites, setCampsites] = useState(CAMPSITES);
	return <DirectoryScreen campsites={campsites} />;
};

export default Main;
