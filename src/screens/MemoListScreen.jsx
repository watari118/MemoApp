import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";

export default function MemoListScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      // ヘッダーにログアウトボタン追加
      headerRight: () => <LogOutButton />,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Memoリスト */}
      <MemoList />

      {/* +ボタン */}
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
});
