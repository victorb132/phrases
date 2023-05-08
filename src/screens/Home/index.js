import { useState, useEffect } from 'react';

// Importar a referência do nosso banco de dados do firebase
import { db } from '../../config/firebase';
// Importar as funções do firestore
import { query, collection, getDocs } from 'firebase/firestore';

import {
  Container,
  PhraseText,
  PhraseButton,
  PhraseButtonText
} from './styles';

export default function Home() {
  const [phrase, setPhrase] = useState();

  const loadPhrase = async () => {
    // Query para buscar nossa coleção no banco de dados
    const queryOnDb = query(collection(db, 'phrases'));

    // Buscar os dados (documentos) no banco de dados
    const querySnapshot = await getDocs(queryOnDb);

    // Array vazio para armazenar os nossos dados (documentos)
    let phrases = [];

    // Para cada dado encontrado, adicionamos o dado (documento) no array
    querySnapshot.forEach((doc) => {
      phrases.push(doc.data());
    });

    // Adiciona uma unica frase ao nosso estado
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)])
  }

  useEffect(() => {
    loadPhrase();
  }, []);

  return (
    <Container>
      <PhraseText>{phrase ? phrase.text : ''}</PhraseText>
      <PhraseButton onPress={() => loadPhrase()}>
        <PhraseButtonText>Mudar frase</PhraseButtonText>
      </PhraseButton>
    </Container >
  );
}