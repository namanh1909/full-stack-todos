import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Screens/HomeScreen";
import TodoList from "./Screens/TodoList";
import EditList from "./Screens/EditList";
import LoginScreen from "./Screens/LoginScreen";
import SettingScreen from "./Screens/SettingScreen";

import Colors from "./constants/color";

import firebase from 'firebase/app';
import "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyD-LR03fyoNRl5J2CVJhN79KSiaO62VnlU",
  authDomain: "todoapp-7a701.firebaseapp.com",
  projectId: "todoapp-7a701",
  storageBucket: "todoapp-7a701.appspot.com",
  messagingSenderId: "81880185249",
  appId: "1:81880185249:web:14012b1ac3350ef6b433e0",
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const AuthSrceens = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />

      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={({ route }) => {
          return {
            title: route.params.title,
            headerStyle: {
              backgroundColor: route.params.color,
            },
            headerTintColor: "white",
          };
        }}
      />
      <Stack.Screen
        name="EditList"
        component={EditList}
        options={({ route }) => {
          return {
            title: route.params.title
              ? `Edit ${route.params.title} List`
              : "Create new list",
            headerStyle: {
              backgroundColor: route.params.color || Colors.blue,
            },
            headerTintColor: "white",
          };
        }}
      />
    </Stack.Navigator>
  );
};



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false);
    }
  });
  return (
    <NavigationContainer>
      {isAuthenticated ? <Screens /> : <AuthSrceens />}
    </NavigationContainer>
  );
}
