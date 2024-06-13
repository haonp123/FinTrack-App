import React from "react";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import AddTransaction from "../screens/Transaction/AddTransaction";

import HomeIcon from "../assets/svg/home.svg";
import TransactionIcon from "../assets/svg/transaction.svg";
import BudgetIcon from "../assets/svg/pie-chart.svg";
import ProfileIcon from "../assets/svg/user.svg";
import LargeAddIcon from "../assets/svg/large-add.svg";

import HomeBudget from "../screens/Budget/HomeBudget";
import HomeTransaction from "../screens/Transaction/HomeTransaction";

import { primaryColor } from "../styles/global";

const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: "#FCFCFC",
        borderTopWidth: 1,
        borderColor: "#c6c6c6",
    },
};

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <HomeIcon width={32} height={32} fill={focused ? primaryColor : "#c6c6c6"} />
                                <Text
                                    style={{
                                        fontFamily: "Inter-Medium",
                                        fontSize: 12,
                                        color: focused ? primaryColor : "#c6c6c6",
                                    }}
                                >
                                    Home
                                </Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="HomeTransaction"
                component={HomeTransaction}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <TransactionIcon width={32} height={32} fill={focused ? primaryColor : "#c6c6c6"} />
                                <Text
                                    style={{
                                        fontFamily: "Inter-Medium",
                                        fontSize: 12,
                                        color: focused ? primaryColor : "#c6c6c6",
                                    }}
                                >
                                    Transaction
                                </Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="AddTransaction"
                component={AddTransaction}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: Platform.OS == "ios" ? 50 : 60,
                                    height: Platform.OS == "ios" ? 50 : 60,
                                    top: Platform.OS == "ios" ? -10 : -20,
                                    borderRadius: Platform.OS == "ios" ? 25 : 30,
                                }}
                            >
                                <LargeAddIcon />
                            </View>
                        );
                    },
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
            <Tab.Screen
                name="HomeBudget"
                component={HomeBudget}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <BudgetIcon width={32} height={32} fill={focused ? primaryColor : "#c6c6c6"} />
                                <Text
                                    style={{
                                        fontFamily: "Inter-Medium",
                                        fontSize: 12,
                                        color: focused ? primaryColor : "#c6c6c6",
                                    }}
                                >
                                    Budget
                                </Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <ProfileIcon width={32} height={32} fill={focused ? primaryColor : "#c6c6c6"} />
                                <Text
                                    style={{
                                        fontFamily: "Inter-Medium",
                                        fontSize: 12,
                                        color: focused ? primaryColor : "#c6c6c6",
                                    }}
                                >
                                    Profile
                                </Text>
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}
