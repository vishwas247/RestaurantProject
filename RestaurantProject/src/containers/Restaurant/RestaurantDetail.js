import React from 'react';
import {Text, View, TextInput, Button,Image, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {CardSection} from '../../components/CardSection';
import Card from '../../components/Card';

export default class RestaurantDetail extends React.Component {


    constructor(props){
        super(props)
        this.state = {
              item: props.route.params.data,        
        };
    }
    componentDidMount(){
      //console.log(JSON.stringify(Data))
    }

    reviewCard =(item) => {
      return(
        <CardSection>
           <Text>{item.name}</Text>
           <Text>{item.date}</Text>
           <Text>Rating:{item.rating}</Text>
           <Text>{item.comments}</Text>
        </CardSection>
      )
    }


    render () {
        const {item} = this.state
        return(
            <Card>
                <ScrollView>
                <CardSection>
                    <Image style={{width:Dimensions.get('window').width,height:200}} source={{uri:"https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png"}}></Image>
                    </CardSection>
                    <CardSection>
                    <Text style={{fontWeight:'bold', marginTop:10}}>{item.name}</Text>
                    <Text style={{marginTop:10}}>{item.cuisine_type}</Text>
                    <Text style={{marginTop:10,width:'95%'}}>{item.address}</Text>                
                    </CardSection>
                    <CardSection>
                        {item.reviews.map(item=>{
                            return(
                                this.reviewCard(item)
                            )
                        })}

                    </CardSection>
                    </ScrollView>
            </Card>
        
          )
        }
}