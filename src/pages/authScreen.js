import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from 'expo-checkbox';
import Input from '../../components/UI/Input';
import AuthBtn1 from '../../components/UI/AuthButton1'
import AuthBtn2 from '../../components/UI/AuthButton2'
import Loading from '../../components/UI/Loading';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      name: '',
      tag: '',
      phoneNumber: '',
      password: ''
    },
    inputValidities: {
      email: false,
      name: false,
      tag: false,
      phoneNumber: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (isSignup) {
        props.navigation.navigate("Create Initial Personas", {
          email: formState.inputValues.email,
          name: formState.inputValues.name,
          tag: '0000',
          phoneNumber: formState.inputValues.phoneNumber,
          password: formState.inputValues.password
        })
      } else {
        await dispatch(authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        ))
        }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  let signUpInputName
  let signUpInputId 
  let signUpNumber
  let checkbox
  if(isSignup) {
    signUpInputName = <Input
    id="name"
    label="Name"
    keyboardType="default"
    autoCorrect={false}
    onInputChange={inputChangeHandler}
    initialValue=""
  />
  signUpNumber = <Input
    id="phoneNumber"
    label="Phone Number"
    keyboardType="number-pad"
    required
    onInputChange={inputChangeHandler}
    initialValue=""
  />
  checkbox = Platform.OS === 'ios' ? (
    <div style={styles.container}>
      <div style={{color: Colors.primary}}
      onPress={() => Linking.openURL('https://persona3a11617d90a54a5eb4a964f5925e09ba93856-dev.s3.eu-west-2.amazonaws.com/public/Persona_terms_and_conditions.pdf')}>
        Agree to our Terms & Conditions
      </div>
    </div>
  ) :
  (<View style={styles.container}>
      <Checkbox style={styles.checkbox} color={Colors.primary} value={isSelected} onValueChange={() => setSelection(!isSelected)} />
      <Text style={{color: Colors.primary, paddingLeft: Dimensions.get('window').width * 0.02, marginVertical: Dimensions.get('window').width * 0.02}}
      onPress={() => Linking.openURL('https://persona3a11617d90a54a5eb4a964f5925e09ba93856-dev.s3.eu-west-2.amazonaws.com/public/Persona_terms_and_conditions.pdf')}>
        Agree to our Terms & Conditions
      </Text>
    </View>
    )
  }
  if(isLoading) {
    return(<Loading />)
  }
  return (
    <div style={styles.screen} >
        <div style={styles.title}>Persona</div>
        <input
          id="email"
          label="E-Mail"
          keyboardType="email-address"
          autoCorrect={false}
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address."
          onInputChange={inputChangeHandler}
          initialValue=""
          style = {{ marginTop: Dimensions.get("window").height * 0.01 }}
          />
          {signUpInputName}
          {signUpNumber}
            <input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              autoCorrect={false}
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {checkbox}
            <div style={styles.buttonContainer}>
            {isSignup ? (
                <AuthBtn1 title={isSignup ? 'Sign Up' : 'Login'} state={isSignup} onPress={isSignup? isSelected? authHandler : null: authHandler} style={isSignup ? isSelected? {color: 'black', borderColor: Colors.darkMode}: {color: 'grey', borderColor: 'grey'}:  {color: 'black', borderColor: Colors.darkMode}}/>
              ) : (
                <AuthBtn1 title={isSignup ? 'Sign Up' : 'Login'} state={isSignup} onPress={isSignup? isSelected? authHandler : null: authHandler} style={isSignup ? isSelected? {color: 'black', borderColor: Colors.darkMode}: {color: 'grey', borderColor: 'grey'}:  {color: 'black', borderColor: Colors.darkMode}}/>
              )}
            </div>
            <div style={styles.buttonContainer}>
              <AuthBtn2 title={`${isSignup ? 'Login' : 'Sign Up'}`} state={isSignup} onPress={() => { setIsSignup(prevState => !prevState)}}/>
            </div>
            
          <div style={styles.bottomPosition}>
              <AuthBtn2 title={'Forgot your password?'} state={false} onPress={() => props.navigation.navigate('ResetPassword')}/>
          </div>
    </div>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: 'lato.thin',
    fontSize: 54,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.1
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: Dimensions.get('window').width * 0.025
  },
  container: {
    //marginLeft: Dimensions.get('window').width * 0.05,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  buttonContainer: {
    marginTop: Dimensions.get('window').height * 0.02
  },
  bottomPosition: {
    marginBottom: Dimensions.get('window').height * 0.05
  }
});

export default AuthScreen;

