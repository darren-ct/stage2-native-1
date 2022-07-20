import { Text, Pressable, View,StyleSheet } from "react-native"

const Buttons = ({content,fn,styling}) => {

  const buttonStyling = styling === "ops" ? styles.opsButton : styles.numButton;

  return (
    <View style={buttonStyling}>
       <Pressable style={styles.pressContainer} onPress={()=>{fn()}}>
             <Text style={styles.text}>{content}</Text>
       </Pressable>
    </View>
  )
};

export default Buttons

const styles = StyleSheet.create({
    numButton : {
        width: 64,
        height: 64,
        backgroundColor: "#FF5757",
        borderRadius: 10,
        margin:4
    },

    opsButton : {
      width: 64,
      height: 64,
      backgroundColor: "#930707",
      borderRadius: 10,
      margin:4
  }

    ,

    pressContainer : {
         flex: 1,
         justifyContent:"center"
    },

    text : {
      fontSize:36,
      color:"white",
      textAlign:"center"
    }

});