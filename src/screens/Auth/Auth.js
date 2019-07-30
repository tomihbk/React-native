import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import BG from "../../assets/makato.jpg";
import ButtonWithBG from "../../components/UI/ButtonWithBG/ButtonWithBG";
import validate from "../../utility/validation";
import { connect } from "react-redux";
import { tryAuth } from "../../store/actions/index";

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "lanscape",
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmpassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles); //To detach our listener when we change screen. Prevents memory leaks
  }

  updateStyles = () => {
    this.setState({
      viewMode: Dimensions.get("window").height > 500 ? "portrait" : "lanscape"
    });
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };
  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmpassword: {
            ...prevState.controls.confirmpassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmpassword.value,
                    prevState.controls.confirmpassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmpassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogin(authData);
    startMainTabs();
  };

  render() {
    let headingText = null;
    let confirmPasswordControl = null;
    const { email, confirmpassword, password } = this.state.controls;
    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={{ color: "white" }}>Please Log In</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <DefaultInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmpassword.value}
            onChangeText={val => this.updateInputState("confirmpassword", val)}
            valid={confirmpassword.valid}
            touched={confirmpassword.touched}
          />
        </View>
      );
    }
    return (
      <ImageBackground
        style={styles.bgImage}
        source={{
          uri:
            "https://lh3.googleusercontent.com/OW0a4DKLifZnnoywW90nTqHQoqVLJQJdAsSyFMtTNi0nJf7eqCBWQmxpI86l54FbMwXCNbcuygCtiVIIgT2zuU3bUlQn6nUE7oBy0w9jQHNM37tt-euRmgj7MYLIwW9I4tV6q4bcNGBDXDVlLSFJf7bsn0fXbEAXD7GVr4OdvkSePvQDX0rsq-puEiWR7QhT71WzTg-zqhuQfGD-Y1fBqVHniEpJARYp0nrHlwBbxZpnpRfKqZ3hB4jK-Q7WV-00Cl7_Yn_2C0I06Z0LxckZ7c5OtmtJQ9uX5xL1kbOJpraJS6zfRsOOe382iqj55Olgz7n5tDzAcpCP3LLi_d0vLRIk9Nme_JasLkygVDBauP2rNBBGRk_3C0EYPLh9S1nOsemFNmQVcH_owqlUfmjWGb9qTEyHYWD0R156jbD9RaBbsWq_siyN-Ah14ATAkc14QCVnSMGvb4PESref3CVSUOqoH9VoTzjIhTjSKQ_YSGRe-mt6_nKM4ozKY_WO937l49WC51KcDj4-b1ewz-RM4G7If4MLSmujIREtMQxzzM9126z7v05atSkeWmAKJLnOJRVo9fHnz9Yb6-TlBUEC-voO9vu8Q4Sb93SpjdZO0kk_SckcHYQkbfQMnoJqo3Jf9j1aZv-1x-rH1f60PXjN3dRz7_tWZmck7LjSU2xBTx4PQ8y9uNqD-VEJv4qQrmCuYikljRo_3BgjpTAu81eH7ATWbQ=w465-h1007-no"
        }}
        blurRadius={5}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          {headingText}
          <ButtonWithBG
            onPress={this.switchAuthModeHandler}
            color="#29aaf4"
            TextColor="white"
          >
            Switch to {this.state.authMode === "login" ? "SIGN UP" : "LOGIN"}
          </ButtonWithBG>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <DefaultInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email.value}
                onChangeText={val => this.updateInputState("email", val)}
                valid={email.valid}
                touched={email.touched}
                autoCapitalize="none"
              />
              <View
                style={
                  this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={[
                    this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper,
                    { marginRight: 8 }
                  ]}
                >
                  <DefaultInput
                    style={styles.input}
                    placeholder="Password"
                    value={password.value}
                    onChangeText={val => this.updateInputState("password", val)}
                    valid={password.valid}
                    touched={password.touched}
                    autoCapitalize="none"
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBG
            onPress={this.loginHandler}
            color="#29aaf4"
            autoCapitalize="none"
            TextColor="white"
            secureTextEntry
            /**disabled={
              !email.valid ||
              (!confirmpassword.valid && this.state.authMode === "signup") ||
              !password.valid
            }*/
          >
            Submit
          </ButtonWithBG>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: "70%"
  },
  input: {
    margin: 8
  },
  bgImage: {
    width: "100%",
    flex: 1
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  }
});
export default connect(
  null,
  mapDispatchToProps
)(AuthScreen);
