import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { db } from "../../config/firebase";
import { query, getDocs, collection, addDoc, deleteDoc, doc, where } from "firebase/firestore";
import { Alert } from 'react-native';

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
    const q = query(collection(db, "phrases"));

    const querySnapshot = await getDocs(q);

    let phrases = [];

    querySnapshot.forEach((doc) => {
      phrases.push(doc.data());
    });

    setPhrases(phrases);
  }

  const addPhrase = async () => {
    const newPhraseObject = {
      name: `"${newPhrase}"`
    };

    await addDoc(collection(db, "phrases"), newPhraseObject);

    let updatedPhrases = [...phrases, newPhraseObject];

    setPhrases(updatedPhrases);
    setNewPhrase('');
  }

  useEffect(() => {
    loadPhrases();
  }, [])

  let deletePhrase = async (phrase) => {
    Alert.alert(
      "Deletar Frase",
      "Tem certeza que deseja remover esta frase?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            // Consulta a coleção "phrases" para obter o documento com o campo "texto" correspondente
            const querySnapshot = await getDocs(query(collection(db, "phrases"), where("name", "==", phrase)));

            // Obtém o id do documento correspondente
            const docId = querySnapshot.docs[0].id;

            // Exclui o documento usando o id
            await deleteDoc(doc(db, "phrases", docId));

            let updatedPhrases = phrases.filter((item) => item.name != phrase);

            setPhrases(updatedPhrases);
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      <ListPhrases
        data={phrases}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardPhrases onLongPress={() => deletePhrase(item.name)}>
            <CardTextPhrases>{item.name}</CardTextPhrases>
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