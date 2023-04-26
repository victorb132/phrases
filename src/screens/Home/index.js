import { useState, useEffect } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import {
  Container,
  PhraseText,
  PhraseButton,
  PhraseButtonText
} from './styles';

export default function Home() {
  const { getItem } = useAsyncStorage('@phrases');

  const [phrase, setPhrase] = useState();

  const loadPhrases = async () => {
    const stringPhrases = await getItem();
    const parsedPhrases = JSON.parse(stringPhrases);

    if (parsedPhrases && parsedPhrases.length > 0) {
      setPhrase(parsedPhrases[Math.floor(Math.random() * parsedPhrases.length)])
    }
  }

  useEffect(() => {
    loadPhrases();
  }, []);

  return (
    <Container>
      <PhraseText>{phrase}</PhraseText>
      <PhraseButton onPress={() => loadPhrases()}>
        <PhraseButtonText>Mudar frase</PhraseButtonText>
      </PhraseButton>
    </Container >
  );
}