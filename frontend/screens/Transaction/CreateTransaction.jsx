import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from "react-native";
import { useState, useContext } from "react";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

import ArrowLeftIcon from "../../assets/svg/arrow-left.svg";
import ArrowDownIcon from "../../assets/svg/arrow-down-2.svg";
import AttachmentIcon from "../../assets/svg/attachment.svg";
import SuccessIcon from "../../assets/svg/success.svg";

import { apiBaseUrl } from "../../config";
import { GlobalContext } from "../../context/GlobalContext";
import MainButton from "../../components/button/MainButton";
import { categoryList } from "../../constants";
import { primaryColor } from "../../styles/global";

export default function CreateTransaction({ route, navigation }) {
    const colors = {
        Income: "#00A86B",
        Expense: "#FD3C4A",
    };

    const { type } = route.params;
    const [money, setMoney] = useState(0);
    const [categoryName, setCategoryName] = useState();
    const [wallet, setWallet] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    const { user, setLoading, setCallTransactions } = useContext(GlobalContext);

    const handleCreate = async (body) => {
        try {
            setLoading(true);
            console.log(body);
            const response = await axios.post(`${apiBaseUrl}/transactions`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setLoading(false);
            if (response.status === 201) {
                // 201 for created
                setCallTransactions((prev) => !prev);
                setOpenSuccessModal(true);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Create New Transaction failed");
            }
        } catch (error) {
            setLoading(false);
            console.log("Error details:", error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors[type], paddingTop: 32 }}>
            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={openSuccessModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setModalVisible((prev) => !prev);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.16)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            width: 330,
                            alignItems: "center",
                            paddingTop: 20,
                            borderRadius: 16,
                        }}
                    >
                        <SuccessIcon fill={primaryColor} width={64} height={64} />
                        <Text style={{ fontSize: 14, fontWeight: "medium", marginVertical: 10 }}>
                            Transaction has been successfully created
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenSuccessModal(false);
                                navigation.navigate("HomeTransaction");
                            }}
                        >
                            <View style={{ borderTopWidth: 1, borderColor: "#ccc", width: 320, paddingVertical: 10 }}>
                                <Text
                                    style={{
                                        color: primaryColor,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                    }}
                                >
                                    OK
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ paddingHorizontal: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => navigation.navigate("AddTransaction")}>
                        <ArrowLeftIcon fill="#fff" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>{type}</Text>
                    <Text style={{ color: colors[type] }}>abc</Text>
                </View>

                <View style={{ marginTop: 64 }}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>How much?</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
                        <Text style={{ color: "#fff", fontSize: 42, fontWeight: "bold" }}>$</Text>
                        <TextInput
                            defaultValue={0}
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                if (value === "") {
                                    setMoney(0);
                                } else {
                                    setMoney(value);
                                }
                            }}
                            value={money}
                            placeholder="0"
                            placeholderTextColor="#fff"
                            style={{ color: "#fff", marginLeft: 5, fontSize: 42, fontWeight: "bold" }}
                        />
                    </View>
                </View>
            </View>

            <View
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    paddingTop: 24,
                    paddingHorizontal: 16,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                }}
            >
                <SelectDropdown
                    data={categoryList}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                        setCategoryName(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {selectedItem ? (
                                    <Text style={{ color: "#000" }}>{selectedItem}</Text>
                                ) : (
                                    <Text style={{ color: "#91919F" }}>Category</Text>
                                )}
                                <ArrowDownIcon fill="#91919F" />
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

                <View
                    style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: "#F1F1FA",
                        borderRadius: 16,
                        marginTop: 16,
                    }}
                >
                    <TextInput
                        value={title}
                        onChangeText={(value) => setTitle(value)}
                        placeholderTextColor="#91919F"
                        placeholder="Title"
                    />
                </View>

                <View
                    style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderWidth: 1,
                        borderColor: "#F1F1FA",
                        borderRadius: 16,
                        marginVertical: 16,
                    }}
                >
                    <TextInput
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                        placeholderTextColor="#91919F"
                        placeholder="Description"
                    />
                </View>

                <TouchableOpacity>
                    <View
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#F1F1FA",
                            borderRadius: 16,
                            justifyContent: "space-between",
                        }}
                    >
                        {wallet ? (
                            <Text style={{ color: "#000" }}>{wallet}</Text>
                        ) : (
                            <Text style={{ color: "#91919F" }}>Wallet</Text>
                        )}
                        <ArrowDownIcon fill="#91919F" />
                    </View>
                </TouchableOpacity>

                <View style={{ height: 32 }}></View>

                <TouchableOpacity>
                    <View
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#F1F1FA",
                            borderRadius: 16,
                            justifyContent: "center",
                            borderStyle: "dashed",
                        }}
                    >
                        <AttachmentIcon fill="#91919F" />
                        <Text style={{ marginLeft: 10 }}>Add attachment</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 32 }}>
                    <MainButton
                        buttonSize="large"
                        buttonType="primary"
                        textType="primaryText"
                        title="Continue"
                        pressHandler={() => {
                            handleCreate({
                                categoryName,
                                userId: user._id,
                                title,
                                description,
                                money: parseInt(money),
                                type: type,
                            });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    dropdownButtonStyle: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F1FA",
        borderRadius: 16,
        justifyContent: "space-between",
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 16,
        color: "#91919F",
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: "#E9ECEF",
        borderRadius: 8,
    },
    dropdownItemStyle: {
        padding: 15,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#151E26",
    },
});
