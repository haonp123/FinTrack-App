import { View, Text, TouchableOpacity } from "react-native";

import RecurringBillIcon from "../assets/svg/recurring-bill.svg";
import RestaurantIcon from "../assets/svg/restaurant.svg";
import CarIcon from "../assets/svg/car.svg";
import SalaryIcon from "../assets/svg/salary.svg";
import PlaneIcon from "../assets/svg/plane-solid.svg";
import ShoppingBagIcon from "../assets/svg/shopping-bag.svg";

const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatDate = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const dateDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${dateDate}`;
};

export default function TransactionItem({ prevScreen, transaction, navigation }) {
    const { money, type } = transaction;
    const color = type === "Income" ? "#00A86B" : "#FD3C4A";

    const renderIcon = (categoryName) => {
        switch (categoryName) {
            case "Shopping":
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#FCEED4" }}>
                        <ShoppingBagIcon width={40} height={40} fill="orange" />
                    </View>
                );
            case "Subscription":
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#EEE5FF" }}>
                        <RecurringBillIcon width={40} height={40} fill="#7F3DFF" />
                    </View>
                );
            case "Food":
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#FDD5D7" }}>
                        <RestaurantIcon width={40} height={40} fill="#FD3C4A" />
                    </View>
                );
            case "Salary":
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#CFFAEA" }}>
                        <SalaryIcon width={40} height={40} />
                    </View>
                );
            case "Transporting":
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#BDDCFF" }}>
                        <CarIcon width={40} height={40} fill="#0077FF" />
                    </View>
                );

            case "Travel":
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#85caed" }}>
                        <PlaneIcon width={40} height={40} fill="#0077FF" />
                    </View>
                );
            default:
                return (
                    <View style={{ padding: 10, borderRadius: 16, backgroundColor: "#ccc" }}>
                        <Text>{categoryName[0]}</Text>
                    </View>
                );
        }
    };

    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#FCFCFC",
                padding: 16,
                borderRadius: 24,
                marginBottom: 10,
            }}
            onPress={() => navigation.navigate("DetailTransaction", { id: transaction._id, prevScreen: prevScreen })}
        >
            <View style={{ flexDirection: "row" }}>
                {renderIcon(transaction.categoryName)}
                <View style={{ marginLeft: 10, paddingVertical: 5, justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16, fontFamily: "Inter-Medium" }}>{transaction.categoryName}</Text>
                    <Text style={{ fontSize: 13, fontFamily: "Inter-Medium", color: "#91919F" }}>
                        {transaction.title}
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 16, fontFamily: "Inter-SemiBold", color: color, textAlign: "right" }}>
                    {type === "Income" ? `+ $${money}` : `- $${money}`}
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 13, fontFamily: "Inter-Medium", color: "#91919F" }}>
                        {formatTime(transaction.createdAt)}
                    </Text>
                    <Text style={{ fontSize: 13, fontFamily: "Inter-Medium", color: "#91919F" }}>
                        {formatDate(transaction.createdAt)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
