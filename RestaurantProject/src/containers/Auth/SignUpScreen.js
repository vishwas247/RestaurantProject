import React from 'react';
import {Text, View, TextInput, Button, ScrollView} from 'react-native';
import {CardSection} from '../../components/CardSection';
import {Input} from '../../components/Input';
import Card from '../../components/Card';
import {connect} from 'react-redux';
import ErrorText from '../../components/Error';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Database from '../../database';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';

const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const nameregex = /^[a-zA-Z ]+$/;

const db = new Database();

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      mobile: '',
      password: '',
      emailValid: true,
      numberValid: true,
      nameValid: true,
      passwordValid: true,
    };
  }

  componentDidMount() {
    //this.props.addUser('user1')
  }

  firstnameChange = value => {
    if (value.trim().length) {
      this.setState({nameValid: true});
    }
    this.setState({firstName: value.trim()});
  };

  emailChange = value => {
    if (value.trim().match(emailregex)) {
      this.setState({emailValid: true});
    }
    this.setState({email: value.trim()});
  };

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

  checkValidation() {
    if (!this.state.firstName.match(nameregex)) {
      this.setState({nameValid: false});
      return false;
    } else if (!this.state.email.match(emailregex)) {
      this.setState({emailValid: false});
      return false;
    } else if (this.state.mobile.length < 10) {
      this.setState({numberValid: false});
      return false;
    } else if (this.state.password.length < 6) {
      this.setState({passwordValid: false});
      return false;
    }
    return true;
  }

  saveUserToDB(data) {
    this.setState({
      isLoading: true,
    });
    // let data = {
    //   prodId: this.state.prodId,
    //   prodName: this.state.prodName,
    //   prodDesc: this.state.prodDesc,
    //   prodImage: this.state.prodImage,
    //   prodPrice: this.state.prodPrice
    // }
    db.addUser(data)
      .then(result => {
        Toast.show('Your account has been created.Login Now.');
        this.props.navigation.navigate('Login')
        console.log(result);
        this.setState({
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
        });
      });
  }

  saveUser = () => {
    if (this.checkValidation()) {
      let user = {
        firstName: this.state.firstName,
        mobile: this.state.mobile,
        email: this.state.email,
        password: this.state.password,
      };
      this.saveUserToDB(user);
      this.props.addUser(user);
    }
  };

  render() {
    return (
      <Card>
        <KeyboardAwareScrollView>
          <CardSection>
            <Text>Welcome!</Text>
          </CardSection>
          <CardSection>
            <Text>Please enter your sign up details.</Text>
          </CardSection>
          <CardSection>
            <Input
              placeholder={'First Name'}
              value={this.state.firstName}
              onChangeText={this.firstnameChange}
            />
            {!this.state.nameValid ? (
              <ErrorText text={'Please enter a valid name.'} />
            ) : null}
          </CardSection>
          <CardSection>
            <Input
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={this.emailChange}
            />
            {!this.state.emailValid ? (
              <ErrorText text={'Please enter a valid email.'} />
            ) : null}
          </CardSection>
          <CardSection>
            <Input
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
              secureTextEntry={true}
              placeholder={'Password'}
              value={this.state.password}
              onChangeText={this.passwordChange}
            />
            {!this.state.passwordValid ? (
              <ErrorText text={'Password hsould be of 6 characters minimum'} />
            ) : null}
          </CardSection>
          <Button color={'green'} title={'SUBMIT'} onPress={()=>this.saveUser()} />

          <CardSection>
            <Text style={{alignSelf: 'center'}}>Already a user?</Text>
            <Button
              color={'green'}
              title={'Login Here'}
              onPress={() => this.props.navigation.navigate('Login')}
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

// const mapStateToProps = (state) => {
//     addUser: () =>
// }

const mapDispatchToProps = (dispatch, data) => ({
  addUser: data => dispatch({type: 'user/addUser', payload: {data: data}}),
});
export default connect(null, mapDispatchToProps)(SignUpScreen);
