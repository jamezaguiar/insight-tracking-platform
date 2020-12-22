import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiPlus, FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

import {
  Container,
  CandidateInfo,
  Options,
  ActivitiesContainer,
  Activity,
} from './styles';

interface Activity {
  id: string;
  name: string;
  description: string;
  year: number;
}
interface Candidate {
  id: string;
  name: string;
  email: string;
  address: string;
  activities: Activity[];
}

interface ActivitiesParams {
  candidate_id: string;
}

const Activities: React.FC = () => {
  const { params } = useRouteMatch<ActivitiesParams>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    api.get(`/candidates/${params.candidate_id}`).then((response) => {
      setCandidate(response.data);
    });
  }, [params.candidate_id]);

  return (
    <Container>
      {candidate && (
        <CandidateInfo>
          <h1>{candidate.name}</h1>
          <p>{candidate.email}</p>
          <p>{candidate.address}</p>
        </CandidateInfo>
      )}
      <Options>
        <Link to="/">
          <FiChevronLeft size={24} />
          Voltar
        </Link>
        <span>
          <FiPlus size={24} />
          Cadastrar atividade
        </span>
      </Options>

      <ActivitiesContainer>
        {candidate &&
          candidate.activities.map((activity) => (
            <Activity key={activity.id}>
              <div>
                <h1>{activity.name}</h1>
                <p>{activity.description}</p>
                <p>{activity.year}</p>
              </div>
              <div>
                <button type="button">Editar</button>
                <button type="button">Excluir</button>
              </div>
            </Activity>
          ))}
      </ActivitiesContainer>
    </Container>
  );
};

export default Activities;
