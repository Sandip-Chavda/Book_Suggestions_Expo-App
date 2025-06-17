import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const RootIndex = () => {
  return <Redirect href="/(tabs)" />;
};

export default RootIndex;

const styles = StyleSheet.create({});
