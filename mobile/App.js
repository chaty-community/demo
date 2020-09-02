import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/pages/Navigator";
console.disableYellowBox = true;

import urls from "./src/env";
// import * as io from "socket.io-client";
import io from "socket.io-client";
export const socket = io.connect(urls.socket_server);

export default function App() {
  return <Navigator />;
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <Navigator />
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
