import React, { useState, useContext, useEffect } from "react";
import { View, Modal, TouchableOpacity, Text, Platform, StatusBar, StyleSheet } from "react-native";

import MainButton from "../../components/button/MainButton";

import TrashIcon from "../../assets/svg/trash.svg";
import ArrowLefIcon from "../../assets/svg/arrow-left.svg";
import WarningIcon from "../../assets/svg/warning.svg";

import axios from "axios";
import { apiBaseUrl } from "../../config";
import { GlobalContext } from "../../context/GlobalContext";

const TitleColors = {
    Shopping: "#FCEED4",
    Transportation: "#BDDCFF",
    Food: "#FDD5D7",
    Subscription: "#EEE5FF",
    Travel: "#85caed",
};

const BarColors = {
    Shopping: "#FCAC12",
    Transportation: "#0077FF",
    Food: "#FD3C4A",
    Subscription: "#7F3DFF",
    Travel: "#140c59",
};

export default function DetailBudget({ route, navigation }) {
    const [openModal, setOpenModal] = useState(false);
    const [budget, setBudget] = useState();
    const { budgetId } = route.params;
    const { setLoading, setCallBudgets } = useContext(GlobalContext);

    const getBudget = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/budgets/${budgetId}`);
            if (response.status === 200) {
                setBudget(response.data);
                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get Budget failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    const renderBudget = (budget) => {
        const { categoryName, maxMoney, spendMoney } = budget;
        const remainMoney = spendMoney < maxMoney ? maxMoney - spendMoney : 0;
        const percent = spendMoney < maxMoney ? Math.floor((spendMoney / maxMoney) * 100) : 100;

        return (
            <>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate("HomeBudget")}>
                            <ArrowLefIcon fill="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Detail Budget</Text>
                        <TouchableOpacity onPress={() => setOpenModal((prev) => !prev)}>
                            <TrashIcon fill="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.categoryName, { backgroundColor: TitleColors[categoryName] }]}>
                            {categoryName}
                        </Text>
                        <View style={{ alignItems: "center", marginVertical: 24 }}>
                            <Text style={{ fontFamily: "Inter-Bold", fontSize: 24, color: "#000" }}>Remaining</Text>
                            <Text style={{ fontFamily: "Inter-SemiBold", fontSize: 64, color: "#000" }}>
                                {remainMoney}
                            </Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View
                                style={{
                                    backgroundColor: BarColors[categoryName],
                                    height: "100%",
                                    width: `${percent}%`,
                                }}
                            ></View>
                        </View>
                        {remainMoney === 0 && (
                            <View style={styles.warningContainer}>
                                <WarningIcon fill="#fff" />
                                <Text style={styles.warningText}>You've exceed the limit</Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <MainButton
                        buttonSize="large"
                        buttonType="primary"
                        textType="primaryText"
                        pressHandler={() => {
                            navigation.navigate("EditBudget");
                        }}
                        title="Edit"
                    />
                </View>
            </>
        );
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${apiBaseUrl}/budgets/${budgetId}`);
            setLoading(false);
            if (response.status === 200) {
                // 200 for OK
                setCallBudgets((prev) => !prev);
                navigation.navigate("HomeBudget");
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Delete Budget failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getBudget();
    }, []);

    return (
        <View style={styles.container}>
            {/* Delete Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={openModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setModalVisible((prev) => !prev);
                }}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
                    <View
                        style={{
                            padding: 16,
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 10,
                                fontFamily: "Inter-SemiBold",
                                textAlign: "center",
                            }}
                        >
                            Remove this budget
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 24,
                                fontFamily: "Inter-Medium",
                                color: "#91919F",
                                textAlign: "center",
                            }}
                        >
                            Are you sure do you wanna remove this budget?
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <MainButton
                                buttonSize="small"
                                buttonType="secondary"
                                textType="secondaryText"
                                title="No"
                                pressHandler={() => {
                                    setOpenModal((prev) => !prev);
                                }}
                            />
                            <MainButton
                                buttonSize="small"
                                buttonType="primary"
                                textType="primaryText"
                                title="Yes"
                                pressHandler={() => {
                                    handleDelete();
                                    setOpenModal((prev) => !prev);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {budget && renderBudget(budget)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        paddingHorizontal: 15,
        justifyContent: "space-between",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Inter-Bold",
    },
    content: {
        alignItems: "center",
        marginTop: 32,
        paddingHorizontal: 10,
    },
    categoryName: {
        width: 116,
        height: 54,
        textAlign: "center",
        lineHeight: 54,
        color: "#0D0E0F",
        fontFamily: "Inter-SemiBold",
        fontSize: 18,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E3E5E5",
    },
    progressBar: {
        height: 15,
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
    },
    warningContainer: {
        backgroundColor: "#FD3C4A",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 24,
        marginTop: 24,
    },
    warningText: {
        color: "#fff",
        fontFamily: "Inter-Medium",
        fontSize: 14,
        marginLeft: 5,
    },
    buttonContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
});
