import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

interface EditCandidateParams {
  candidate_id: string;
}

const EditCandidate: React.FC = () => {
  const { params } = useRouteMatch<EditCandidateParams>();

  return (
    <Container>
      <h1>{params.candidate_id}</h1>
    </Container>
  );
};

export default EditCandidate;
