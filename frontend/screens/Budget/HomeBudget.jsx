import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Modal,
} from "react-native";

import { primaryColor, globalStyles } from "../../styles/global";
import ArrowLeftIcon from "../../assets/svg/arrow-left-2.svg";
import ArrowRightIcon from "../../assets/svg/arrow-right-2.svg";
import WarningIcon from "../../assets/svg/warning.svg";

import MainButton from "../../components/button/MainButton";
import ProgressBar from "../../components/ProgressBar";

import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import LoadingModal from "../../components/LoadingModal";

const Colors = {
    Shopping: "#FCAC12",
    Transportation: "#0077FF",
    Food: "#FD3C4A",
    Subscription: "#7F3DFF",
    Travel: "#140c59",
};

function BudgetItem({ navigation, budget }) {
    const { categoryName, maxMoney, spendMoney } = budget;
    const remainMoney = spendMoney < maxMoney ? maxMoney - spendMoney : 0;
    const percent = spendMoney < maxMoney ? Math.floor((spendMoney / maxMoney) * 100) : 100;

    let color = Colors[categoryName] || primaryColor;

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("DetailBudget", { budgetId: budget._id });
            }}
        >
            <View
                style={{ backgroundColor: "#fff", padding: 20, borderRadius: 16, borderWidth: 1, borderColor: "#ccc" }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderRadius: 15,
                            backgroundColor: "#F1F1FA",
                            borderWidth: 1,
                            borderColor: "#ccc",
                        }}
                    >
                        <View style={{ width: 14, height: 14, backgroundColor: color, borderRadius: 10 }}></View>
                        <Text style={{ marginLeft: 5, fontSize: 14, fontFamily: "Inter-Medium" }}>{categoryName}</Text>
                    </View>
                    <WarningIcon fill={remainMoney > 0 ? "none" : "orange"} />
                </View>
                <Text style={{ fontSize: 24, fontFamily: "Inter-Bold" }}>${remainMoney}</Text>
                <ProgressBar thumbColor={color} value={percent} />
                <Text style={{ fontSize: 16, fontFamily: "Inter-Medium", color: "#91919F" }}>
                    ${spendMoney} of ${maxMoney}
                </Text>
                {remainMoney === 0 && (
                    <Text style={{ fontSize: 14, fontFamily: "Inter-Regular", color: "#FD3C4A" }}>
                        You've exceed the limit!
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

function HomeBudget({ navigation }) {
    const [budgets, setBudgets] = useState();
    const { user, setLoading, callBudgets } = useContext(GlobalContext);
    const getBudgets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/budgets?userId=${user._id}`);
            if (response.status === 200) {
                setBudgets(response.data);
                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get Budgets failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getBudgets();
    }, [callBudgets]);

    return (
        <View style={styles.container}>
            {budgets && (
                <>
                    <View style={styles.topBar}>
                        <ArrowLeftIcon width={32} height={32} fill="#fff" />
                        <Text style={styles.textBar}>May</Text>
                        <ArrowRightIcon width={32} height={32} fill="#fff" />
                    </View>
                    <View style={styles.listContainer}>
                        <View style={{ width: "100%", height: "85%" }}>
                            {budgets.length > 0 ? (
                                <FlatList
                                    data={budgets}
                                    renderItem={({ item }) => <BudgetItem navigation={navigation} budget={item} />}
                                    ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
                                />
                            ) : (
                                <>
                                    <Text style={styles.emptyText}>You don’t have a budget.</Text>
                                    <Text style={styles.emptyText}>Let’s make one so you in control.</Text>
                                </>
                            )}
                        </View>
                        <MainButton
                            pressHandler={() => {
                                navigation.navigate("CreateBudget");
                            }}
                            buttonSize="large"
                            buttonType="primary"
                            textType="primaryText"
                            title="Create a budget"
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.spendHeight : 0,
        backgroundColor: primaryColor,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    textBar: {
        fontFamily: "Inter-Medium",
        fontSize: 24,
        color: "#fff",
        marginTop: 40,
        marginBottom: 32,
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#fcfcfc",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    emptyText: {
        color: "#91919F",
        fontFamily: "Inter-Medium",
        fontSize: 16,
        textAlign: "center",
    },
});

export default HomeBudget;
