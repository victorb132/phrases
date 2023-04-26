import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
  align-items: center;
  justify-content: center;
`;

export const ListPhrases = styled.FlatList`
  width: 100%;
  padding: 10px 20px;
`;

export const CardPhrases = styled.View`
  background-color: #ffffff;
  padding: 20px;
  margin: 10px 0;
  border-radius: 20px;;
`;

export const CardTextPhrases = styled.Text`
  font-size: 20px;
  font-family: 'Lobster_400Regular';
`;

export const ContainerInput = styled.View`
  height: 50px;
  flex-direction: row;
`;

export const TextInputButton = styled.TouchableOpacity`
  height: 100%;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`;