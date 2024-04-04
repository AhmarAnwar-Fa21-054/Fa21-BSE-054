
import React from 'react';

import {
  Text,
  TextInput,
  View,
} from 'react-native';

function App() {
  return (
    <>
    <Title/>
    <TextArea/>
    </>
  )
}

function Title(){
  return (
    <>
    <Text style={{fontSize:30}}>Guess The Number</Text>
    </>
  )
}

function TextArea(){
  return (
    <>
    <TextInput style={{fontSize:25}} placeholder='Enter The Number' keyboardType='number-pad'></TextInput>
    </>
  )
}

export default App;
