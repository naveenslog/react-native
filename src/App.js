import React, { useState, Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import { signIn, seeProfile, signOut } from "./helpers";

const App = () => {
  return (
    <View style={styles.app}>
      <View style={styles.header} />
      <Button onPress={() => signIn()} title="Login" />
      <br />
      <Button onPress={() => seeProfile()} title="See Profile" />
      <br />
      <Button onPress={() => signOut()} title="Logout" />
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
