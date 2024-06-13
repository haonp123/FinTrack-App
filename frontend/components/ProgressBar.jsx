import { Text, View, StyleSheet } from "react-native";

export default function ProgressBar({ thumbColor, value }) {
    return (
        <View
            style={{
                height: 12,
                backgroundColor: "#F1F1FA",
                borderRadius: 10,
                overflow: "hidden",
            }}
        >
            <View style={{ backgroundColor: thumbColor, width: `${value}%`, height: "100%", borderRadius: 10 }}></View>
        </View>
    );
}
