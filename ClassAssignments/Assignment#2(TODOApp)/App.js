import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {

  let [userInput, setUserInput] = useState({})
  let [taskList, setTaskList] = useState([])
  let [visbility, setVisbility] = useState(false)
  let [editValue, setEditValue] = useState("")
  return (
    <View style={styles.container}>
      <Title />
      <InputField userInput={userInput} setUserInput={setUserInput} setTaskList={setTaskList} taskList={taskList} />
      <Tasks taskList={taskList} setTaskList={setTaskList} setVisbility={setVisbility} setEditValue={setEditValue} setUserInput={setUserInput} />
      <StatusBar style="auto" backgroundColor='#9ec5c6' />
      <EditBox visbility={visbility} setVisbility={setVisbility} editValue={editValue} setEditValue={setEditValue} setUserInput={setUserInput} userInput={userInput} setTaskList={setTaskList} taskList={taskList} />
    </View>
  );
}

function Title() {
  return (
    <Pressable onLongPress={() => {
      Alert.alert("Info", "This App is created by Ahmar Anwar")
    }}>
      <View style={styles.titleBox}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={styles.title}>TodoApp</Text>
        </View>
      </View>
    </Pressable>
  )
}
function InputField({ userInput, setUserInput, setTaskList }) {
  let [value, setValue] = useState()
  return (
    <View style={styles.inputFieldViewStyle}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.inputFieldInnerViewStyle}>
          <TextInput style={styles.inputFieldStyle} value={value} onChangeText={(value) => {
            setUserInput({ name: value, id: Date.now() })
            setValue(value)
          }

          }>
          </TextInput>
        </View>
        <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => {
          if (userInput.name.length > 0) {
            setTaskList(taskList => [...taskList, userInput]); setValue("");
            // Data.name=""
            // Data.id=0      (Not Preferred)
            // setUserInput(Data) 
            setUserInput({ name: "", id: 0 })
          }
          else {
            Alert.alert("Warning", "Empty Task Cannot be Added!")
          }
        }}>
          <Icon name='plus' size={20}></Icon>
        </Pressable>
      </View>

    </View>
  )
}

function Tasks({ taskList, setTaskList, setVisbility, setEditValue, setUserInput }) {
  function deleteTask(id) {
    setTaskList(taskList.filter((item) => { return item.id !== id }))
  }
  return (
    <View style={styles.taskViewStyle}>
      <FlatList data={taskList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (<View style={styles.eachTaskStyle}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <Pressable onLongPress={() => {
                deleteTask(item.id)
              }}><Icon name='close' size={20}></Icon></Pressable>
              <Pressable onPress={() => {
                setVisbility(true)
                setEditValue(item.name)
                setUserInput({ name: item.name, id: item.id })
                deleteTask(item.id)
              }}><Icon name='pencil' size={20}></Icon></Pressable>
            </View>
            <View style={{ flex: 4, marginTop: 0 }}>
              <ScrollView><Text style={{ fontSize: 30 }}>{item.name}</Text>
              </ScrollView>
            </View>
          </View>)
        }}
      />
    </View>
  )
}
function EditBox({ visbility, setVisbility, editValue, setEditValue, setUserInput, userInput, setTaskList, taskList }) {
  return (
    <Modal transparent={true} visible={visbility} animationType='slide'>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.editBoxStyle}>
          <View>
            <TextInput style={{ fontSize: 30, width: 240 }} value={editValue} onChangeText={(value) => {
              setEditValue(value)
              setUserInput({ name: value, id: Date.now() })
            }} autoFocus={true}></TextInput>
          </View>
          <CloseButton setVisbility={setVisbility} userInput={userInput} editValue={editValue} setTaskList={setTaskList} taskList={taskList} />
        </View>
      </View>
    </Modal>
  )
}

function CloseButton({ setVisbility, userInput, setTaskList, taskList }) {
  return (
    <Pressable onPress={() => {
      if (userInput.name.length > 0) {
        setTaskList([...taskList, userInput])
      }
      setVisbility(false)
    }}>
      <View style={styles.saveButtonStyle}>
        <Text style={{ fontSize: 30, fontWeight: "600" }}>Save</Text>
      </View>
    </Pressable>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9ec5c6",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    margin: 40,
    fontSize: 30,
    fontWeight: "800",
  },
  titleBox: {
    height: 130,
    backgroundColor: "#eaeaea",
    elevation: 30,
    borderRadius: 15,
    marginTop: -10
  },
  inputFieldViewStyle: {

    margin: 40,
    padding: 10,
    backgroundColor: "#eaeaea",
    height: 60,
    width: 300,
    borderRadius: 15,
    elevation: 10
  },
  inputFieldInnerViewStyle: {
    flex: 4,
    justifyContent: "center",
  },
  inputFieldStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
  taskViewStyle: {
    padding: 20,
    backgroundColor: "#eaeaea",
    width: 300,
    height: 450,
    borderRadius: 20,
    elevation: 10
  },
  eachTaskStyle: {
    backgroundColor: "#9ec5c6",
    padding: 5,
    margin: 10,
    height: 140,
    borderRadius: 3
  },
  saveButtonStyle: {
    height: 40,
    width: 180,
    backgroundColor: "#9ec5c6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

  },
  editBoxStyle: {
    height: 200,
    width: 250,
    backgroundColor: "#eaeaea",
    elevation: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 0,
    borderRadius: 20
  }

});
