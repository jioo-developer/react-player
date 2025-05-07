import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "http://localhost:3000" }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1,
  },
});
