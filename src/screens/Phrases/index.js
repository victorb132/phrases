import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { Input } from '../../components/Input';
import {
  Container,
  ListPhrases,
  CardPhrases,
  CardTextPhrases,
  ContainerInput,
  TextInputButton
} from './styles';

export default function Phrases() {
  const { getItem, setItem } = useAsyncStorage('@phrases');
  const [phrases, setPhrases] = useState([]);
  const [newPhrase, setNewPhrase] = useState('');

  const loadPhrases = async () => {
    const stringPhrases = await getItem();
    const parsedPhrases = await JSON.parse(stringPhrases);

    if (parsedPhrases && parsedPhrases.length > 0) {
      setPhrases(parsedPhrases);
    }
  }

  const addPhrase = async () => {
    const newPhrases = [...phrases, `"${newPhrase}"`];
    await setItem(JSON.stringify(newPhrases));
    setPhrases(newPhrases);
    setNewPhrase('');
  }

  useEffect(() => {
    loadPhrases();
  }, [])

  return (
    <Container>
      <ListPhrases
        data={phrases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardPhrases>
            <CardTextPhrases>{item}</CardTextPhrases>
          </CardPhrases>
        )}
      />
      <ContainerInput>
        <Input
          placeholder="Digite uma nova frase..."
          value={newPhrase}
          onChangeText={setNewPhrase}
          multiline
        />
        <TextInputButton onPress={() => addPhrase()}>
          <MaterialCommunityIcons name='plus' color={'#000000'} size={30} />
        </TextInputButton>
      </ContainerInput>
    </Container>
  );
}