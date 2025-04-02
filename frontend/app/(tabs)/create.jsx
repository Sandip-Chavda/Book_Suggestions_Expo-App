import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import styles from "@/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuthStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/Api";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(2);
  const [image, setImage] = useState(""); // for displaying selected image
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useAuthStore();

  const router = useRouter();

  const pickImage = async () => {
    try {
      // asking for permission
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissions Denied",
            "We need camera roll permissions to upload an image."
          );
          return;
        }
      }

      // open gallery

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // if put one full quality
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }

      if (result.assets[0].base64) {
        setImageBase64(result.assets[0].base64);
      } else {
        const base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        setImageBase64(base64);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async () => {
  //   if (!title || !caption || !imageBase64 || !rating) {
  //     Alert.alert("Error", "Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // const token = await AsyncStorage.getItem("token");
  //     const uriParts = image.split(".");
  //     const fileType = uriParts[uriParts.length - 1];
  //     const imageType = fileType
  //       ? `image/${fileType.toLowerCase()}`
  //       : "image/jpeg";
  //     const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

  //     const response = await fetch(`${API_URL}/books`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title,
  //         caption,
  //         rating: rating.toString(),
  //         image: imageDataUrl,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) throw new Error(data.message || "Something wen wrong!");

  //     Alert.alert("Success", "Your book recommendation has been posted");

  //     setTitle("");
  //     setCaption("");
  //     setRating(3);
  //     setImage(null);
  //     setImageBase64(null);

  //     router.push("/");
  //   } catch (error) {
  //     console.log("Error creating book post", error);
  //     Alert.alert("Error", error.message || "Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Ensure the token is available from the store
      if (!token) {
        Alert.alert("Error", "You are not logged in.");
        setLoading(false);
        return;
      }

      // Extract file type and create image data URL
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";
      const imageDataUrl = `data:${imageType};base64,${imageBase64}`;

      // Make the API request
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use token from useAuthStore
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          caption,
          rating: rating.toString(),
          image: imageDataUrl,
        }),
      });

      // Parse the response
      const data = await response.json();

      if (!response.ok) {
        console.log("Response error:", data); // Log the error response for debugging
        throw new Error(data.message || "Something went wrong!");
      }

      // Success alert and reset form
      Alert.alert("Success", "Your book recommendation has been posted");
      setTitle("");
      setCaption("");
      setRating(3);
      setImage(null);
      setImageBase64(null);

      // Navigate to the home screen
      router.push("/");
    } catch (error) {
      console.log("Error creating book post:", error.message); // Log the error for debugging
      Alert.alert("Error", error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const randerRatingPicker = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.scrollViewStyle}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>
              Share your favorite reads with others
            </Text>
          </View>

          <View style={styles.form}>
            {/* Book Title */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={COLORS.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter a book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Rating */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {randerRatingPicker()}
            </View>

            {/* Image */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.previewImage} />
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.placeholderText}>
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Captions */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Captions</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write your review or thoughts about this book..."
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
              />
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>Share</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
