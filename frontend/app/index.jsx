import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Book Application Setup With Expo</Text>
      <Text>|</Text>
      <Text>|</Text>
      <Link href={"/(auth)/signup"}>Signup</Link>
      <Text>|</Text>
      <Text>|</Text>
      <Link href={"/(auth)"}>Login</Link>
    </View>
  );
}
