import React, { useState } from "react";
import styled from "styled-components";
import {
  ImageBackground,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import urls from "../env.js";

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const onChangeName = (text) => setUserName(text);
  const [password, setPassword] = useState("");
  const onChangePassword = (text) => setPassword(text);

  const onPressLogin = async () => {
    if (userName == "" || password == "") return;
    const response = await fetch(`${urls.api_server}/api/users/session`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: userName, password: password }),
    });
    if (response.status == 200) {
      const responseJSON = await response.json();
      const { id, name, img, status_message } = responseJSON.currentUser;
      AsyncStorage.setItem("isLoggedIn", "true");
      AsyncStorage.setItem("myId", `${id}`);
      AsyncStorage.setItem("myName", `${name}`);
      AsyncStorage.setItem("myImg", `${img}`);
      AsyncStorage.setItem("myStatusMessage", `${status_message}`);
      navigation.navigate("UsersView");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/img/background.png")}
      style={{ width: width, height: height, backgroundColor: "#ffffff" }}
    >
      <StyledView>
        <StyledLogo source={require("../../assets/img/chaty-logo.png")} />
        <Label>名前</Label>
        <FormInput
          value={userName}
          onChangeText={(text) => onChangeName(text)}
          autoCapitalize="none"
        />
        <Label>パスワード</Label>
        <FormInput
          value={password}
          onChangeText={(text) => onChangePassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <LoginBtn onPress={onPressLogin} activeOpacity={0.9}>
          <StyledText>登録・ログイン</StyledText>
        </LoginBtn>
      </StyledView>
      <StyledBackgroundCover colors={["#0072ff", "#00c6ff"]} />
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get("window");
const StyledView = styled(View)`
  height: 410;
  margin-top: ${(height - 410) / 2};
  z-index: 10;
`;
const StyledBackgroundCover = styled(LinearGradient)`
  position: relative;
  bottom: ${(height - 410) / 2 + 410};
  height: 100%;
  opacity: 0.6;
`;
const StyledLogo = styled(ImageBackground)`
  width: 300;
  height: 70;
  margin: 0px auto 30px;
`;
const Label = styled(Text)`
  color: #ffffff;
  width: ${width - 100};
  margin: 0 auto;
  padding: 20px 0 5px 10px;
  font-weight: 500;
  font-size: 12px;
`;
const FormInput = styled(TextInput)`
  height: 40px;
  width: ${width - 110};
  padding-left: 10px;
  background-color: #eeeeee;
  border-color: #555555;
  border-radius: 4px;
  margin: 0 auto;
`;
const LoginBtn = styled(TouchableOpacity)`
  height: 40px;
  width: ${width - 110};
  background-color: #ff8d00;
  border-radius: 4px;
  margin: 35px auto 0;
  shadow-color: #000000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.6;
`;
const StyledText = styled(Text)`
  text-align: center;
  font-weight: 500;
  font-size: 25px;
  color: #ffffff;
  padding-top: 9px;
`;

export default Login;
