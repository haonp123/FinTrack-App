import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import ArrowLeftIcon from "../../assets/svg/arrow-left.svg";
import IncomeIcon from "../../assets/svg/income.svg";
import ExpenseIcon from "../../assets/svg/expense.svg";

export default function AddTransaction({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ArrowLeftIcon fill="#000" />
                    <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Go back</Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginTop: 42 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CreateTransaction", { type: "Income" });
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#00A86B",
                            flexDirection: "row",
                            padding: 16,
                            borderRadius: 32,
                            alignItems: "center",
                        }}
                    >
                        <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 16 }}>
                            <IncomeIcon fill="#00A86B" />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text
                                style={{
                                    fontFamily: "Inter-Medium",
                                    color: "#FCFCFC",
                                    fontSize: 14,
                                }}
                            >
                                Income
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{ height: 30 }}></View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("CreateTransaction", { type: "Expense" });
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#FD3C4A",
                            flexDirection: "row",
                            padding: 16,
                            borderRadius: 32,
                            alignItems: "center",
                        }}
                    >
                        <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 16 }}>
                            <ExpenseIcon fill="#FD3C4A" />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text
                                style={{
                                    fontFamily: "Inter-Medium",
                                    color: "#FCFCFC",
                                    fontSize: 14,
                                }}
                            >
                                Expense
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 32,
        paddingHorizontal: 16,
    },
});
