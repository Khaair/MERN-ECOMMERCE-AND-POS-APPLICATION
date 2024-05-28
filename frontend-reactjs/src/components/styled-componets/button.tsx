import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => props.bgColor || '#E8F2FC'};
  color: ${(props) => (props.bgColor ? '#fff' : '#28A0F7')};
  font-weight: bold;
  padding: 7px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.bgColor ? '#0b5394' : '#0b5394')};
    color: ${(props) => (props.bgColor ? '#fff' : '#fff')};
  }
`;

const MyButton = ({ onClick, children, bgColor }: any) => {
  return <StyledButton bgColor={bgColor} onClick={onClick}>{children}</StyledButton>;
};

export default MyButton;
