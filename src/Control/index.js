import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Slider from "@react-native-community/slider";
import { Container } from "./styles";

console.disableYellowBox = true;

export default function Control() {
  const [height, setHeight] = useState(50);
  initializeApp({
    apiKey: "AIzaSyCwApotHrYwG-tnp18ZyQTMWUe5Ou-iv1g",
    authDomain: "react-control-7f0af.firebaseapp.com",
    projectId: "react-control-7f0af",
    storageBucket: "react-control-7f0af.appspot.com",
    messagingSenderId: "208604699343",
    appId: "1:208604699343:web:8bc39c85404b40f3dc35ba",
    measurementId: "G-GSDF3TD0XK",
  });

  const db = getFirestore();

  useEffect(() => {
    onSnapshot(doc(db, "positions", "U33dYZmLLevqeugiTV84"), (doc) => {
      setHeight(doc.data().height);
    });
  }, [db]);

  async function handleChangePosition(prop) {
    try {
      if (prop === "up") {
        await setDoc(doc(db, "positions", "U33dYZmLLevqeugiTV84"), {
          height: height - 10,
        });
      }
      if (prop === "down") {
        await setDoc(doc(db, "positions", "U33dYZmLLevqeugiTV84"), {
          height: height + 10,
        });
      }
      await setDoc(doc(db, "positions", "U33dYZmLLevqeugiTV84"), {
        height: prop,
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <Slider
        style={{ width: 400, height: 40, transform: [{ rotate: "90deg" }] }}
        onValueChange={(props) => handleChangePosition(props)}
        minimumValue={0}
        maximumValue={200}
        minimumTrackTintColor="#f07e13"
        maximumTrackTintColor="#FFF"
        step={1}
        thumbTintColor={"#AA593B"}
      />
    </Container>
  );
}
