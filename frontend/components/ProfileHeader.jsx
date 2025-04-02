import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "@/styles/profile.styles";
import { Image } from "expo-image";
import { formatMemberSince } from "@/constants/utils";

const ProfileHeader = () => {
  const { user, token } = useAuthStore();

  if (!user) return null;

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.email}>
          📅 Joined {formatMemberSince(user.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
