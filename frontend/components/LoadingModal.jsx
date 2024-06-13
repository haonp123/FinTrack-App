import { useContext } from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";

import { primaryColor } from "../styles/global";
import { GlobalContext } from "../context/GlobalContext";

export default function LoadingModal() {
    const { loading } = useContext(GlobalContext);

    return (
        <Modal animationType="fade" transparent={true} visible={loading}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={primaryColor} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
});
