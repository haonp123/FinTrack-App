import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import { useFonts } from "expo-font";

import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import MainTabs from "./tabs/MainTabs";
import CreateBudget from "./screens/Budget/CreateBudget";
import DetailBudget from "./screens/Budget/DetailBudget";
import CreateTransaction from "./screens/Transaction/CreateTransaction";
import { primaryColor } from "./styles/global";
import HomeOnboardScreen from "./screens/HomeOnboardScreen";
import LaunchScreen from "./screens/LaunchScreen";

import { GlobalContext } from "./context/GlobalContext";
import { useState, useCallback, useEffect } from "react";
import LoadingModal from "./components/LoadingModal";
import DetailTransaction from "./screens/Transaction/DetailTransaction";
import ExpenseReport from "./screens/FinancialReport/ExpenseReport";
import IncomeReport from "./screens/FinancialReport/IncomeReport";
import BudgetReport from "./screens/FinancialReport/BudgetReport";
import QuoteReport from "./screens/FinancialReport/QuoteReport";
import ChartReport from "./screens/FinancialReport/ChartReport";

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
        "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
        "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
        "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
        "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    });

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [callBudgets, setCallBudgets] = useState(false);
    const [callTransactions, setCallTransactions] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                loading,
                setLoading,
                callBudgets,
                setCallBudgets,
                callTransactions,
                setCallTransactions,
            }}
        >
            <LoadingModal />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="HomeOnboard" component={HomeOnboardScreen} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            title: "Login",
                            headerStyle: {
                                backgroundColor: "#fff",
                            },
                            headerTitleAlign: "center",
                            headerTintColor: "#000",
                            headerTitleStyle: {
                                fontSize: 18,
                                color: "#000",
                                fontWeight: "medium",
                            },
                            headerShadowVisible: false,
                        }}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={RegisterScreen}
                        options={{
                            title: "Sign Up",
                            headerStyle: {
                                backgroundColor: "#fff",
                            },
                            headerTitleAlign: "center",
                            headerTintColor: "#000",
                            headerTitleStyle: {
                                fontSize: 18,
                                color: "#000",
                                fontWeight: "medium",
                            },
                            headerShadowVisible: false,
                        }}
                    />
                    <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="CreateBudget"
                        component={CreateBudget}
                        options={{
                            title: "Create Budget",
                            headerStyle: {
                                backgroundColor: primaryColor,
                            },
                            headerTitleAlign: "center",
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontSize: 18,
                                color: "#fff",
                                fontFamily: "Inter-Bold",
                            },
                            headerShadowVisible: false,
                        }}
                    />
                    <Stack.Screen
                        name="DetailBudget"
                        component={DetailBudget}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="EditBudget"
                        component={CreateBudget}
                        options={{
                            title: "Edit Budget",
                            headerStyle: {
                                backgroundColor: primaryColor,
                            },
                            headerTitleAlign: "center",
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontSize: 18,
                                color: "#fff",
                                fontFamily: "Inter-Bold",
                            },
                            headerShadowVisible: false,
                        }}
                    />
                    <Stack.Screen
                        name="DetailTransaction"
                        component={DetailTransaction}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CreateTransaction"
                        component={CreateTransaction}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="ExpenseReport"
                        component={ExpenseReport}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="IncomeReport"
                        component={IncomeReport}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="BudgetReport"
                        component={BudgetReport}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="QuoteReport"
                        component={QuoteReport}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="ChartReport"
                        component={ChartReport}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalContext.Provider>
    );
}
