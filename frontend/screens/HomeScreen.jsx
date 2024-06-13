import React, { Component, useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform,
    StatusBar,
    Modal,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from "react-native";

import ArrowDownIcon from "../assets/svg/arrow-down-2.svg";
import NotificationIcon from "../assets/svg/notification.svg";
import IncomeIcon from "../assets/svg/income.svg";
import ExpenseIcon from "../assets/svg/expense.svg";
import RecurringBillIcon from "../assets/svg/recurring-bill.svg";
import HomeIcon from "../assets/svg/home.svg";
import RestaurantIcon from "../assets/svg/restaurant.svg";
import CarIcon from "../assets/svg/car.svg";
import SalaryIcon from "../assets/svg/salary.svg";
import PlaneIcon from "../assets/svg/plane-solid.svg";

import TransactionItem from "../components/TransactionItem";
import LoadingModal from "../components/LoadingModal";
import { primaryColor } from "../styles/global";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { apiBaseUrl } from "../config";

var { height } = Dimensions.get("window");
var box_count = 2;

const monthList = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
];

const timeList = ["Today", "Week", "Month", "Year"];

function InOutCart({ color, iconComponent, title, money }) {
    return (
        <View
            style={{
                backgroundColor: color,
                flexDirection: "row",
                padding: 16,
                borderRadius: 32,
                alignItems: "center",
            }}
        >
            <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 16 }}>{iconComponent}</View>
            <View style={{ marginLeft: 10 }}>
                <Text
                    style={{
                        fontFamily: "Inter-Medium",
                        color: "#FCFCFC",
                        fontSize: 14,
                    }}
                >
                    {title}
                </Text>
                <Text style={{ fontFamily: "Inter-SemiBold", color: "#FCFCFC", fontSize: 22 }}>${money}</Text>
            </View>
        </View>
    );
}

