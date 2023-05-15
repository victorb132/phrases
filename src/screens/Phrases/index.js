import { useState, useEffect } from 'react'
import { Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Importar a referência do nosso banco de dados do firebase
import { db } from '../../config/firebase';
// Importar as funções do firestore
import {
  query,
  collection,
  getDocs,
  addDoc,
  where,
  deleteDoc,
  doc
} from 'firebase/firestore';

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
  const [phrases, setPhrases] = useState([]);
  const [newPhrase, setNewPhrase] = useState('');

  const loadPhrases = async () => {
    // Query para buscar nossa coleção no banco de dados
    const queryOnDb = query(collection(db, 'phrases'));

    // Buscar os dados (documentos) no banco de dados
    const querySnapshot = await getDocs(queryOnDb);

    // Array vazio para armazenar os nossos dados (documentos)
    let phrases = [];

    // Para cada dado encontrado, adicionamos o dado (documento) no array
    querySnapshot.forEach((doc) => {
      phrases.push(doc.data(), doc.id);
    });

    // Adicionar todas as frases ao nosso estado
    setPhrases(phrases)
  }

  const addPhrase = async () => {
    // Construir o objeto que será adicionado ao banco de dados
    const newPhraseObject = {
      id: Math.random().toString(),
      text: `"${newPhrase}"`
    }

    // Adicionar a nova frase ao banco de dados
    await addDoc(collection(db, 'phrases'), newPhraseObject);

    // Cria um novo array local com a nova frase
    const updatedPhrases = [...phrases, newPhraseObject];

    // Adicionar todas as frases ao nosso estado
    setPhrases(updatedPhrases);

    // Limpar o nosso campo de Input
    setNewPhrase('');
  }

  const deletePhrase = async (phrase) => {
    Alert.alert(
      'Deletar frase',
      'Tem certeza que deseja deletar essa frase?',
      [
        {
          text: 'Cancelar',
          onPress: () => { return },
          style: 'cancel'
        },
        {
          text: 'Sim, deletar',
          onPress: async () => {

            // Exclui o documento do banco de dados
            await deleteDoc(doc(db, 'phrases', phrase.id));

            // Cria um novo array local sem a frase que foi excluida
            const updatedPhrases = phrases.filter(item => item.id !== phrase);

            // Adicionar todas as frases ao nosso estado
            setPhrases(updatedPhrases);
          },
          style: 'default'
        }
      ],
      { cancelable: false }
    )
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
          <CardPhrases
            onLongPress={() => deletePhrase(item.id)}
          >
            <CardTextPhrases>{item.text}</CardTextPhrases>
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