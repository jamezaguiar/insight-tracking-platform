import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

interface EditActivityParams {
  activity_id: string;
}

const EditActivity: React.FC = () => {
  const { params } = useRouteMatch<EditActivityParams>();

  return (
    <Container>
      <h1>{params.activity_id}</h1>
    </Container>
  );
};

export default EditActivity;
