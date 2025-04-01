import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
