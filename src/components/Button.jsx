import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { string, shape, func } from "prop-types";

export default function Button(props) {
  const { label, onPress, style } = props;
  return (
    // styleを配列にし、第二引数を追加することで上書き可能
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

Button.prototype = {
  label: string.isRequired,
  onPress: func,
  style: shape(),
};

Button.defaulePrpos = {
  onPress: null,
  style: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#467FD3",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: "#ffffff",
  },
});
