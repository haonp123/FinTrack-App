import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateBudget from "../screens/Budget/CreateBudget";
import EditBudget from "../screens/Budget/EditBudget";

import MyTabs from "../tabs/MainTabs";

const Stack = createNativeStackNavigator();

export default function BudgetStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Budget" component={MyTabs} />
            <Stack.Screen name="CreateBudget" component={CreateBudget} />
            <Stack.Screen name="EditBudget" component={EditBudget} />
        </Stack.Navigator>
    );
}
