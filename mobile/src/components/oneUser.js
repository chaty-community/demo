import * as React from "react";
import { Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";

const OneUser = ({ name, img, message, onPress }) => {
  return (
    <UserBox activeOpacity={1} onPress={onPress}>
      <StyledImage source={{ uri: img }} />
      <NameAndMessage>
        <UserName>{name}</UserName>
        <UserMessage>{message}</UserMessage>
      </NameAndMessage>
    </UserBox>
  );
};

const { width } = Dimensions.get("window");

const UserBox = styled(TouchableOpacity)`
  width: ${width};
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const StyledImage = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: solid 1px;
  background-color: #eefbff;
  opacity: 0.7;
  margin-top: 5px;
  margin-left: 15px;
`;

const NameAndMessage = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-left: 12px;
  border-bottom-width: 1;
  border-color: #eeeeee;
`;

const UserName = styled(Text)`
  font-size: 16;
  margin-top: 15px;
`;

const UserMessage = styled(Text)`
  color: #888888;
  font-size: 11px;
  margin-top: 19px;
  position: absolute;
  right: 10px;
`;

export default OneUser;
