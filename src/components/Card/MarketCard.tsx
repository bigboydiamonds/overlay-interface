import { Card } from "../../components/Card/Card";
import { Column } from "../../components/Column/Column";
import { TEXT } from "../../theme/theme";
import styled from 'styled-components/macro';

const Container = styled(Column)`
  padding: 24px 0 0;
  max-width: 500px;
  margin: auto;
  z-index: 6.9;
`;

const Title = styled(TEXT.Body)<{align?: string}>`
  margin: 0 auto 8px 0 !important;
  font-weight: 700;
  text-align: ${({align}) => (align ? align : 'left')};
  width: 100%;
`;

export const MarketCard = ({
  title, 
  children,
  align,
  padding
}:{
  title?: string
  children: React.ReactNode
  align?: string
  padding?: string
}) => {
  return (
    <Container>
      <Title align={align}> {title} </Title>
      <Card borderRadius={'4px'} padding={padding}>
        {children}
      </Card>
    </Container>
  )
};
