import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import feedReducer from "./Slices/FeedSlice";
import connectionReducer from "./Slices/ConnectionSlice";
import requestReducer from "./Slices/RequestSlice";
import loadingReducer from "./Slices/LoadingSlice";
import errorReducer from "./Slices/ErrorSlice";

const store = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestReducer,
        loading: loadingReducer,
        error: errorReducer
    },
});

export default store;