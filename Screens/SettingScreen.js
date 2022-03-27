import { View, Text } from 'react-native'
import React from 'react'
import firebase from 'firebase/app';
import "firebase/auth";
import Button from '../Components/Button';

export default function SettingScreen(navigation) {
  return (
    <View>
      <Button text="Log Out" onPress={() => firebase.auth().signOut()} />
    </View>
  )
}