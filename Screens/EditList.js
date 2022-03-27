import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import Colors from "../constants/color";

import { CommonActions } from "@react-navigation/native";

import ColorSelection from "../Components/ColorSelection";
import Button from "../Components/Button";

const colorList = [
  "blue",
  "teal",
  "green",
  "olive",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "blueGray",
];

export default function EditList({ navigation, route }) {
  const [title, setTitle] = useState(route.params.title || "");
  const [color, setColor] = useState(route.params.color || Colors.blue);
  const [isValid, setValidity] = useState(true);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>List Name</Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setValidity(true);
          }}
          placeholder={"New List Name"}
          maxLength={30}
          style={[styles.input, { outline: "none" }]}
        />
        {!isValid && (
          <Text style={{ color: Colors.red, fontSize: 8 }}>
            List name can not be empty
          </Text>
        )}
        <Text style={[styles.label, { paddingTop: 5 }]}>Choose Color</Text>
        <ColorSelection
          onSelect={(color) => {
            setColor(color);
            navigation.dispatch(CommonActions.setParams({ color }));
          }}
          selectedColor={color}
          colorOptions={colorList}
        />
      </View>

      <Button
        text="Save"
        onPress={() => {
          if (title.length > 1) {
            route.params.saveChanges({ title, color });
            navigation.dispatch(CommonActions.goBack());
          } else {
            setValidity(false);
          }
        }}
        buttonStyle={{ backgroundColor: color }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "space-between",
  },
  input: {
    color: Colors.darkGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 0.5,
    marginHorizontal: 5,
    padding: 3,
    height: 30,
    fontSize: 24,
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: Colors.blue,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
});
