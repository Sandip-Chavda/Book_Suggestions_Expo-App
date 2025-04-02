import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";

const ProfileScreen = () => {
  const { logout } = useAuthStore();

  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
