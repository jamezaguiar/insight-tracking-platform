import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #007fff;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #eee;
  font-weight: 500;
  margin: 8px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#007fff')};
  }
`;
