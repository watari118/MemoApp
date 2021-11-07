import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// eslint-disable-next-line object-curly-newline
import { shape, string, instanceOf, arrayOf } from "prop-types";
import firebase from "firebase";
import { deteToString } from "../utils";

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert("メモを削除します。", "よろしいですか？", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive", // 文字を赤くする(IOSのみ有効)
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました。");
            });
          },
        },
      ]);
    }
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail", { id: item.id });
        }}
      >
        <View>
          {/* numberOfLinesで任意の行数までを表示 */}
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {deteToString(item.updatedAt)}
          </Text>
        </View>

        {/* メモの削除 */}
        <TouchableOpacity
          style={styles.memoDetele}
          onPress={() => {
            deleteMemo(item.id);
          }}
        >
          <Feather name="x" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* FlatListによりスクロールが可能になる */}
      <FlatList
        data={memos}
        // eslint-disable-next-line react/jsx-no-bind
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row", // 横並び
    justifyContent: "space-between",
    paddingVertical: 16, // 上下の余白
    paddingHorizontal: 19, // 左右の余白
    alignItems: "center", // 上下方向の中央揃え
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  memoDelete: {
    padding: 8,
  },
});
