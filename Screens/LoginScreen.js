import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Button from "../Components/Button";
import LabledInput from "../Components/LabledInput";
import Colors from "../constants/color";

import validator from "validator";
import { firestore } from 'firebase';

import firebase from 'firebase/app';
import "firebase/auth";

import { Ionicons } from '@expo/vector-icons'




const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };
  return isValid;
};


const login = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
    })
    .catch((error) => {
      alert(error.message)
      // ..
    });
};
const createAccount = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      firestore().collection("users").doc(user.id).set({})
    })
    .catch((error) => {
      alert(error.message)
      // ..
    });
};
export default function LoginScreen() {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: "",
  });

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />
      <View>
        <LabledInput
          label="Email"
          text={emailField.text}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="email"
          onChangeText={(text) => setEmailField({ text })}
        />
        <LabledInput
          label="Password"
          text={passwordField.text}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          autoCompleteType="password"
          onChangeText={(text) => setPasswordField({ text })}
          secureTextEntry={true}
        />

        {isCreateMode && (
          <LabledInput
            label="Re-enter Password"
            text={passwordReentryField.text}
            errorMessage={passwordReentryField.errorMessage}
            labelStyle={styles.label}
            autoCompleteType="password"
            onChangeText={(text) => setPasswordReentryField({ text })}
            secureTextEntry={true}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            setIsCreateMode(!isCreateMode);
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              color: Colors.blue,
              margin: 6,
            }}
          >
            {isCreateMode ? "Already have account?" : "Create new account"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.label, { textAlign: "center" }]}>Login with</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity>
            <Ionicons name='call-outline' size={24} style={{ margin: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='logo-facebook' size={24} style={{ margin: 10 }} />
          </TouchableOpacity>

        </View>

      </View>
      <View>
        <Button
          onPress={() => {
            const isValid = validateFields(emailField.text, passwordField.text);
            let isAllValid = true;
            if (!isValid.email) {
              emailField.errorMessage = "Please enter a valid email";
              setEmailField({ ...emailField });
              isAllValid = false;
            }

            if (!isValid.password) {
              passwordField.errorMessage =
                "Password must be at least 8 long w/numbers, uppercase, lowercase, and symbol characters";
              setPasswordField({ ...passwordField });
              isAllValid = false;
            }

            if (
              isCreateMode &&
              passwordReentryField.text != passwordField.text
            ) {
              passwordReentryField.errorMessage = "Passwords do not match";
              setPasswordReentryField({ ...passwordReentryField });
              isAllValid = false;
            }

            if (isAllValid) {
              isCreateMode
                ? createAccount(emailField.text, passwordField.text)
                : login(emailField.text, passwordField.text);
            }
          }}
          buttonStyle={{ backgroundColor: Colors.red }}
          text={isCreateMode ? "Create Account" : "Login"}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold'
  }
});
