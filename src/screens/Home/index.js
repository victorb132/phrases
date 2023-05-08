import { useState, useEffect } from 'react';
import { db } from "../../config/firebase";
import { query, getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {
  Container,
  PhraseText,
  PhraseButton,
  PhraseButtonText
} from './styles';

export default function Home() {
  const [phrase, setPhrase] = useState();

  const loadPhrase = async () => {
    const q = query(collection(db, "phrases"));

    const querySnapshot = await getDocs(q);

    let phrases = [];

    querySnapshot.forEach((doc) => {
      phrases.push(doc.data());
    });

    console.log(phrases);

    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }

  useEffect(() => {
    loadPhrase();
  }, []);

  return (
    <Container>
      <PhraseText>{phrase?.name}</PhraseText>
      <PhraseButton onPress={() => loadPhrase()}>
        <PhraseButtonText>Mudar frase</PhraseButtonText>
      </PhraseButton>
    </Container >
  );
}