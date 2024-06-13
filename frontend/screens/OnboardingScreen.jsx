import { Image, StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { primaryColor } from "../styles/global";
import MainButton from "../components/button/MainButton";

const slides = [
    {
        key: "slide1",
        title: "Get Your Money On Fleek",
        text: "Create an account so you can mange your personal expenses",
        image: require("../assets/images/onboarding1.png"),
    },
    {
        key: "slide2",
        title: "Track Every Buck With Ease",
        text: "Track your transaction easily, with categories and financial report",
        image: require("../assets/images/onboarding2.png"),
    },
    {
        key: "slide3",
        title: "Tailor Your Budget, Nail Your Goals!",
        text: "You can set your daily, monthly and weekly budget with this app",
        image: require("../assets/images/onboarding3.png"),
    },
];

const renderSlide = ({ item, navigation }) => {
    return (
        <View style={styles.slideContainer}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );
};

export default function OnboardingScreen({ navigation }) {
    return (
        <AppIntroSlider
            data={slides}
            renderItem={({ item }) => renderSlide({ item, navigation })}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            showSkipButton={true}
            showNextButton={true}
            renderNextButton={() => {
                return <Text style={[styles.btn, styles.nextText]}>Next</Text>;
            }}
            renderSkipButton={() => {
                return <Text style={[styles.btn, styles.skipText]}>Skip</Text>;
            }}
            renderDoneButton={() => {
                return (
                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                        <MainButton
                            buttonSize="large"
                            buttonType="primary"
                            textType="primaryText"
                            title="Get Started"
                            pressHandler={() => navigation.navigate("HomeOnboard")}
                        />
                    </View>
                );
            }}
            onSkip={() => navigation.navigate("HomeOnboard")}
            onDone={() => navigation.navigate("HomeOnboard")}
            bottomButton={true}
        />
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 55,
        backgroundColor: "#FCFCFC",
    },
    image: {
        width: 290,
        height: 290,
        marginBottom: 25,
    },
    title: {
        fontFamily: "Inter-Bold",
        fontSize: 32,
        textAlign: "center",
        color: "#000000",
        marginBottom: 20,
    },
    text: {
        fontFamily: "Inter-Medium",
        fontSize: 16,
        textAlign: "center",
        color: "#91919F",
    },
    dotStyle: {
        backgroundColor: "#EEE5FF",
        width: 8,
        height: 8,
        borderRadius: 50,
    },
    activeDotStyle: {
        backgroundColor: "#7F3DFF",
        width: 16,
        height: 16,
        borderRadius: 50,
    },
    btn: {
        textAlign: "center",
        marginHorizontal: 16,
        padding: 15,
        borderRadius: 16,
        fontWeight: "bold",
        fontSize: 16,
    },
    nextText: {
        color: "#fff",
        backgroundColor: primaryColor,
    },
    skipText: {
        marginTop: 10,
        backgroundColor: "#ccc",
    },
});
