import React from "react";
import {StyleSheet} from "react-native";
import RootNavigators from "./src/navigations/RootNavigators";
import {networkService} from "./src/networking";
import {store} from "./src/store";
import {Provider} from "react-redux";

export default function App() {
    const handleStoreRehydration = () => {
        const {accessToken} = store.getState().user;

        if (accessToken) {
            networkService.setAccessToken(accessToken);
        }
    };
    return (
        <Provider store={store}>
          <RootNavigators />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
