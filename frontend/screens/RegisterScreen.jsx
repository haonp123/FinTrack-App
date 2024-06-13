import { Modal, Pressable, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from "react-native";
import axios from "axios";

import React, { useState, useContext } from "react";
import CheckBox from "expo-checkbox";
import { apiBaseUrl } from "../config";
import { primaryColor } from "../styles/global";

import EyeIcon from "../assets/svg/eye-regular.svg";
import SlashEyeIcon from "../assets/svg/eye-slash-regular.svg";
import ErrorIcon from "../assets/svg/circle-exclamation-solid.svg";

import MainButton from "../components/button/MainButton";
import { GlobalContext } from "../context/GlobalContext";

const widthScreen = Dimensions.get("window").width;

const RegisterScreen = ({ navigation }) => {
    const [visibleEntry, setVisibleEntry] = useState(true);
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState("");
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

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${apiBaseUrl}/auth/signup`,
                {
                    name: name,
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setLoading(false);
            if (response.status === 201) {
                await handleUser(response.data.userId);
                navigation.navigate("Main");
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Registration failed");
            }
        } catch (error) {
            const { message, statusCode } = error.response.data;
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);

            Array.isArray(message) ? setError(message[0]) : setError(message);

            setShowErrorModal(true);
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
                        <Text style={{ fontSize: 14, fontWeight: "medium", marginVertical: 10, textAlign: "center" }}>
                            {error}
                        </Text>
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

            <TextInput
                style={styles.textInput}
                placeholder="Name"
                placeholderTextColor="#91919F"
                value={name}
                onChangeText={(value) => setName(value)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#91919F"
                value={email}
                onChangeText={(value) => setEmail(value)}
            />
            <View style={styles.inputPasswordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Password"
                    placeholderTextColor="#91919F"
                    secureTextEntry={visibleEntry}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
                <Pressable onPress={() => setVisibleEntry(!visibleEntry)}>
                    {visibleEntry ? (
                        <EyeIcon width={24} height={24} fill="#91919F" />
                    ) : (
                        <SlashEyeIcon width={24} height={24} fill="#91919F" />
                    )}
                </Pressable>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 16,
                }}
            >
                <CheckBox value={checked} onValueChange={setChecked} tintColors={{ true: "#7F3DFF" }} />
                <Text style={{ color: "#000", fontFamily: "Inter-Medium", marginLeft: 10 }}>
                    By signing up, you agree to the{" "}
                    <Text style={{ color: "#7F3DFF", fontFamily: "Inter-Medium" }}>
                        Terms of Service and Privacy Policy
                    </Text>
                </Text>
            </View>

            <View style={{ alignItems: "center", marginVertical: 24 }}>
                <MainButton
                    buttonSize="large"
                    buttonType="primary"
                    textType="primaryText"
                    title="Sign Up"
                    pressHandler={() => {
                        if (!checked) {
                            setError("Please agree the Policy before signing up!");
                            setShowErrorModal(true);
                        } else {
                            handleSignUp();
                        }
                    }}
                />
            </View>
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
                    Already have an account?{" "}
                    <Text
                        onPress={() => navigation.navigate("Login")}
                        style={{ textDecorationLine: "underline", color: "#7F3DFF", fontFamily: "Inter-SemiBold" }}
                    >
                        Login
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#F1F1FA",
        paddingHorizontal: 20,
        borderRadius: 20,
        fontFamily: "Inter-Medium",
        color: "#000",
        marginTop: 20,
    },
    inputPasswordContainer: {
        borderWidth: 1,
        borderColor: "#F1F1FA",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputPassword: {
        height: 50,
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
        width: widthScreen - 45,
        textAlign: "center",
        color: "#FCFCFC",
        fontFamily: "Inter-SemiBold",
        fontSize: 18,
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
    },
});

export default RegisterScreen;
