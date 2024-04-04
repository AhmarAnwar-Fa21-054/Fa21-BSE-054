
import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

function App() {
  return (
    <>
      <Title />
      <UserName/>
      <Password/>
      <Submit/>
      <Button1 updateState={updateState}/>
     
    </>
  )
}
function Title() {
  return <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Login</Text>
}
function UserName() {
  return <TextInput style={{ fontSize:20, borderWidth: 1, margin: 20 }} placeholder='Enter User Name Here'></TextInput>
}

function Password({isEditable}){
  return(
  <>
  <TextInput style={{ fontSize:20, borderWidth: 1, margin: 20 }} placeholder='Enter Password Here' editable={isEditable} onChangeText={setPValue}></TextInput> 
  </>
  ) 
}
function Submit(){
  return <Button title='Submit' color="red"></Button>
}

export default App;
