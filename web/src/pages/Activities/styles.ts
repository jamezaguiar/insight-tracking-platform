import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CandidateInfo = styled.div`
  margin-top: 60px;

  font-size: 32px;
  text-align: center;

  p {
    font-size: 26px;
    margin-top: 8px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 64px;

  font-size: 24px;

  span,
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

export const ActivitiesContainer = styled.div`
  margin-top: 80px;
`;

export const Activity = styled.div`
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

  h1 {
    color: #000;
  }

  p {
    color: #222;
  }
`;
