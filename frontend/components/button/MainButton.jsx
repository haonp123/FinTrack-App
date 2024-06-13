import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

function MainButton({ buttonSize, buttonType, textType, title, pressHandler }) {
    return (
        <TouchableOpacity onPress={pressHandler}>
            <View style={[styles[buttonSize], styles[buttonType], styles.button]}>
                <Text style={[styles.title, styles[textType]]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const primaryColor = "#7F3DFF";

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        height: 56,
    },
    title: {
        fontFamily: "Inter-SemiBold",
        fontSize: 18,
    },
    large: {
        width: 340,
    },
    small: {
        width: 165,
    },
    primary: {
        backgroundColor: primaryColor,
    },
    primaryText: {
        color: "#fff",
    },
    secondary: {
        backgroundColor: "#EEE5FF",
    },
    secondaryText: {
        color: primaryColor,
    },
    ghost: {
        backgroundColor: "#F1F1FA",
    },
    ghostText: {
        color: "#212325",
    },
});

export default MainButton;
