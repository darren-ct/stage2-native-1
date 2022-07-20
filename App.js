import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { useState } from 'react';
import Buttons from './components/Buttons';
import {buttons,ops} from "./helpers/index";

export default function App() {

  const[display,setDisplay] = useState([]);
  const[result,setResult] = useState();

  const onChange = (val) => {

    // First filter
    if( ops.includes(val) && display.length === 0){
      return;
    }

    // Syntax filter
    if( ops.includes(val) && display[display.length - 1] === "%"){
      return setDisplay(prev => [...prev,val]);
    };

    if( ops.includes(val) && ops.includes(display[display.length - 1]) ){
      return;
    };
    
    
      setDisplay(prev => [...prev,val]);
  };

  const onDelete = () => {
    setDisplay([]);
    setResult(null)
  };

  const onRemove = () => {
      setDisplay(prev => {
        const newArray = [...prev];

        newArray.pop();

        return newArray
      })
  };

  const reFormat = () => {

    // Copy original array
    const originalArray = [...display];


    // Combine number
    const combinedArray = [];

    const combineNum = (index) => {


                      // if array masi ada panjang
                      if(originalArray.length !== 0){


                        // switch
                        switch(originalArray[index]){
                          case "+":
                             combinedArray.push(originalArray[index])
                             originalArray.splice(index , 1);
                          break;
          
                          case "-":
                            combinedArray.push(originalArray[index])
                            originalArray.splice(index , 1);
                          break;
          
                          case "/":
                            combinedArray.push(originalArray[index])
                            originalArray.splice(index , 1);
                          break;
          
                          case "*":
                            combinedArray.push(originalArray[index])
                            originalArray.splice(index , 1);
                          break;
          
                          case "%":
                            combinedArray.push(originalArray[index])
                            originalArray.splice(index , 1);
                          break;
          
                          default:
                               if ( combinedArray.length === 0 || 
                               combinedArray[combinedArray.length - 1] === "+" || 
                               combinedArray[combinedArray.length - 1] === "-" || 
                               combinedArray[combinedArray.length - 1] === "*" ||
                               combinedArray[combinedArray.length - 1] === "/" ||
                               combinedArray[combinedArray.length - 1] === "%"
                               ) {   
                                combinedArray.push(originalArray[index])   
                                 } else {
                                     combinedArray[combinedArray.length - 1] = combinedArray[combinedArray.length - 1] + originalArray[index]
                                 };

                               originalArray.splice(index , 1);
                        
                        }
          
                        combineNum(0)
          
                      };
    };

    combineNum(0);

    


    // Numberify number
    const numberifiedArray = combinedArray.map(item => {
      if(item !== "+" && item !== "-" && item !== "/" && item !== "%" && item !== "*" && item[0] ){
         return Number(item)
      } else {
        return item
      }
    })

    

    // Reorder number


    // Call function
    calculateResult(numberifiedArray)
  };

  const calculateResult = (arr) => {
    let array = arr;
    let result = array[0];

    // make looping / recursion function that update both results and array
    const calculate = (index) => {
            

            // if array masi ada panjang
            if(array.length !== 0){


              // switch
              switch(array[index]){
                case "+":
                   result = result + array[index - 1] + array[index + 1];
                   array.splice(index - 1,3);
                break;

                case "-":
                  result = result + array[index - 1] - array[index + 1];
                  array.splice(index - 1,3);
                break;

                case "/":
                  result = result + array[index - 1] / array[index + 1];
                  array.splice(index - 1,3);
                break;

                case "*":
                  result = result + array[index - 1] * array[index + 1];
                  array.splice(index - 1,3);
                break;

                case "%":
                  result = result / 100;
                  array.splice(index ,1);
                break;

                default:
                return calculate(index + 1)
              
              }

              console.log(result)
              calculate(0)

            };
          
          
          };

    calculate(0);

    setResult(result);
    setDisplay([result.toString()]);
  };

  const renderItem = (itemData) => {
      const order = itemData.index + 1;

       if(order === 12){
          return <Buttons content={itemData.item} fn={reFormat} styling="ops"/>
       };

       if(order === 3 || order === 4 || order === 7 || order === 8 || order === 11){
          return  <Buttons content={itemData.item} fn={onChange.bind(this,itemData.item)} styling="ops"/>
       };

       if(order === 17){
        return <Buttons content={itemData.item} fn={onDelete} styling="ops" />
       };

       if(order === 18){
        return <Buttons content={itemData.item} fn={onRemove} styling="ops"/>
       }

       return <Buttons content={itemData.item} fn={onChange.bind(this,itemData.item)} styling="number"/>


  };


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Display</Text>
      
      <View style={styles.display}>
          <Text>{display.join("")}</Text>
      </View>

      <View style={styles.result}>
           <Text style={styles.res}>Result:</Text>
           <Text style={styles.res}>{result}</Text>
      </View>

      
      <FlatList data={buttons} numColumns={4} keyExtractor={(item,index)=> index} renderItem={renderItem}/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA0A0',
    alignItems: 'center',
    borderWidth: 1,
    paddingTop:64,
    paddingHorizontal:24
  },

  title:{
    color:"#FFFFFF",
    fontWeight:"bold",
    textAlign:"left",
    width:"100%",
    fontSize: 24,
    marginBottom: 16
  },

  display : {
    width:"100%",
    height:60,
    padding: 12,
    backgroundColor:"white",
    justifyContent:'center',
    marginBottom:8
  },

  result: {
    flexDirection:"row",
    marginBottom:32
  },

  res : {
    fontSize: 32
  }
});

