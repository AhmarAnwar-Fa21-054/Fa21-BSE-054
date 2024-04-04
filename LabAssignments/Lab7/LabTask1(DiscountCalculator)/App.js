import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  let [originalPriceInputFieldText, setoriginalPriceInputFieldText] = useState("")
  let [discountPriceInputFieldText, setDiscountPriceInputFieldText] = useState("")
  let [youSave, setYouSave] = useState("")
  let [finalPrice, setFinalPrice] = useState("")
  let [shouldDisplay, setShouldDisplay] = useState()
  let [calculation, setCalculation] = useState()
  let [history, setHistory] = useState([])
  let [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    if (originalPriceInputFieldText.length > 0 && discountPriceInputFieldText.length > 0) {
      setShouldDisplay(true)
      let [youSave, finalPrice] = calculator(originalPriceInputFieldText, discountPriceInputFieldText)
      setYouSave(youSave)
      setFinalPrice(finalPrice)
    }
    else {
      setShouldDisplay(false)
    }
  }, [originalPriceInputFieldText, discountPriceInputFieldText])
  if (shouldDisplay) {
    return (
      <View style={styles.container}>
        <InputField placeholder={"Original Price"} setInputFieldText={setoriginalPriceInputFieldText} originalPriceInputFieldText={originalPriceInputFieldText}  setCalculation={setCalculation}/>
        <InputField placeholder={"Discount Price"} setInputFieldText={setDiscountPriceInputFieldText} discountPriceInputFieldText={discountPriceInputFieldText}  setCalculation={setCalculation}/>
        <CalField label={"You Save"} value={youSave} />
        <CalField label={"Final Price"} value={finalPrice} />
        <SaveButton calculation={calculation} setCalculation={setCalculation} history={history} setHistory={setHistory} originalPriceInputFieldText={originalPriceInputFieldText} discountPriceInputFieldText={discountPriceInputFieldText} finalPrice={finalPrice} setIsVisible={setIsVisible}/>
        <ViewButton setIsVisible={setIsVisible}/>
        <CalculationHistory isVisible={isVisible} history={history} setIsVisible={setIsVisible} setHistory={setHistory}/>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <InputField placeholder={"Original Price"} setInputFieldText={setoriginalPriceInputFieldText}  setCalculation={setCalculation}/>
        <InputField placeholder={"Discount Price"} setInputFieldText={setDiscountPriceInputFieldText}  setCalculation={setCalculation}/>
      </View>
    );
  }

}

function InputField({ placeholder, setInputFieldText, originalPriceInputFieldText, discountPriceInputFieldText,setCalculation }) {
  useEffect(() => {
    if (originalPriceInputFieldText < 0 || discountPriceInputFieldText < 0) {
      Alert.alert("Warning", "Original Price or Discount cannot be negative!")
    }
    if (discountPriceInputFieldText > 100) {
      Alert.alert("Warning", "Discount cannot be greater than 100.")

    }
  }, [originalPriceInputFieldText, discountPriceInputFieldText])
  return (
    <TextInput inputMode="numeric" placeholder={placeholder} style={styles.field} onChangeText={(value) => {setInputFieldText(value);setCalculation(null)}}></TextInput>
  )
}

function SaveButton({calculation,setCalculation,history,setHistory,originalPriceInputFieldText,discountPriceInputFieldText,finalPrice,setIsVisible}) {
  useEffect(() => {
    if (calculation) {
      setHistory([...history, calculation])
      setIsVisible(true)
    }
  }, [calculation])
  return (
    <View style={[styles.button, { left: "5%" }]}>
      <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => {
        setCalculation({ id: Date.now(), originalPrice: originalPriceInputFieldText, discountPrice: discountPriceInputFieldText, finalPrice: finalPrice })
      }}>
        <Text style={{ fontSize: 30, fontWeight: "600" }}>Save</Text>
      </Pressable>
    </View>

  )
}
function ViewButton({setIsVisible}){
  return(
    <View style={[styles.button, { left: "67%" }]}>
    <Pressable style={{ flex: 1, justifyContent: "center", alignItems: "center" }} onPress={() => {
     setIsVisible(true)
    }}>
      <Text style={{ fontSize: 30, fontWeight: "600" }}>View</Text>
    </Pressable>
  </View>
  )
  }
function CalField({ label, value }) {
  return (
    <View style={{ height: 80 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>{label}</Text>
        <Text style={styles.field}>{value}</Text>
      </View>
    </View>
  )
}
function CalculationHistory({ history, isVisible, setIsVisible,setHistory }) {
  useEffect(()=>{
setHistory(history.filter((filterCurrentItem,filterCurrentItemIndex)=>{
  return filterCurrentItemIndex==history.findIndex((findIndexCurrentItem)=>{
    return (findIndexCurrentItem.originalPrice==filterCurrentItem.originalPrice)&&(findIndexCurrentItem.discountPrice==filterCurrentItem.discountPrice)&&(findIndexCurrentItem.finalPrice==filterCurrentItem.finalPrice)
  })
})) 
},[isVisible])
  return (
    <Modal visible={isVisible} transparent={true} onRequestClose={() => setIsVisible(false)} animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.modal}>
          <View style={{ height: "10%", width: "100%", position: "absolute" }}>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 5 }}>
              <HistoryItem text={"Original Price"} />
              <HistoryItem text={"-"} />
              <HistoryItem text={"Discount"} />
              <HistoryItem text={"="} />
              <HistoryItem text={"Final Price"} />
            </View>
          </View>
          <View style={{ height: "90%", width: "100%", top: "10%", position: "absolute" }}>
            <FlatList data={history}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                      <HistoryItem text={item.originalPrice} />
                      <HistoryItem text={"-"} />
                      <HistoryItem text={item.discountPrice + "%"} />
                      <HistoryItem text={"="} />
                      <HistoryItem text={item.finalPrice} />
                    </View>
                  </View>
                )

              }}
            >
            </FlatList>
          </View>
        </View>
      </View>
    </Modal>
  )
}
function HistoryItem({ text }) {
  return (
    <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: "700" }}>{text}</Text>
  )
}
function calculator(originalPrice, discountPrice) {
  let youSave = 0
  let finalPrice = 0
  if (originalPrice < 0 || discountPrice < 0 || discountPrice > 100) {
    return [youSave.toFixed(2), finalPrice.toFixed(2)]
  }
  youSave = (discountPrice / 100) * originalPrice
  finalPrice = originalPrice - youSave
  return [youSave.toFixed(2), finalPrice.toFixed(2)]
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9EDBF',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10
  },
  field: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 20,
    fontSize: 20,
    fontWeight: "600",
    width: 200,
    padding: 10,

  },
  button: {

    width: 100,
    height: 50,
    backgroundColor: "#FF9800",
    position: "absolute",
    top: "10%",
    borderRadius: 20,
    left: "5%"
  },
  modal: {
    backgroundColor: "#90D26D",
    height: "80%",
    width: "80%",
    elevation: 20,
    borderRadius: 20,

  }

});
