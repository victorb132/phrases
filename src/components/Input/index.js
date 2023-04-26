import { Container, InputText } from './styles';

export function Input({ ...rest }) {
  return (
    <Container>
      <InputText {...rest} />
    </Container>
  )
}