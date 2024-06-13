import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

import TransactionItem from "../../components/TransactionItem";
import CategoryCard from "../../components/CategoryCard";

import ArrowLeftIcon from "../../assets/svg/arrow-left.svg";
import ArrowDownIcon from "../../assets/svg/arrow-down-2.svg";
import LineChartIcon from "../../assets/svg/line-chart-2.svg";
import PieChartIcon from "../../assets/svg/pie-chart.svg";
import SortIcon from "../../assets/svg/sort-highest-lowest.svg";

import { primaryColor } from "../../styles/global";
import { GlobalContext } from "../../context/GlobalContext";
import { apiBaseUrl } from "../../config";

import { BarChart, LineChart, LineChartBicolor, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import SelectDropdown from "react-native-select-dropdown";

const colors = {
    Shopping: "#FCAC12",
    Food: "#FD3C4A",
    Subscription: "#7F3DFF",
    Salary: "#00A86B",
    Transporting: "#0077FF",
    Travel: "#0077FA",
};

export default function ChartReport({ route, navigation }) {
    const [chartType, setChartType] = useState("LineChart");
    const [transactionType, setTransactionType] = useState("Expense");
    const [categoryType, setCategoryType] = useState("Category");
    const [transactionList, setTransactionList] = useState();
    const [lineChartData, setLineChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [filterTime, setFilterTime] = useState("Month");

    const lineData = [
        { value: 10 },
        { value: 20 },
        { value: 18 },
        { value: 40 },
        { value: 36 },
        { value: 60 },
        { value: 54 },
        { value: 85 },
        { value: 10 },
        { value: 20 },
        { value: 18 },
        { value: 40 },
        { value: 36 },
        { value: 60 },
        { value: 54 },
        { value: 85 },
    ];

    const { user, setLoading } = useContext(GlobalContext);

    const calcMoneyTotal = (transactionList) => {
        return transactionList.reduce((result, transaction) => {
            return result + transaction.money;
        }, 0);
    };

    const renderChartSelectItem = (type) => {
        const iconColor = type === chartType ? "#fff" : primaryColor;
        const backgroundColor = type === chartType ? primaryColor : "#fff";

        return (
            <TouchableOpacity onPress={() => setChartType(type)}>
                <View style={{ padding: 8, backgroundColor: backgroundColor }}>
                    {type === "LineChart" ? <LineChartIcon fill={iconColor} /> : <PieChartIcon fill={iconColor} />}
                </View>
            </TouchableOpacity>
        );
    };

    const renderTransactionSelectItem = (type) => {
        const textColor = type === transactionType ? "#fff" : "#000";
        const backgroundColor = type === transactionType ? primaryColor : "#F1F1FA";

        return (
            <View style={{ flex: 1, padding: 13, backgroundColor: backgroundColor, borderRadius: 20 }}>
                <TouchableOpacity onPress={() => setTransactionType(type)}>
                    <Text style={{ fontSize: 16, fontWeight: "medium", textAlign: "center", color: textColor }}>
                        {type}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const getTransactionList = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${apiBaseUrl}/transactions?userId=${user._id}&type=${transactionType}&filterTime=${filterTime}`
            );
            if (response.status === 200) {
                setTransactionList(response.data);

                //handle data of line chart
                setLineChartData(
                    response.data.map((item) => {
                        return {
                            value: item.money,
                        };
                    })
                );

                //handle data of pie chart
                const moneyTotal = calcMoneyTotal(response.data);
                setPieChartData(() => {
                    if (transactionType === "Expense") {
                        const categoryList = ["Shopping", "Food", "Travel", "Subscription", "Transporting"];
                        const result = categoryList.map((category) => {
                            return {
                                value: Math.floor(
                                    (response.data.reduce((result, transaction) => {
                                        return transaction.categoryName === category
                                            ? result + transaction.money
                                            : result;
                                    }, 0) *
                                        100) /
                                        moneyTotal
                                ),
                                color: colors[category],
                            };
                        });
                        setPieChartData(result.filter((element) => element.value > 0));
                    }
                });

                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get list of transactions failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getTransactionList();
    }, [transactionType, filterTime]);

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 16 }}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeTransaction")}>
                        <ArrowLeftIcon fill="#000" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily: "Inter-SemiBold" }}>Financial Report</Text>
                    <Text style={{ color: "#fff" }}>abc</Text>
                </View>

                <View style={styles.header}>
                    <SelectDropdown
                        data={["Today", "Week", "Month", "Year"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setFilterTime(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <TouchableOpacity>
                                    <View style={[styles.timeSelector]}>
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

                    <View style={styles.chartSelectContainer}>
                        {renderChartSelectItem("LineChart")}
                        {renderChartSelectItem("PieChart")}
                    </View>
                </View>

                {chartType === "LineChart" && transactionList && (
                    <Text
                        style={{ marginVertical: 16, fontSize: 32, fontWeight: "bold", color: "#000" }}
                    >{`$ ${calcMoneyTotal(transactionList)}`}</Text>
                )}
            </View>

            <View style={{ alignItems: "center" }}>
                {chartType === "LineChart" ? (
                    <LineChart
                        thickness={6}
                        color={primaryColor}
                        noOfSections={3}
                        areaChart
                        data={lineChartData}
                        curved
                        startFillColor={primaryColor}
                        endFillColor={primaryColor}
                        startOpacity={0.24}
                        endOpacity={0}
                        spacing={32}
                        initialSpacing={10}
                        yAxisColor={primaryColor}
                        xAxisColor={primaryColor}
                        // hideAxesAndRules
                        // hideDataPoints
                        height={180}
                    />
                ) : (
                    <PieChart
                        data={pieChartData}
                        radius={150}
                        donut
                        showText
                        // showValuesAsLabels
                        // showTextBackground
                        textBackgroundColor="#333"
                        textBackgroundRadius={22}
                        textColor="white"
                        textSize={16}
                        fontWeight="bold"
                        showGradient
                        centerLabelComponent={() => {
                            return (
                                <Text style={{ fontSize: 32, fontWeight: "bold", color: "#000" }}>{`$${calcMoneyTotal(
                                    transactionList
                                )}`}</Text>
                            );
                        }}
                        height={180}
                        innerRadius={120}
                    />
                )}
            </View>

            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                <View style={styles.transactionSelectContainer}>
                    {renderTransactionSelectItem("Expense")}
                    {renderTransactionSelectItem("Income")}
                </View>

                <View
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <SelectDropdown
                        data={["Transaction", "Category"]}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setCategoryType(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.timeSelector}>
                                    <ArrowDownIcon width={24} height={24} fill={primaryColor} />
                                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>{categoryType}</Text>
                                </View>
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
                    <TouchableOpacity>
                        <View style={{ padding: 5, borderWidth: 1, borderColor: "#ccc", borderRadius: 10 }}>
                            <SortIcon fill="#000" />
                        </View>
                    </TouchableOpacity>
                </View>

                {transactionList && (
                    <ScrollView style={{ height: 100, marginTop: 16 }}>
                        {transactionList.map((item) => {
                            if (categoryType === "Category") {
                                return <CategoryCard transaction={item} />;
                            }
                            return (
                                <TransactionItem prevScreen="ChartReport" transaction={item} navigation={navigation} />
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        backgroundColor: "#fff",
    },
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16 },
    timeSelector: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 32,
    },
    chartSelectContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        overflow: "hidden",
    },
    transactionSelectContainer: {
        flexDirection: "row",
        backgroundColor: "#F1F1FA",
        alignItems: "center",
        padding: 2,
        borderRadius: 20,
        marginTop: 10,
    },
    dropdownMenuStyle: {
        borderRadius: 10,
        overflow: "hidden",
    },
    dropdownItemStyle: {
        padding: 10,
    },
    dropdownItemTextStyle: {
        fontSize: 14,
    },
});
