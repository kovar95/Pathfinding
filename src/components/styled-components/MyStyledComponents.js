import styled from 'styled-components';
import background from '../../images/maze.jpg';

export const Title = styled.h1`
  color: red;
  text-align: center;
  margin-top: 150px;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const GameWrapper = styled(Wrapper)`
  margin: 200px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    display: inline-block;
    font-size: 18px;
    margin: 12px;
  }
  button {
    font-family: monospace;
    border-radius: 5px;
    padding: 5px;
    opacity: 0.7;
    font-weight: bold;
    text-shadow: 1px 1px 1px white;
    cursor: pointer;
    margin: 10px;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Field = styled.div`
  display: flex;
  margin: 10px;
  justify-content: center;
  position: relative;
  height: 42px;
  span {
    margin: 5px;
    padding: 3px;
    width: 100px;
    display: inline-block;
    font-size: 20px;
  }
  input {
    width: 30px;
    margin: 5px;
    padding: 3px;
    text-align: center;
    margin-right: 32px;
    border-radius: 5px;
    border: 1px solid red;
  }
`;

export const Automode = styled(Field)`
  width: 180px;
  padding-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Algo = styled.ul`
  list-style: none;
  position: absolute;
  padding: 0;
  min-height: 20px;
  width: 211px;
  cursor: pointer;
  font-size: 19px;
  top: -15px;
  left: 56px;
  &:hover li {
    display: block;
  }
`;

export const ListItem = styled.li`
  color: ${props => (props.bgcolor ? 'green' : 'red')};
  display: none;
  cursor: pointer;
  height: 20px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

export const Table = styled.table`
  td {
    border: 1px solid black;
    background-color: rgb(71 72 237 / 70%);
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 13px;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  max-width: 2000px;
  background: url(${background});
  padding: 50px 0 231px 0;
  background-attachment: fixed;
  background-size: cover;
  font-family: monospace;
  font-weight: bold;
  text-shadow: 1px 1px 1px gray;
  color: white;
`;

export const StyledLevels = styled.div`
  margin: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
export const Level = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
  width: 290px;
  position: relative;
  background-color: #0d47a1;
  border-radius: 10px;
  padding: 5px;
  img {
    position: absolute;
    display: block;
    width: 25px;
    right: 7px;
    top: 7px;
    cursor: pointer;
  }
`;

export const GameTitle = styled.h2`
  background-color: ${props => (props.bgcolor ? 'green' : 'red')};
  padding: 3px;
  border-radius: 5px;
`;

export const Info = styled.p`
  font-size: 12px;
  margin: 2px 12px;
`;

export const StyledAlgo = styled.div`
  background-color: #2196f3;
  border-radius: 10px;
  padding: 3px;
  margin: 5px;
`;

export const Button = styled.div`
  background-color: gray;
  padding: 10px;
  text-decoration: none;
  color: white;
  font-size: 18px;
  text-shadow: 1px 1px 2px black;
  border-radius: 6px;
  margin-left: 200px;
  box-shadow: 1px 1px 3px white;
  opacity: 0.7;
  width: 36px;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export const ReplayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(44, 209, 222, 0.85);
  width: 100%;
  height: 100%;
  z-index: 444;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ExitButton = styled.button`
  width: 33px;
  height: 33px;
  background-color: red;
  position: fixed;
  z-index: 4567;
  top: 10px;
  right: 10px;
`;

export const Alerts = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  width: 180px;
  p {
    background-color: red;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
  }
`;
