import React, { useState } from "react";
// eslint-disable-next-line object-curly-newline
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";

import firebase from "firebase";

import CircleButton from "../components/CircleButton";

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState("");

  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    // ユーザー毎に保存するフォルダを分ける
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref
      .add({
        // ドキュメント作成
        // eslint-disable-next-line object-shorthand
        bodyText: bodyText,
        updatedAt: new Date(),
      })
      .then(() => {
        // docRef.id ⇒ 作成したドキュメントID
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error!", error);
      });
  }

  return (
    // KeyboardAvoidingViewでキーボードの高さ分containerを押し上げてくれる
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => {
            setBodyText(text);
          }}
          autoFocus // 画面初期表示時にフォーカスを当てることでキーボード表示
        />
      </View>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});
