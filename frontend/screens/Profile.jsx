import React, { useContext, useState } from "react";
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import EditIcon from "../assets/svg/edit.svg";
import LogOutIcon from "../assets/svg/logout.svg";
import WalletIcon from "../assets/svg/wallet-3.svg";
import SettingsIcon from "../assets/svg/settings.svg";

import MainButton from "../components/button/MainButton";
import { GlobalContext } from "../context/GlobalContext";
import { primaryColor } from "../styles/global";

export default function Profile({ navigation }) {
    const [openModal, setOpenModal] = useState(false);

    const { user, setUser } = useContext(GlobalContext);

    const itemList = [
        {
            title: "Account",
            Icon: <WalletIcon width={32} height={32} fill="red" />,
            color: "#EEE5FF",
        },
        {
            title: "Settings",
            Icon: <SettingsIcon width={32} height={32} fill="red" />,
            color: "#EEE5FF",
        },
        {
            title: "Logout",
            Icon: <LogOutIcon width={32} height={32} fill="red" />,
            color: "#FFE2E4",
            onPress: () => {
                setOpenModal(true);
            },
        },
    ];

    return (
        <View style={styles.container}>
            {/* Logout Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={openModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setModalVisible((prev) => !prev);
                }}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.16)" }}>
                    <View
                        style={{
                            padding: 16,
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                marginBottom: 10,
                                fontFamily: "Inter-SemiBold",
                                textAlign: "center",
                            }}
                        >
                            Logout?
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 24,
                                fontFamily: "Inter-Medium",
                                color: "#91919F",
                                textAlign: "center",
                            }}
                        >
                            Are you sure do you wanna logout?
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <MainButton
                                buttonSize="small"
                                buttonType="secondary"
                                textType="secondaryText"
                                title="No"
                                pressHandler={() => {
                                    setOpenModal((prev) => !prev);
                                }}
                            />
                            <MainButton
                                buttonSize="small"
                                buttonType="primary"
                                textType="primaryText"
                                title="Yes"
                                pressHandler={() => {
                                    console.log("Logout Successfully");
                                    setOpenModal((prev) => !prev);
                                    setUser(undefined);
                                    navigation.navigate("HomeOnboard");
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <View
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 50 }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            padding: 5,
                            backgroundColor: "#fff",
                            borderRadius: 50,
                            borderWidth: 3,
                            borderColor: primaryColor,
                        }}
                    >
                        <Image style={{ width: 80, height: 80, borderRadius: 50 }} source={{ uri: user.avatarUrl }} />
                    </View>
                    <View style={{ marginLeft: 16, justifyContent: "center" }}>
                        <Text style={{ color: "#91919F", fontSize: 14, fontWeight: "medium" }}>Username</Text>
                        <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>{user.name}</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <EditIcon width={40} height={40} stroke="#000" />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 24, borderRadius: 16, overflow: "hidden" }}>
                <FlatList
                    data={itemList}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 1, backgroundColor: "#F6F6F6" }}></View>;
                    }}
                    renderItem={({ item, index }) => {
                        const { Icon, title, color, onPress } = item;

                        return (
                            <TouchableOpacity onPress={onPress}>
                                <View style={styles.item}>
                                    <View style={{ backgroundColor: color, padding: 10, borderRadius: 16 }}>
                                        {Icon}
                                    </View>
                                    <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F6F6F6",
    },
    item: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});
