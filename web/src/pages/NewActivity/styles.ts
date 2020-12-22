import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 60px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: #ddd;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ddd')};
    }

    font-size: 24px;

    margin-bottom: 32px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 500px;

  background-color: #fff;
  border: 4px solid #e6e6e6;

  border-radius: 16px;

  padding: 16px;

  h1 {
    color: #000;

    margin: 32px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
  }

  button {
    width: 100%;
    margin-bottom: 32px;
  }
`;
