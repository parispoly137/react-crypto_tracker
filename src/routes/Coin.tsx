import { useLocation } from "react-router-dom";
import styled from "styled-components";

// styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header = styled.header`
  margin: 40px 0;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 38px;
`;

// Declaration of variables

// Main

export default function Coin() {
  // Link 컴포넌트로 Route states를 보내고, 이를 useLocation으로 받음
  const {
    state: { name }, // 객체 분해 할당
  } = useLocation();

  return (
    <Container>
      <Header>
        <Title>{name}</Title>
      </Header>
    </Container>
  );
}
