import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

export const PhraseText = styled.Text`
  color: #ffffff;
  font-size: 40px;
  font-family: 'Lobster_400Regular';
  text-align: center;
`;

export const PhraseButton = styled.TouchableOpacity`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  margin: 80px 0 0 0;
`;

export const PhraseButtonText = styled.Text`
  font-size: 20px;
`;