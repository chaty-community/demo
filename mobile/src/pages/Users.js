import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { Icon } from "react-native-elements";
import styled from "styled-components";
import urls from "../env.js";
import OneUser from "../components/oneUser";

const Users = ({ navigation }) => {
  useEffect(() => {
    getMyInfo();
    getFriends();
  }, []);

  const [myName, setMyName] = useState("");
  const [myImg, setMyImg] = useState("");
  const [myStatusMessage, setMyStatusMessage] = useState("");

  const getMyInfo = async () => {
    const myName = await AsyncStorage.getItem("myName");
    setMyName(myName);
    const myImg = await AsyncStorage.getItem("myImg");
    setMyImg(myImg);
    const myStatusMessage = await AsyncStorage.getItem("myStatusMessage");
    setMyStatusMessage(myStatusMessage);
  };

  const [friends, setFriends] = useState([]);
  const getFriends = async () => {
    const currentUserId = await AsyncStorage.getItem("myId");
    const response = await fetch(
      `${urls.api_server}/api/users/${currentUserId}/friends`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
      }
    );
    const responseJSON = await response.json();
    const { friends } = responseJSON;
    setFriends(friends);
  };

  const onPressFriend = (friendId, friendName, friendImg) => {
    navigation.navigate("RoomView", {
      friendId: friendId,
      friendName: friendName,
      friendImg: friendImg,
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View>
        <UserBox>
          <StyledImage source={{ uri: myImg }} />
          <UserName>{myName}</UserName>
          <UserMessage>
            {myStatusMessage == "null" ? "" : myStatusMessage}
          </UserMessage>
        </UserBox>
      </View>
      <FriendsBar>
        <FriendsText>{`友だち ${friends.length}`}</FriendsText>
        <Icon
          name="person-outline"
          color="#7cc5db"
          size={16}
          containerStyle={{ position: "absolute", top: 4, left: 3 }}
        />
      </FriendsBar>
      {friends.map((friend) => {
        return (
          <OneUser
            key={friend.id}
            name={friend.name}
            img={friend.img}
            message={friend.status_message}
            onPress={() => onPressFriend(friend.id, friend.name, friend.img)}
          />
        );
      })}
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const StyledImage = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: solid 1px;
  background-color: #eefbff;
  opacity: 0.7;
  margin-top: 7px;
  margin-left: 15px;
`;
const UserBox = styled(View)`
  width: ${width};
  height: 70px;
`;
const UserName = styled(Text)`
  position: absolute;
  font-weight: 500;
  font-size: 18;
  margin-top: 26px;
  margin-left: 95px;
`;
const UserMessage = styled(Text)`
  position: absolute;
  right: 10px;
  top: 30px;
  color: #888888;
  font-size: 11px;
`;
const FriendsBar = styled(View)`
  width: 100%;
  height: 26px;
  padding: 2px 0;
  background-color: #eefbff;
  border-top-width: 0.6;
  border-bottom-width: 0.6;
  border-color: #acd5e2;
`;
const FriendsText = styled(Text)`
  padding-top: 3px;
  padding-left: 20px;
  color: #7cc5db;
  font-size: 13px;
`;

export default Users;
