import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  AsyncStorage,
} from "react-native";
import { Icon } from "react-native-elements";
import styled from "styled-components";
import urls from "../../env.js";
import { socket } from "../../App";

const Rooms = ({ navigation }) => {
  useEffect(() => {
    getMessagesOfThisRoom();
    setInformation();
    realTimeChatFetch();
  }, []);

  const { friendId, friendName, friendImg } = navigation.state.params;
  const [myId, setMyId] = useState(0);
  const setInformation = async () => {
    const myId = await AsyncStorage.getItem("myId");
    setMyId(myId);
  };

  const realTimeChatFetch = () => {
    socket.on("newMessage", async (message) => {
      const curretRoomId = await AsyncStorage.getItem("currentRoomId");
      if (message.room_id == curretRoomId) {
        getMessagesOfThisRoom();
      }
    });
  };

  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(0);
  const getMessagesOfThisRoom = async () => {
    const myId = await AsyncStorage.getItem("myId");
    const responseOne = await fetch(
      `${urls.api_server}/api/users/${myId}/find_room_id`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          friendId: friendId,
        }),
      }
    );
    const responseJSONOne = await responseOne.json();
    const { currentRoomId } = responseJSONOne;
    setRoomId(currentRoomId);

    await AsyncStorage.removeItem("currentRoomId");
    await AsyncStorage.setItem("currentRoomId", `${currentRoomId}`);

    const responseTwo = await fetch(
      `${urls.api_server}/api/rooms/${currentRoomId}/messages`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "GET",
      }
    );
    const responseJSONTwo = await responseTwo.json();
    const { messages } = responseJSONTwo;
    setMessages(messages);
  };

  const [text, setText] = useState("");
  const onChangeText = (text) => setText(text);
  const onPressSendMessage = async () => {
    const myId = await AsyncStorage.getItem("myId");
    const response = await fetch(
      `${urls.api_server}/api/rooms/${roomId}/message`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          message: text,
          current_user_id: myId,
        }),
      }
    );
    setText("");
    const responseJSON = await response.json();
    const { postMessage } = responseJSON;
    socket.emit("createMessage", postMessage);
  };

  return (
    <ImageBackground
      source={require("../../assets/img/chatpage.png")}
      style={{ width, height: height - 80, backgroundColor: "#5279aa" }}
    >
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={80}
        style={{ flex: 1 }}
        contentContainerStyle={{ height: height - 80 }}
      >
        <StyledScrollView
        // ref={(ref) => (this.scrollView = ref)}
        // onContentSizeChange={() => {
        //   this.scrollView.scrollToEnd({ animated: true });
        // }}
        >
          {messages.map((oneMessage) => {
            const { id, message, user_id, createdAt } = oneMessage;
            return myId == user_id ? (
              <StyledWrapperView key={id}>
                <SendTime>{parsedTime(createdAt)}</SendTime>
                <StyledRightView>
                  <StyledView backgroundColor="#42d328">
                    <ChatText>{message}</ChatText>
                  </StyledView>
                </StyledRightView>
              </StyledWrapperView>
            ) : (
              <StyledWrapperViewOther key={id}>
                <StyledImage source={{ uri: friendImg }} />
                <View>
                  <OtherUserName>{friendName}</OtherUserName>
                  <OtherUserChatAndTime>
                    <StyledView>
                      <ChatText>{message}</ChatText>
                    </StyledView>
                    <SendTime>{parsedTime(createdAt)}</SendTime>
                  </OtherUserChatAndTime>
                </View>
              </StyledWrapperViewOther>
            );
          })}
        </StyledScrollView>
        <ChatFooter>
          <StyledTextInput
            placeholder="メッセージを入力..."
            value={text}
            onChangeText={(text) => setText(text)}
            autoCapitalize="none"
          />
          <Icon
            name="send"
            size={38}
            color={text.trim() == "" ? "#dddddd" : "#0072ff"}
            onPress={onPressSendMessage}
          />
        </ChatFooter>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
const parsedTime = (time) => {
  const timeWithoutTZ = time.split("T")[1];
  const [hour, min] = timeWithoutTZ.split(":");
  const hourNum = (parseInt(hour) + 9) % 24;
  return `${hourNum}:${min}`;
};

const { width, height } = Dimensions.get("window");

const StyledScrollView = styled(ScrollView)`
  background-color: rgba(0, 0, 0, 0);
`;
const StyledWrapperView = styled(View)`
  padding: 6px 5px 6px 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
const StyledRightView = styled(View)`
  max-width: 80%;
  flex-direction: row;
  align-items: flex-end;
`;
const StyledView = styled(View)`
  max-width: ${width - 150};
  padding: 8px 13px;
  border-radius: 14px;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor || "#ffffff"};
  shadow-color: #000000;
  shadow-offset: 2px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 3;
`;
const ChatText = styled(Text)`
  font-size: 16;
`;
const StyledWrapperViewOther = styled(View)`
  padding: 6px 10px 6px 3px;
  flex-direction: row;
`;
const StyledImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 0px;
  margin-left: 0px;
`;
const OtherUserName = styled(Text)`
  color: #333333;
  font-weight: 500;
  margin-left: 7px;
  margin-bottom: 4px;
`;
const OtherUserChatAndTime = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left: 6px;
`;
const SendTime = styled(Text)`
  color: #444444;
  font-size: 11px;
  padding: 0px 3px;
`;
const ChatFooter = styled(View)`
  background-color: #ffffff;
  padding: 17px 0 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const StyledTextInput = styled(TextInput)`
  height: 38px;
  width: ${width - 90};
  background-color: #f3f3f3;
  padding-left: 10px;
  border-color: #dfdfdf;
  border-width: 1px;
  border-radius: 18px;
`;

export default Rooms;
