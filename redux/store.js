import { configureStore } from "@reduxjs/toolkit";
import { campsitesReducer } from "../features/campsites/campsitesSlice";
import { commentsReducer } from "../features/comments/commentsSlice";
import { partnersReducer } from "../features/partners/partnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";
//combine each reducer from the slice files into one reducer
export const store = configureStore({
	reducer: {
		campsites: campsitesReducer,
		comments: commentsReducer,
		partners: partnersReducer,
		promotions: promotionsReducer,
	},
});
