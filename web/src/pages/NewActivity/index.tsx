import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

interface NewActivityParams {
  candidate_id: string;
}

const NewActivity: React.FC = () => {
  const { params } = useRouteMatch<NewActivityParams>();

  return (
    <Container>
      <h1>{params.candidate_id}</h1>
    </Container>
  );
};

export default NewActivity;
