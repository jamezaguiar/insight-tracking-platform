import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    margin: 80px 0;
  }

  > a {
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

export const SearchContainer = styled.div`
  form {
    display: flex;
    align-items: center;

    input {
      width: 75vw;
    }
  }
  button {
    width: 150px;
    height: 54px;
    margin: 0 0 0 8px;
  }
`;

export const CandidatesContainer = styled.div`
  margin-top: 80px;
`;

export const Candidate = styled.div`
  width: 95vw;
  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #ddd;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.05, '#ddd')};
  }

  border-radius: 2px;

  margin-bottom: 16px;

  strong {
    color: #000;
  }

  p {
    color: #222;
  }
`;
