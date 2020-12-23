import React, { useCallback, useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiPlus, FiChevronLeft } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';

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

  const { addToast } = useToast();

  const handleGetCandidate = useCallback(async () => {
    const response = await api.get(`/candidates/${params.candidate_id}`);
    setCandidate(response.data);
  }, [params.candidate_id]);

  const handleDeleteCandidateActivity = useCallback(
    async (activity_id: string) => {
      try {
        await api.delete(`/activities?activity_id=${activity_id}`);
        handleGetCandidate();

        addToast({
          title: 'Feito!',
          type: 'success',
          description: 'Atividade excluída com sucesso!',
        });
      } catch (err) {
        addToast({
          title: 'Algo deu errado.',
          type: 'error',
          description: 'Não foi possível excluir a atividade, tente novamente.',
        });
      }
    },
    [addToast, handleGetCandidate],
  );

  useEffect(() => {
    handleGetCandidate();
  }, [handleGetCandidate]);

  return (
    candidate && (
      <Container>
        <CandidateInfo>
          <h1>{candidate.name}</h1>
          <p>{candidate.email}</p>
          <p>{candidate.address}</p>
        </CandidateInfo>

        <Options>
          <Link to="/">
            <FiChevronLeft size={24} />
            Voltar
          </Link>
          <Link to={`/new-activity/${candidate.id}`}>
            <FiPlus size={24} />
            Cadastrar atividade
          </Link>
        </Options>

        <ActivitiesContainer>
          {candidate.activities.map((activity) => (
            <Activity key={activity.id}>
              <div>
                <h1>{activity.name}</h1>
                <p>{activity.description}</p>
                <p>{activity.year}</p>
              </div>
              <div>
                <Link to={`/edit-activity/${candidate.id}/${activity.id}`}>
                  <Button type="button">Editar</Button>
                </Link>
                <Button
                  type="button"
                  onClick={() => {
                    handleDeleteCandidateActivity(activity.id);
                  }}
                >
                  Excluir
                </Button>
              </div>
            </Activity>
          ))}
        </ActivitiesContainer>
      </Container>
    )
  );
};

export default Activities;
