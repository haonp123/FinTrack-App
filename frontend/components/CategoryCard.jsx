import React from "react";
import { StyleSheet, Text, View } from "react-native";

const colors = {
    Shopping: "#FCAC12",
    Food: "#FD3C4A",
    Subscription: "#7F3DFF",
    Salary: "#00A86B",
    Transporting: "#0077FF",
    Travel: "#0077FA",
};

export default function CategoryCard({ transaction }) {
    const { categoryName, money, type } = transaction;

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 25,
                        borderColor: "#F1F1FA",
                        backgroundColor: "#FCFCFC",
                    }}
                >
                    <View
                        style={{ width: 14, height: 14, borderRadius: 10, backgroundColor: colors[categoryName] }}
                    ></View>
                    <Text style={{ fontSize: 14, fontWeight: "bold", marginLeft: 8 }}>{categoryName}</Text>
                </View>
                <Text style={[styles.prices, type == "income" && { color: "green" }]}>{`- $${money}`}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <View style={styles.bar}>
                    <View style={[styles.fillBar, { width: `50%`, backgroundColor: `${colors[categoryName]}` }]}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 15,
        marginTop: 16,
        backgroundColor: "#e8f7f9",
    },
    title: {
        fontWeight: "bold",
    },
    prices: {
        color: "red",
        fontSize: 24,
    },
    bar: {
        backgroundColor: "gray",
        width: "100%",
        height: 10,
        borderRadius: 25,
        overflow: "hidden",
    },
    fillBar: {
        backgroundColor: "red",
        height: 10,
        borderRadius: 25,
    },
    circle: {
        backgroundColor: "red",
        height: 16,
        width: 16,
        borderRadius: 25,
    },
});
