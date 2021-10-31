import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

import Button from "../components/Button";

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ログイン監視
  // 最後に[]を追加することで初期表示時に一度だけ下記の処理を行う。
  // []を追加しなければpropsが変更される度に下記の処理を行う。
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログイン済みであればログイン処理はせずメモ一覧画面へ遷移
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      }
    });
    // 次の画面へ遷移する際にログイン監視をキャンセル
    return unsubscribe;
  }, []);

  function handlePress() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentail) => {
        const { user } = userCredentail;
        console.log(user.uid);
        //履歴をリセットさせることで戻る処理をさせない。
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize="none" // パスカルケース→キャラメルケース
          keyboardType="email-address" // キーボードをメアド仕様に変更
          placeholder="Email Address"
          textContentType="emailAddress"
        ></TextInput>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autoCapitalize="none" // パスカルケース→キャラメルケース
          placeholder="Passward"
          secureTextEntry // 伏字
          textContentType="password"
        ></TextInput>
        <Button label="Submit" onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({ index: 0, routes: [{ name: "SignUp" }] });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    //lineHeight: 32,
    height: 48,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
  footer: {
    flexDirection: "row",
  },
});
