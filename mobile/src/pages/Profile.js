import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import styled from "styled-components";
import urls from "../../env.js";

const Profile = ({ navigation }) => {
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const currentUserName = await AsyncStorage.getItem("myName");
    const currentUserImg = await AsyncStorage.getItem("myImg");
    const currentUserStatusMessage = await AsyncStorage.getItem(
      "myStatusMessage"
    );
    setName(currentUserName);
    setStatusMessage(currentUserStatusMessage);
    setImg(currentUserImg);
  };

  const [name, setName] = useState("");
  const onChangeName = (text) => setName(text);
  const [statusMessage, setStatusMessage] = useState("");
  const onChangeStatusMessage = (text) => setStatusMessage(text);
  const [img, setImg] = useState("");

  const onPressProfileSave = async () => {
    const currentUserId = await AsyncStorage.getItem("myId");
    const response = await fetch(
      `${urls.api_server}/api/users/${currentUserId}/edit`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name,
          statusMessage,
        }),
      }
    );
    if (response.status == 200) {
      Alert.alert("変更完了", "プロフィールを編集しました。");
    }
    const responseJSON = await response.json();
    setName(responseJSON.updatedUser.name);
    setStatusMessage(responseJSON.updatedUser.status_message);
    await AsyncStorage.setItem("myName", `${responseJSON.updatedUser.name}`);
    await AsyncStorage.setItem(
      "myStatusMessage",
      `${responseJSON.updatedUser.status_message}`
    );
  };
  const onPressLogoutBtn = () => {
    Alert.alert(
      "確認",
      "本当にログアウトしますか？",
      [
        { text: "いいえ", style: "cancel" },
        { text: "ログアウト", onPress: onPressLogout },
      ],
      { cancelable: false }
    );
  };
  const onPressLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("myId");
    await AsyncStorage.removeItem("myName");
    await AsyncStorage.removeItem("myImg");
    await AsyncStorage.removeItem("myStatusMessage");
    navigation.navigate("LoginView");
  };

  return (
    <React.Fragment>
      <StyledScrollView>
        <ChangeIconSpace>
          <StyledImage
            source={
              img == "" || img == undefined || img == null
                ? require("../../assets/img/icon.png")
                : { uri: img }
            }
          />
        </ChangeIconSpace>
        <Label>名前</Label>
        <StyledTextInput
          onChangeText={(text) => onChangeName(text)}
          value={name}
          placeholderTextColor="#999999"
          autoCapitalize="none"
        />
        <Label>ステータスメッセージ</Label>
        <StyledTextInput
          onChangeText={(text) => onChangeStatusMessage(text)}
          value={statusMessage}
          placeholderTextColor="#999999"
          autoCapitalize="none"
        />
        <StyledTouchableOpacity
          onPress={onPressProfileSave}
          activeOpacity={0.8}
        >
          <Title>保存</Title>
        </StyledTouchableOpacity>
        <LogoutBtn activeOpacity={0.8} onPress={onPressLogoutBtn}>
          <Icon name="sync-disabled" color="#7cc5db" size={40} />
          <LogoutLabel>ログアウトする</LogoutLabel>
          <Icon name="navigate-next" color="#7cc5db" size={40} />
        </LogoutBtn>
      </StyledScrollView>
    </React.Fragment>
  );
};
const { width } = Dimensions.get("window");
const StyledScrollView = styled(ScrollView)`
  background-color: #fff;
`;
const ChangeIconSpace = styled(View)`
  margin: 20px auto 15px;
`;
const StyledImage = styled(Image)`
  width: 110px;
  height: 110px;
  border-radius: 55px;
  margin-top: 25px;
`;
const Label = styled(Text)`
  margin-top: 20px;
  margin-left: 55px;
  color: #7cc5db;
  font-size: 16px;
`;
const StyledTextInput = styled(TextInput)`
  background-color: #ffffff;
  width: ${width - 100};
  height: 40px;
  margin-top: 6px;
  margin-bottom: 20px;
  margin-left: 50px;
  padding-left: 10px;
  border-bottom-width: 1px;
  border-color: #7cc5db;
  border-radius: 3px;
  font-size: 20px;
`;
const StyledTouchableOpacity = styled(TouchableOpacity)`
  height: 40px;
  width: 100px;
  background-color: #ff8d00;
  margin: 30px auto 0;
  border-radius: 4px;
  shadow-color: #000000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.1;
`;
const Title = styled(Text)`
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  padding-top: 8px;
  margin: 0 auto;
`;
const LogoutBtn = styled(TouchableOpacity)`
  height: 40px;
  width: 100%;
  border-color: #7cc5db;
  border-top-width: 1px;
  border-bottom-width: 1px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const LogoutLabel = styled(Text)`
  font-size: 20px;
  color: #7cc5db;
  padding-top: 10px;
`;

export default Profile;
