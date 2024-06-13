import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView, Modal } from "react-native";

import ArrowLeftIcon from "../../assets/svg/arrow-left.svg";
import TrashIcon from "../../assets/svg/trash.svg";
import SuccessIcon from "../../assets/svg/success.svg";
import CloseIcon from "../../assets/svg/close.svg";

import MainButton from "../../components/button/MainButton";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { apiBaseUrl } from "../../config";
import { primaryColor } from "../../styles/global";

const formatDate = (time) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "Jun",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const value = new Date(time);

    const day = days[value.getDay()];
    const date = value.getDate();
    const month = months[value.getMonth()];
    const year = value.getFullYear();

    const hours = value.getHours();
    const minutes = value.getMinutes();

    return `${day} ${date} ${month} ${year} - ${hours}:${minutes}`;
};

export default function DetailTransaction({ route, navigation }) {
    const [transaction, setTransaction] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false);

    const { prevScreen, id } = route.params;
    const { setLoading, setCallTransactions } = useContext(GlobalContext);

    const getTransaction = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBaseUrl}/transactions/${id}`);
            if (response.status === 200) {
                setTransaction(response.data);
                setLoading(false);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Get Transaction failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${apiBaseUrl}/transactions/${id}`);
            setLoading(false);
            if (response.status === 200) {
                // 200 for OK
                setOpenSuccessModal(true);
                setCallTransactions((prev) => !prev);
            } else {
                console.log("Error:", response.data.message);
                setError(response.data.message || "Delete Transaction failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    const colors = {
        Expense: "#FD3C4A",
        Income: "#00A86B",
        Transfer: "#0077FF",
    };

    const renderInfo = (transaction) => {
        const { categoryName, description, money, type, title, imageUrl } = transaction;

        return (
            <View>
                <View style={[styles.cartColor, { backgroundColor: colors[type] }]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate(prevScreen);
                            }}
                        >
                            <ArrowLeftIcon fill="#fff" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, color: "#fff", fontFamily: "Inter-Bold" }}>
                            Detail Transaction
                        </Text>
                        <TouchableOpacity onPress={() => setOpenDeleteModal(true)}>
                            <TrashIcon fill="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", marginVertical: 32 }}>
                        <Text style={{ color: "#fff", fontSize: 48, fontWeight: "bold" }}>${money}</Text>
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "medium", marginVertical: 16 }}>
                            {title}
                        </Text>
                        <Text style={{ color: "#fff", fontSize: 13, fontWeight: "medium" }}>
                            {formatDate(transaction.createdAt)}
                        </Text>
                    </View>
                </View>

                <View style={{ position: "absolute", top: "90%", width: "100%" }}>
                    <View style={{ marginHorizontal: 16 }}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                paddingVertical: 12,
                                borderRadius: 16,
                                backgroundColor: "#fff",
                                paddingHorizontal: 24,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "100%",
                                }}
                            >
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "medium", color: "#91919F" }}>Type</Text>
                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        {type}
                                    </Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "medium", color: "#91919F" }}>
                                        Category
                                    </Text>
                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        {categoryName}
                                    </Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontSize: 14, fontWeight: "medium", color: "#91919F" }}>Wallet</Text>
                                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "bold", color: "#000" }}>
                                        Wallet
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                marginTop: 24,
                                borderBottomWidth: 1,
                                borderColor: "#ccc",
                                borderStyle: "dashed",
                            }}
                        ></View>

                        <ScrollView style={{ height: 320 }}>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#91919F" }}>Description</Text>
                                <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "medium" }}>{description}</Text>
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#91919F" }}>Attachment</Text>
                                {imageUrl ? (
                                    <TouchableOpacity onPress={() => setOpenImageModal(true)}>
                                        <Image
                                            style={{ marginTop: 10, width: "100%", height: 120, borderRadius: 16 }}
                                            source={{
                                                uri: imageUrl,
                                            }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <Text>No Image</Text>
                                )}
                            </View>
                        </ScrollView>

                        <View style={{ alignItems: "center", marginTop: 16 }}>
                            <MainButton
                                buttonSize="large"
                                buttonType="primary"
                                textType="primaryText"
                                title="Edit"
                                pressHandler={() => {}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <View style={styles.container}>
            {/* Delete Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={openDeleteModal}
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
                            Remove this transaction
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
                            Are you sure do you wanna remove this transaction?
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <MainButton
                                buttonSize="small"
                                buttonType="secondary"
                                textType="secondaryText"
                                title="No"
                                pressHandler={() => {
                                    setOpenDeleteModal((prev) => !prev);
                                }}
                            />
                            <MainButton
                                buttonSize="small"
                                buttonType="primary"
                                textType="primaryText"
                                title="Yes"
                                pressHandler={() => {
                                    handleDelete();
                                    setOpenDeleteModal((prev) => !prev);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

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
                            Transaction has been successfully removed
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenSuccessModal(false);
                                navigation.navigate(prevScreen);
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

            {/* Image Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={openImageModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    setOpenImageModal((prev) => !prev);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <View>
                        <TouchableOpacity onPress={() => setOpenImageModal(false)}>
                            <View style={{ alignItems: "flex-end" }}>
                                <View style={{ padding: 10, backgroundColor: "#fff", borderRadius: 24 }}>
                                    <CloseIcon fill="#000" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {transaction && (
                            <Image
                                resizeMode="contain"
                                width={280}
                                height={500}
                                source={{ uri: transaction.imageUrl }}
                                style={{ marginTop: 16 }}
                            />
                        )}
                    </View>
                </View>
            </Modal>

            {transaction && renderInfo(transaction)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    cartColor: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: "relative",
    },
});
