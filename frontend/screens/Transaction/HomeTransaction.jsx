import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from "react-native";

import ArrowDownIcon from "../../assets/svg/arrow-down-2.svg";
import ArrowRightIcon from "../../assets/svg/arrow-right-2.svg";
import FilterIcon from "../../assets/svg/sort.svg";
import { primaryColor } from "../../styles/global";

import MainButton from "../../components/button/MainButton";
import TransactionItem from "../../components/TransactionItem";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { GlobalContext } from "../../context/GlobalContext";
import { useState, useContext, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";

export default function HomeTransaction({ navigation }) {
    const [filterModal, setFilterModal] = useState(false);
    const [transactions, setTransactions] = useState();
    const [filterTime, setFilterTime] = useState("Month");
    const [filter, setFilter] = useState({});
    const [reRender, setReRender] = useState(false);

    const { user, setLoading, callTransactions, setCallTransactions } = useContext(GlobalContext);

    const getTransactions = async () => {
        const { sortTime, sortMoney, type } = filter;
        let link = `${apiBaseUrl}/transactions?userId=${user._id}&filterTime=${filterTime}`;
        if (sortTime) link += `&sortTime=${sortTime}`;
        if (sortMoney) link += `&sortMoney=${sortMoney}`;
        if (type) link += `&type=${type}`;

        try {
            setLoading(true);
            const response = await axios.get(link);
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

    useEffect(() => {
        getTransactions();
    }, [callTransactions, filterTime, reRender]);

    return (
        <View style={styles.container}>
            {/* Filter Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={filterModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setFilterModal((prev) => !prev);
                }}
            >
                <View style={styles.filterModal}>
                    <View style={styles.filterCart}>
                        <View style={styles.flexRowBetween}>
                            <Text style={styles.section}>Filter Transaction</Text>
                            <TouchableOpacity onPress={() => setFilter({})}>
                                <Text style={styles.resetBtn}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.section}>Filter By</Text>
                            <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter((prev) => ({ ...prev, type: "Income" }));
                                    }}
                                >
                                    <Text
                                        style={
                                            filter.type === "Income"
                                                ? [styles.selectItem, styles.selectedItem]
                                                : styles.selectItem
                                        }
                                    >
                                        Income
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter((prev) => ({ ...prev, type: "Expense" }));
                                    }}
                                >
                                    <Text
                                        style={
                                            filter.type === "Expense"
                                                ? [styles.selectItem, styles.selectedItem]
                                                : styles.selectItem
                                        }
                                    >
                                        Expense
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter((prev) => ({ ...prev, type: "Transfer" }));
                                    }}
                                >
                                    <Text
                                        style={
                                            filter.type === "Transfer"
                                                ? [styles.selectItem, styles.selectedItem]
                                                : styles.selectItem
                                        }
                                    >
                                        Transfer
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.section}>Sort By</Text>
                            <View style={[styles.flexRowBetween, { marginTop: 10 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter((prev) => ({ ...prev, sortMoney: "desc" }));
                                    }}
                                >
                                    <Text
                                        style={
                                            filter.sortMoney === "desc"
                                                ? [styles.selectItem, styles.selectedItem]
                                                : styles.selectItem
                                        }
                                    >
                                        Highest
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter((prev) => ({ ...prev, sortMoney: "asc" }));
                                    }}
                                >
                                    <Text
                                        style={
                                            filter.sortMoney === "asc"
                                                ? [styles.selectItem, styles.selectedItem]
                                                : styles.selectItem
                                        }
                                    >
                                        Lowest
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setFilter((prev) => ({ ...prev, sortTime: "desc" }));
                                    }}
                                >
                                    <Text
                                        style={
                                            filter.sortTime === "desc"
                                                ? [styles.selectItem, styles.selectedItem]
                                                : styles.selectItem
                                        }
                                    >
                                        Newest
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.section}>Category</Text>
                            <View style={styles.flexRowBetween}>
                                <Text>Choose Category</Text>
                                <TouchableOpacity>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text>0 Selected</Text>
                                        <ArrowRightIcon fill={primaryColor} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.applyBtn}>
                            <MainButton
                                buttonSize="large"
                                buttonType="primary"
                                textType="primaryText"
                                title="Apply"
                                pressHandler={() => {
                                    setFilterModal(false);
                                    setReRender((prev) => !prev);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.flexRowBetween}>
                <SelectDropdown
                    data={["Today", "Week", "Month", "Year"]}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setFilterTime(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <TouchableOpacity>
                                <View style={[styles.timeSelector, styles.flexRowBetween]}>
                                    <ArrowDownIcon width={24} height={24} fill={primaryColor} />
                                    <Text style={{ marginLeft: 5, fontSize: 14, fontWeight: "bold" }}>
                                        {filterTime}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View
                                style={{
                                    ...styles.dropdownItemStyle,
                                    ...(isSelected && { backgroundColor: "#D2D9DF" }),
                                }}
                            >
                                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
                <TouchableOpacity onPress={() => setFilterModal(true)}>
                    <View style={styles.filterBtn}>
                        <FilterIcon width={24} height={24} fill="#000" />
                        {Object.keys(filter).length > 0 && (
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "#fff",
                                    paddingVertical: 5,
                                    paddingHorizontal: 8,
                                    borderRadius: 16,
                                    backgroundColor: primaryColor,
                                    position: "absolute",
                                    left: 16,
                                    top: -10,
                                }}
                            >
                                {Object.keys(filter).length}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ExpenseReport")}>
                <View style={[styles.reportBtn, styles.flexRowBetween]}>
                    <Text style={{ color: primaryColor, fontSize: 16 }}>See your financial report</Text>
                    <ArrowRightIcon fill={primaryColor} />
                </View>
            </TouchableOpacity>

            <ScrollView>
                {transactions &&
                    transactions.map((transaction) => {
                        return (
                            <TransactionItem
                                prevScreen="HomeTransaction"
                                transaction={transaction}
                                navigation={navigation}
                            />
                        );
                    })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingBottom: 64,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    flexRowBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timeSelector: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 32,
    },
    filterBtn: {
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        position: "relative",
    },
    reportBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#EEE5FF",
        justifyContent: "space-between",
        marginVertical: 18,
        borderRadius: 10,
    },
    filterModal: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.16)",
    },
    filterCart: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingTop: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    section: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold",
    },
    resetBtn: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: "#EEE5FF",
        borderRadius: 15,
        color: primaryColor,
    },
    selectItem: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 16,
    },
    selectedItem: {
        color: "#fff",
        backgroundColor: "#9999cc",
    },
    applyBtn: {
        alignItems: "center",
        marginVertical: 18,
    },
    dropdownMenuStyle: {
        borderRadius: 10,
        overflow: "hidden",
    },
    dropdownItemStyle: {
        padding: 10,
    },
});
