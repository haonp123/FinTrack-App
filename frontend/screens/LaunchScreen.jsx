import { View, Image, Text, StyleSheet } from "react-native";
import { primaryColor } from "../styles/global";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LaunchScreen({ navigation }) {
    const [isFirstLaunch, setIsFirstLaunch] = useState();

    useEffect(() => {
        // AsyncStorage.getItem("alreadyLaunched").then((value) => {
        //     console.log("alreadyLaunched: ", value);
        //     if (!value) {
        //         AsyncStorage.setItem("alreadyLaunched", "true");
        //         setIsFirstLaunch(true);
        //     } else {
        //         setIsFirstLaunch(false);
        //     }
        // });

        // console.log("isFirstLaunch:", isFirstLaunch);

        const timeoutId = setTimeout(() => {
            // if (isFirstLaunch) {
            //     navigation.navigate("Onboarding");
            // } else {
            //     navigation.navigate("HomeOnboard");
            // }

            navigation.navigate("Onboarding");
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/images/pig-logo.png")} />
            <Text style={styles.text}>fintrack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: primaryColor,
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
        letterSpacing: 1.5,
        marginTop: 16,
    },
});
