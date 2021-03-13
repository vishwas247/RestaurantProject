import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {CardSection} from '../../components/CardSection';
import {Input} from '../../components/Input';
import Card from '../../components/Card';
import ErrorText from '../../components/Error';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Database from '../../database';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

const db = new Database();

const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const nameregex = /^[a-zA-Z ]+$/;
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      passwordValid: true,
      numberValid: true,
      users:[]
    };
  }

  componentDidMount() {
    //console.log('user=' + JSON.stringify(this.props.users));
    this.getUsers()
  }

  getUsers() {
    let users = [];
    db.listUser()
      .then(data => {
        users = data;
        console.log('user==' + JSON.stringify(users));
        this.setState({
          users,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState = {
          isLoading: false,
        };
      });
  }

  mobileChange = value => {
    if (value.trim().length >= 10) {
      this.setState({numberValid: true});
    }
    this.setState({mobile: value.trim()});
  };

  passwordChange = value => {
    if (value.trim().length >= 6) {
      this.setState({passwordValid: true});
    }
    this.setState({password: value.trim()});
  };

  loginUser = () => {
    var isUser = false
    this.setState({isLoading:true})
    if (this.checkValidation()) {
      if (this.state.users.length) {
        this.state.users.map((user,index) => {
          if (
            user.number == this.state.number &&
            user.password == this.state.password
          ) {
            //alert("login success")
            this.setState({isLoading:false})
            Toast.show('Login successfull.');
            this.props.navigation.navigate('RestaurantList');
            return true
          } else {
            this.setState({isLoading:false})
            index == this.state.users.length-1 ? Toast.show('Please enter a valid name and password.'):null
            //Toast.show('Please enter a valid name and password.');
            
          }
        });
      } else {
        this.setState({isLoading:false})
        alert('User does not exist.');
      }
    }
  };

  checkValidation() {
    if (this.state.mobile.length < 10) {
      this.setState({numberValid: false});
      return false;
    } else if (this.state.password.length < 6) {
      this.setState({passwordValid: false});
      return false;
    }
    return true;
  }

  render() {
    return (
      <Card>
        <KeyboardAwareScrollView>
          <CardSection>
            <Input
              keyboardType={'numeric'}
              placeholder={'Mobile Number'}
              value={this.state.mobile}
              onChangeText={this.mobileChange}
            />
            {!this.state.numberValid ? (
              <ErrorText text={'Please enter a valid number.'} />
            ) : null}
          </CardSection>
          <CardSection>
            <Input
              placeholder={'Password'}
              value={this.state.password}
              onChangeText={this.passwordChange}
              secureTextEntry={true}
            />
            {!this.state.passwordValid ? (
              <ErrorText text={'Password should be of 6 characters minimum'} />
            ) : null}
          </CardSection>
          <CardSection>
            <Button color={'green'} title={'SUBMIT'} onPress={this.loginUser} />
          </CardSection>
          <CardSection>
            <Text style={{alignSelf: 'center'}}>New user?</Text>
            <Button
              color={'green'}
              title={'Signup Here'}
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
          </CardSection>
        </KeyboardAwareScrollView>
        <Spinner
          visible={this.state.isLoading}
          textContent={'Loading...'}
          //textStyle={styles.spinnerTextStyle}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user,
});

export default connect(mapStateToProps, null)(LoginScreen);
