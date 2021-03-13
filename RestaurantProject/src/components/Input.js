import React from 'react'
import {TextInput, View, Text} from 'react-native'

export const Input = ({keyboardType,label,value,onChangeText,placeholder,secureTextEntry}) => {
    const {inputStyle,labelStyle,containerStyle} = styles


return (
    <View style={containerStyle}>
        <TextInput 
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        />
    </View>
)}

const styles = {
    inputStyle:{
        color:"#000",
        paddingRight:5,
        paddingLeft:20,
        fontSize:18,
        lineHeight:23,
        marginTop:5,
        borderColor:'green',
        borderWidth:1,
        borderRadius:5,
        height:40
        //flex:2
    },
    labelStyle:{
        fontSize:15,
        paddingLeft:20,
       // flex:1
    },
    containerStyle:{
        height:50,
        //flex:1,
        flexDirection:'column',
        //alignItems:'center'
    }
}