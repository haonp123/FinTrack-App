import {
    Dimensions,
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TextInput,
    View,
    StyleSheet,
    Alert,
    Modal,
    TouchableOpacity,
} from "react-native";
import { apiBaseUrl } from "../config";

import React, { useState, useContext } from "react";
import axios from "axios";

import EyeIcon from "../assets/svg/eye-regular.svg";
import SlashEyeIcon from "../assets/svg/eye-slash-regular.svg";
import ErrorIcon from "../assets/svg/circle-exclamation-solid.svg";

import { primaryColor } from "../styles/global";
import MainButton from "../components/button/MainButton";

import { GlobalContext } from "../context/GlobalContext";

const widthScreen = Dimensions.get("window").width;

const LoginScreen = ({ navigation }) => {
    const [visibleEntry, setVisibleEntry] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);

    const { setUser, setLoading } = useContext(GlobalContext);

    const handleUser = async (userId) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/users/${userId}`);

            if (response.status === 200) {
                setUser(response.data);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Login failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${apiBaseUrl}/auth/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                // 201 for created
                // Alert.alert("Login Successful");
                await handleUser(response.data.userId);
                setLoading(false);
                navigation.navigate("Main");
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Login failed");
            }
        } catch (error) {
            const { message, statusCode } = error.response.data;
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);

            Array.isArray(message) ? setError(message[0]) : setError(message);

            setShowErrorModal(true);
            // setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Error Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showErrorModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setShowErrorModal((prev) => !prev);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            width: 330,
                            alignItems: "center",
                            paddingTop: 20,
                            borderRadius: 16,
                        }}
                    >
                        <ErrorIcon fill="red" width={64} height={64} />
                        <Text style={{ fontSize: 14, fontWeight: "medium", marginVertical: 10 }}>{error}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowErrorModal(false);
                            }}
                        >
                            <View style={{ borderTopWidth: 1, borderColor: "#ccc", width: 320, paddingVertical: 10 }}>
                                <Text
                                    style={{
                                        color: primaryColor,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    OK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#91919F"
                    value={email}
                    onChangeText={(value) => setEmail(value.trim())}
                />
                <View style={styles.inputPasswordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Password"
                        placeholderTextColor="#91919F"
                        value={password}
                        secureTextEntry={!visibleEntry}
                        onChangeText={(value) => setPassword(value.trim())}
                    />
                    <Pressable onPress={() => setVisibleEntry(!visibleEntry)}>
                        {!visibleEntry ? (
                            <EyeIcon width={24} height={24} fill="#91919F" />
                        ) : (
                            <SlashEyeIcon width={24} height={24} fill="#91919F" />
                        )}
                    </Pressable>
                </View>

                <MainButton
                    buttonSize="large"
                    buttonType="primary"
                    textType="primaryText"
                    title="Login"
                    pressHandler={handleSubmit}
                />

                <Text style={{ textAlign: "center", color: primaryColor, fontWeight: "bold", fontSize: 16 }}>
                    Forgot Password?
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#91919F",
                            fontFamily: "Inter-Medium",
                            textAlign: "center",
                            alignItems: "center",
                        }}
                    >
                        Don't have an account yet?{" "}
                        <Text
                            onPress={() => navigation.navigate("SignUp")}
                            style={{ textDecorationLine: "underline", color: "#7F3DFF", fontFamily: "Inter-SemiBold" }}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: "#fff",
    },
    // form
    formContainer: {
        marginTop: 90,
        gap: 20,
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#F1F1FA",
        paddingHorizontal: 20,
        borderRadius: 20,
        fontFamily: "Inter-Medium",
        color: "#000",
    },
    inputPasswordContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: "#F1F1FA",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
    },
    inputPassword: {
        fontFamily: "Inter-Medium",
        width: "100%",
        color: "#000",
    },
    eye: {
        width: 20,
        height: 15,
    },
    checked: {
        width: 60,
        height: 60,
    },
    signupBtn: {
        backgroundColor: "#7F3DFF",
        width: widthScreen - 35,
        textAlign: "center",
        color: "#FCFCFC",
        fontFamily: "Inter-SemiBold",
        fontSize: 18,
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
    },
});

export default LoginScreen;
