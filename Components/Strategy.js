import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { StyleSheet, Text, View,Image,TouchableHighlight,ScrollView,Dimensions,TextInput,ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { format } from 'date-fns';
import ImageModal from 'react-native-image-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';


const win = Dimensions.get('window');

const Strategy =({route,navigation})=> {
    const [loading,setLoading] = React.useState(true);
    const [ticker,setTicker] = React.useState(route.params.ticker.ticker)
    const [selectedValue, setSelectedValue] = React.useState("DEMA");
    const [startdate, setstartDate] = React.useState(new Date('2020-01-01'));
    const [startmode, setstartMode] = React.useState('date');
    const [startshow, setstartShow] = React.useState(false);
    const [stocksData,setStocksData] = React.useState([]);
    const [stake,setStake] = React.useState(1000);
    const [cash,setCash] = React.useState(100000);
    const onstartChange = (event, selectedDate) => {

      const currentDate = selectedDate || startdate;
      setstartShow(Platform.OS === 'ios');
      setstartDate(currentDate);
    };
    const showstartMode = (currentMode) => {
      if (currentMode!= "") {
        setstartShow(true);
        setstartMode(currentMode);
      }
    };
    const showDatepicker = () => {
      showstartMode('date');
    };
    const [enddate, setendDate] = React.useState(new Date('2021-01-01'));
    const [endmode, setendMode] = React.useState('date');
    const [endshow, setendShow] = React.useState(false);
    const onendChange = (event, selectedDate) => {
      const currentDate = selectedDate || enddate;
      setendShow(Platform.OS === 'ios');
      setendDate(currentDate);
    };
    const showendMode = (currentMode) => {
      setendShow(true);
      setendMode(currentMode);
    };
    const showendDatepicker = () => {
      showendMode('date');
    };
    

    return (
      <ScrollView>
        <View 
        style={{width:win.width,height:win.height*0.1,flexDirection:"row",flexWrap:"wrap",marginTop:10,justifyContent:"center"}}>
          <TouchableHighlight onPress={showDatepicker} style={styles.date} activeOpacity={0.4} underlayColor={'steelblue'}>
            <>
            <Text style={{alignSelf:"center", color:"#5a5a5a",fontSize:18}}>Start Date</Text>
            {startshow && (
              <DateTimePicker
                testID="StartDatePicker"
                value={startdate}
                mode={startmode}
                display="default"
                onChange={onstartChange}
              />
            )}
            <View>
            <Text style={{fontSize:15,alignSelf:"center",color:"#5a5a5a"}}>{format(startdate,'yyyy-MM-dd')}</Text>
            </View>
            </>
          </TouchableHighlight>
          <TouchableHighlight onPress={showendDatepicker} style={styles.date} activeOpacity={0.4} underlayColor={'steelblue'}>
            <>
            <Text style={{alignSelf:"center",color:"#5a5a5a",fontSize:18}}>End Date</Text>
            {endshow && (
              <DateTimePicker
                testID="EndDatePicker"
                value={enddate}
                mode={endmode}
                display="default"
                onChange={onendChange}
              />
              )}
            <View>
            <Text style={{fontSize:16,alignSelf:"center",color:"#5a5a5a"}}>{format(enddate,'yyyy-MM-dd')}</Text>
            </View>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.graph1}>
          <Text style={{paddingLeft:10,backgroundColor:"#72bcd4"}}>Choose Strategy</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 30, width: win.width*0.8 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
            <Picker.Item label="DEMA" value="DEMA"/>
            <Picker.Item label="OBV" value="OBV"/>
            <Picker.Item label="SMA" value="SMA"/>
          </Picker>
          <ImageModal
            source={{ uri: `https://streamstrartapi.herokuapp.com/${selectedValue}/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}`}}
            style={{height:win.height*0.2,width:win.width}}
            imageBackgroundColor="white"
            resizeMode="contain"
          />
        </View>
        <View style={styles.graph2}>
          <Text style={{paddingLeft:10,backgroundColor:"#72bcd4"}}>Plots</Text>
          <View style={{height:win.width*0.1,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{fontSize:18}}>Stake: </Text>
              <TextInput
                style={styles.input}
                onChangeText={setStake}
                value={stake}
                keyboardType="number-pad"
              />
            </View>
            <View style={{flexDirection:"row",alignItems:"center"}}> 
              <Text style={{fontSize:18}}>Cash:  </Text>
              <TextInput
                style={styles.input}
                onChangeText={setCash}
                value={cash}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <ImageModal
            source={{ uri: `https://streamstrartapi.herokuapp.com/broker_${selectedValue}/${ticker.toUpperCase()}&${format(startdate,'yyyy-MM-dd')}&${format(enddate,'yyyy-MM-dd')}&${stake}&${cash}`}}
            style={{height:win.height*0.3,width:win.width,marginTop:6}}
            imageBackgroundColor="white"
            resizeMode="contain"
          />
          
        </View>
      </ScrollView>
    );

}
 
const styles = StyleSheet.create({
  graph: {
    height:win.height*0.22,
    width:win.width,
  },
  graph1: {
    height:win.height*0.26,
    width:win.width,
    paddingTop:18,
  },
  graph2: {
    height:win.height*0.45,
    width:win.width,
    paddingTop:18,
    paddingBottom:18,
  },
  date: {
    borderRadius: 10,
    borderColor: "blue",
    alignContent: "center",
    backgroundColor:"#ADD8E6",
    justifyContent: "center",
    width: win.width*0.4,
    height: win.height*0.07,
    margin: 10,
    marginRight: 20,
  },
  input: {
    height:40,
    width:100,
    borderWidth:1,
    padding:3
  },
})

export default Strategy;