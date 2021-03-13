import React from 'react'
import { View, Text } from 'react-native'

const CardSection = (props) => {
  return (
    <View style = {[styles.containerStyle,props.style]}>
      {props.children}
    </View>
  )
}

const styles = {
   containerStyle: {
     borderBottomWidth : 0,
     padding : 5,
     backgroundColor: 'transparent',
     justifyContent : 'flex-start',
     borderColor: '#ddd',
     position: 'relative',
     flexDirection: 'column',
     paddingTop: 10,
     margin:5
   }
}

export  {CardSection}
