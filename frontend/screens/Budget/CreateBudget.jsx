import React, { useState, useContext } from "react";
import {
    TouchableOpacity,
    Switch,
    View,
    Text,
    TextInput,
    FlatList,
    Platform,
    StatusBar,
    StyleSheet,
    Alert,
} from "react-native";
import { primaryColor, globalStyles } from "../../styles/global";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import MainButton from "../../components/button/MainButton";

import ArrowDownIcon from "../../assets/svg/arrow-down-2.svg";
import CloseIcon from "../../assets/svg/close.svg";

import { GlobalContext } from "../../context/GlobalContext";
import { apiBaseUrl } from "../../config";
import { categoryList } from "../../constants";

import axios from "axios";

const budgetCategoryList = [
    {
        name: "Shopping",
        value: "Shopping",
    },
    {
        name: "Transporting",
        value: "Transporting",
    },
    {
        name: "Travel",
        value: "Travel",
    },
    {
        name: "Food",
        value: "Food",
    },
    {
        name: "Subscription",
        value: "Subscription",
    },
];

function CreateBudget({ navigation }) {
    const [maxMoney, setMaxMoney] = useState(0);
    const [isAlert, setIsAlert] = useState(false);
    const [categoryName, setCategoryName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [alertPoint, setAlertPoint] = useState(0);

    const [open, setOpen] = useState(false);
    const { user, setLoading, setCallBudgets } = useContext(GlobalContext);

    const Item = (props) => {
        console.log(props.item);
        return (
            <TouchableOpacity onPress={() => props.onPress(props)} activeOpacity={0.5}>
                <View style={categoryName === props.item.value ? styles.selectedItemContainer : styles.itemContainer}>
                    <Text style={categoryName === props.item.value ? styles.selectedItemText : styles.itemText}>
                        {props.item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const handleCreate = async (body) => {
        try {
            setLoading(true);
            const response = await axios.post(`${apiBaseUrl}/budgets`, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setLoading(false);
            if (response.status === 201) {
                // 201 for created
                // Alert.alert("Create New Budget Successful");
                setCallBudgets((prev) => !prev);
                navigation.navigate("DetailBudget", { budgetId: response.data._id });
            } else {
                console.log("Error:", response.data.message);
                // setError(response.data.message || "Create New Budget failed");
            }
        } catch (error) {
            console.log("Error details:", error.response ? error.response.data : error.message);
            setLoading(false);
            // setError(error.response ? error.response.data.message : "An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 16 }}>
                <Text
                    style={{
                        fontFamily: "Inter-SemiBold",
                        fontSize: 18,
                        color: "#FCFCFC",
                    }}
                >
                    How much do you want to spend?
                </Text>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text style={styles.moneyText}>$</Text>
                    <TextInput
                        style={styles.moneyText}
                        onChangeText={(value) => {
                            if (value === "") {
                                setMaxMoney(0);
                            } else {
                                setMaxMoney(value);
                            }
                        }}
                        value={maxMoney}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.cartContainer}>
                <View>
                    <DropDownPicker
                        schema={{
                            label: "name",
                            value: "value",
                        }}
                        placeholder="Category"
                        placeholderStyle={{
                            fontFamily: "Inter-Regular",
                            fontSize: 16,
                            color: "#91919F",
                        }}
                        ArrowDownIconComponent={() => <ArrowDownIcon width={32} height={32} fill="#91919F" />}
                        CloseIconComponent={() => <CloseIcon width={40} height={40} fill="#fff" />}
                        open={open}
                        value={categoryName}
                        items={budgetCategoryList}
                        renderListItem={(props, category) => <Item {...props} />}
                        itemKey="value"
                        itemSeparator={true}
                        closeAfterSelecting={true}
                        setOpen={setOpen}
                        setValue={setCategoryName}
                        listMode="MODAL"
                        modalTitle="Select an category"
                        modalTitleStyle={{
                            marginLeft: 5,
                            color: "#fff",
                            fontSize: 18,
                            fontFamily: "Inter-SemiBold",
                        }}
                        modalProps={{
                            animationType: "fade",
                        }}
                        modalContentContainerStyle={{
                            backgroundColor: primaryColor,
                        }}
                        listItemLabelStyle={{
                            color: "#fff",
                        }}
                        itemSeparatorStyle={{
                            backgroundColor: "#fff",
                        }}
                    />
                </View>
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 20 }}
                >
                    <View style={{ flex: 1.5 }}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: "Inter-Medium",
                            }}
                        >
                            Receive Alert
                        </Text>
                        <Text
                            style={{
                                color: "#91919F",
                            }}
                        >
                            Receive alert when it reaches some point.
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isAlert ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsAlert((prev) => !prev)}
                            value={isAlert}
                        />
                    </View>
                </View>
                {isAlert && (
                    <Slider
                        style={{ width: "100%", height: 100 }}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor={primaryColor}
                        maximumTrackTintColor="white"
                    />
                )}
                <View style={{ alignItems: "center" }}>
                    <MainButton
                        pressHandler={() => {
                            const body = {
                                userId: user._id,
                                categoryName,
                                maxMoney: parseInt(maxMoney),
                                isAlert,
                                alertPoint,
                            };
                            handleCreate(body);
                            // navigation.navigate("DetailBudget");
                        }}
                        buttonSize="large"
                        buttonType="primary"
                        textType="primaryText"
                        title="Continue"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: primaryColor,
    },
    moneyText: {
        fontSize: 64,
        color: "#FCFCFC",
        fontFamily: "Inter-SemiBold",
    },
    cartContainer: {
        padding: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    itemContainer: {
        height: 60,
        justifyContent: "center",
    },
    itemText: {
        fontFamily: "Inter-SemiBold",
        color: "#fff",
        fontSize: 16,
        marginLeft: 32,
    },
    selectedItemContainer: {
        height: 60,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    selectedItemText: {
        color: "red",
        fontFamily: "Inter-Bold",
        fontSize: 16,
        marginLeft: 32,
    },
});

export default CreateBudget;