export default function HomeScreen({ navigation }) {
    const [selectedValue, setSelectedValue] = useState("Random");
    const [monthModalOpen, setMonthModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { user, setLoading, callTransactions, setCallTransactions } = useContext(GlobalContext);
    const [transactions, setTransactions] = useState();

    const [transactionWithTime, setTransactionWithTime] = useState();
    const [selectedTime, setSelectedTime] = useState(timeList[0]);

    const getTransactions = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/transactions?userId=${user._id}&sortTime=desc`);
            if (response.status === 200) {
                setTransactions(response.data);
                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get Transactions failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    const getTransactionWithTime = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${apiBaseUrl}/transactions?userId=${user._id}&sortTime=desc&filterTime=${selectedTime}&limit=5`
            );
            if (response.status === 200) {
                setTransactionWithTime(response.data);
                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get Transactions Filtered Width Time failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getTransactions();
    }, [callTransactions]);

    useEffect(() => {
        getTransactionWithTime();
    }, [selectedTime, callTransactions]);

    return (
        <View style={styles.container}>
            {/* Month Modal */}
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.16)",
                    }}
                >
                    <View style={{ backgroundColor: "#fff" }}>
                        {monthList.map((monthItem, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisible((prev) => !prev);
                                        setSelectedValue(monthItem.name);
                                    }}
                                    key={index}
                                >
                                    <Text
                                        style={{
                                            width: 300,
                                            paddingVertical: 10,
                                            textAlign: "center",
                                            borderBottomWidth: 1,
                                        }}
                                    >
                                        {monthItem.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </Modal>

            {transactions && (
                <>
                    <View style={[styles.box1]}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View
                                style={{
                                    padding: 3,
                                    backgroundColor: "#fff",
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    borderColor: primaryColor,
                                }}
                            >
                                <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                            </View>
                            <TouchableOpacity
                                style={{
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 16,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                }}
                                onPress={() => setModalVisible((prev) => !prev)}
                            >
                                <ArrowDownIcon fill={primaryColor} />
                                <Text style={{ fontSize: 14, fontFamily: "Inter-Medium", marginLeft: 2 }}>
                                    {selectedValue}
                                </Text>
                            </TouchableOpacity>
                            <NotificationIcon fill={primaryColor} />
                        </View>
                        <Text style={styles.text}>Account Balance</Text>
                        <Text style={styles.text1}>$5500</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                marginTop: 30,
                            }}
                        >
                            <InOutCart
                                title="Income"
                                color="#00A86B"
                                iconComponent={<IncomeIcon fill="#00A86B" />}
                                money={transactions.reduce((result, transaction) => {
                                    return transaction.type === "Income" ? result + transaction.money : result;
                                }, 0)}
                            />
                            <InOutCart
                                title="Expenses"
                                color="#FD3C4A"
                                iconComponent={<ExpenseIcon fill="#FD3C4A" />}
                                money={transactions.reduce((result, transaction) => {
                                    return transaction.type === "Expense" ? result + transaction.money : result;
                                }, 0)}
                            />
                        </View>
                    </View>
                    <View style={[styles.box2]}>
                        <Text
                            style={{
                                marginTop: 10,
                                marginLeft: 20,
                                fontFamily: "Inter-SemiBold",
                                color: "#0D0E0F",
                                fontSize: 18,
                            }}
                        >
                            Spend Frequency
                        </Text>
                        {/* <Image source={chartImage} style={{ width: "100%", height: 170, marginTop: 20 }} /> */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                fontFamily: "Inter-Medium",
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: "#FCFCFC",
                                marginHorizontal: 16,
                            }}
                        >
                            {timeList.map((time, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => setSelectedTime(time)}
                                        key={index}
                                        style={
                                            selectedTime === time
                                                ? [styles.timeContainer, styles.selectedTimeContainer]
                                                : styles.timeContainer
                                        }
                                    >
                                        <Text
                                            style={
                                                selectedTime === time
                                                    ? [styles.timeText, styles.selectedTimeText]
                                                    : styles.timeText
                                            }
                                        >
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                        <View style={{ marginHorizontal: 16 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginVertical: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: "#292B2D",
                                        fontFamily: "Inter-SemiBold",
                                    }}
                                >
                                    Recent Transaction
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        paddingVertical: 5,
                                        paddingHorizontal: 15,
                                        borderRadius: 32,
                                        backgroundColor: "#EEE5FF",
                                    }}
                                    onPress={() => navigation.navigate("HomeTransaction")}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: "Inter-Medium", color: primaryColor }}>
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView style={{ height: 300, marginHorizontal: 16, marginBottom: 50 }}>
                            {transactionWithTime &&
                                transactionWithTime.map((transaction) => {
                                    return (
                                        <TransactionItem
                                            prevScreen="Home"
                                            transaction={transaction}
                                            navigation={navigation}
                                        />
                                    );
                                })}
                        </ScrollView>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    box1: {
        backgroundColor: "#FFF6E5",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 16,
        paddingHorizontal: 16,
        paddingTop: StatusBar.currentHeight + 16,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 100,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    chooseMonth: {
        justifyContent: "center",
        width: 160,
        height: 40,
        borderRadius: 100,
        borderColor: "#afeeee",
        borderWidth: 0.5,
    },
    text: {
        fontSize: 14,
        marginTop: 15,
        fontFamily: "Inter-Medium",
        textAlign: "center",
        color: "#91919F",
    },
    text1: {
        fontSize: 40,
        marginTop: 10,
        fontFamily: "Inter-SemiBold",
        textAlign: "center",
        color: "#161719",
    },
    income: {
        marginTop: 30,
        height: 80,
        width: 164,
        backgroundColor: "#00A86B",
        borderRadius: 30,
    },
    expenses: {
        marginTop: 30,
        height: 80,
        width: 164,
        backgroundColor: "#FD3C4A",
        borderRadius: 30,
    },

    box2: {
        backgroundColor: "#ffffff",
        marginBottom: 64,
    },
    timeContainer: {
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 20,
        flex: 1,
    },
    selectedTimeContainer: {
        backgroundColor: "#FCEED4",
    },
    timeText: {
        fontSize: 14,
        color: "#91919F",
        fontFamily: "Inter-Medium",
        textAlign: "center",
    },
    selectedTimeText: {
        color: "#FCAC12",
        fontFamily: "Inter-Bold",
    },
});
