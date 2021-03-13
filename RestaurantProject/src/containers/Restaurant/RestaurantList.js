import React from 'react';
import {Text, View, TextInput, Button,Image, ScrollView,TouchableOpacity} from 'react-native';
import {CardSection} from '../../components/CardSection';
import Card from '../../components/Card';
import  Data from '../../restaurantData/Data'

export default class RestaurantList extends React.Component {

    componentDidMount(){
      //console.log(JSON.stringify(Data))
    }

     restaurantCard =(item) => {
        console.log(JSON.stringify(item))

       return (
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('RestaurantDetail',{data:item})}> 
        <CardSection>
        <View style= {{flexDirection:'row'}}>
            <Image style={{width:100,height:100}} source={{uri:"https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png"}}></Image>
            <View style={{flexDirection:'column',marginLeft:20}}>
                <Text style={{fontWeight:'bold', marginTop:10}}>{item.name}</Text>
                <Text style={{marginTop:10}}>{item.cuisine_type}</Text>
                <Text style={{marginTop:10,width:'95%'}}>{item.address}</Text>
            </View>
        </View>
    </CardSection>
    </TouchableOpacity>

       )
     }


    render () {
        const data = Data.restaurants
        return(
            <Card>
                <ScrollView>
              {data.map(item=>{
                  return(
                      this.restaurantCard(item)
                  )
              })}
              </ScrollView>
            </Card>
        
          )
        }
}