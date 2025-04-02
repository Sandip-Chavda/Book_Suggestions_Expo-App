import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "@/constants/Colors";

const Loader = ({ size = "large" }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
