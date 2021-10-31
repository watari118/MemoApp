import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function LogOutButton() {
  const navigation = useNavigation();

  function handlePress() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // 履歴を初期化
        navigation.reset({
          index: 0,
          routes: [{ name: "LogIn" }],
        });
      })
      .catch(() => {
        console.log("ログアウトに失敗しました。");
      });
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
});
