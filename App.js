import React, { useState, useEffect } from "react"

import { StatusBar } from "expo-status-bar"
import { StyleSheet, Image, View, TouchableOpacity } from "react-native"

import Torch from "react-native-torch"
import RNShake from 'react-native-shake'

export default function App() {
  const [toggle, setToogle] = useState(true);

  const handleChangeToogle = () => {
    setToogle((oldToogle) => {
      return !oldToogle;
    });
  };

  useEffect(() => {
    Torch.switchState(toggle)
  }, [toggle])

  useEffect(() => {
    const subscription = RNShake.addListener(() => setToogle(oldToogle => !oldToogle))

    return () => subscription.remove()
  })

  return (
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity onPress={handleChangeToogle}>
        <Image
          style={toggle ? styles.lightOn : styles.lightOff}
          source={
            toggle
              ? require("./src/assets/lamp-acessa.png")
              : require("./src/assets/lamp-apagada.png")
          }
        />

        <Image
          style={toggle ? styles.lightOn : styles.lightOff}
          source={
            toggle
              ? require("./src/assets/nome-acesso.png")
              : require("./src/assets/nome-apagado.png")
          }
        />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  lightOn: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 250,
    height: 250,
  },
  lightOff: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 250,
    height: 250,
    tintColor: "white",
  },
});
