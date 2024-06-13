import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

const ChangeTypeButton = ({ type1, type2, style, typeSelect }) => {
    return (
        <View style={[styles.container, style?.container]}>
            <View style={[styles.block, typeSelect == 1 && style?.block]}>{type1}</View>
            <View style={[styles.block, typeSelect == 2 && style?.block]}>{type2}</View>
        </View>
    );
};

export default ChangeTypeButton;

const styles = StyleSheet.create({
    container: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 15,
        borderWidth: 1,
    },

    block: {
        flexDirection: "row",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
});
