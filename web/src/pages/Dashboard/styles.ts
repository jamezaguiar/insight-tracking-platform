import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 14px;

  margin-top: 32px;

  img {
    width: 300px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 64px;

  font-size: 24px;

  a {
    display: flex;
    align-items: center;
    margin: 16px;

    text-decoration: none;

    color: #ddd;

    transition: color 0.2s;

    cursor: pointer;

    &:hover {
      color: ${shade(0.2, '#ddd')};
    }

    svg {
      margin-right: 8px;
    }
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

  div {
    button {
      width: 120px;
      height: 40px;

      border: none;

      margin: 8px;

      color: #eee;
      background-color: #007fff;

      transition: background-color 0.2s;

      &:hover {
        background-color: ${shade(0.2, '#007fff')};
      }
    }
  }
`;
