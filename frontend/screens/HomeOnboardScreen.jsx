import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import MainButton from "../components/button/MainButton";
import { primaryColor } from "../styles/global";

export default function HomeOnboardScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: primaryColor }}>
            <ImageBackground
                resizeMode="contain"
                style={{ flex: 1 }}
                source={require("../assets/images/background-home.png")}
            >
                <View style={styles.container}>
                    <View style={styles.card}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 32,
                                marginBottom: 24,
                            }}
                        >
                            <Image source={require("../assets/images/pig-logo.png")} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 24, color: primaryColor, fontWeight: "bold" }}>
                                    Welcome to FinTrack
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                                    Take Control & Stay Cool!
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ alignItems: "center" }}>
                                <MainButton
                                    buttonSize="large"
                                    buttonType="primary"
                                    textType="primaryText"
                                    title="Login"
                                    pressHandler={() => navigation.navigate("Login")}
                                />
                            </View>
                            <View style={{ alignItems: "center", marginVertical: 15 }}>
                                <MainButton
                                    buttonSize="large"
                                    buttonType="secondary"
                                    textType="secondaryText"
                                    title="Sign Up"
                                    pressHandler={() => navigation.navigate("SignUp")}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0, 0.5)",
    },
    card: {
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
});
