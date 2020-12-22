import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

import api from '../../services/api';

import {
  Container,
  LogoContainer,
  Options,
  CandidatesContainer,
  Candidate,
} from './styles';

interface Candidate {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleGetCandidates = useCallback(async () => {
    const response = await api.get('/candidates');
    setCandidates(response.data);
  }, []);

  const handleDeleteCandidate = useCallback(
    async (candidate_id: string) => {
      await api.delete(`/candidates?candidate_id=${candidate_id}`);
      handleGetCandidates();
    },
    [handleGetCandidates],
  );

  useEffect(() => {
    handleGetCandidates();
  }, [handleGetCandidates]);

  return (
    <Container>
      <LogoContainer>
        <img
          src="https://insightlab.ufc.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/02/LogoInsight.png.webp"
          alt="Insight Logo"
        />
      </LogoContainer>
      <Options>
        <span>
          <FiPlus size={24} />
          Cadastrar candidato
        </span>
        <span>
          <FiSearch size={24} />
          Buscar candidatos por atividade
        </span>
      </Options>
      <CandidatesContainer>
        {candidates.map((candidate) => (
          <Candidate key={candidate.id}>
            <div>
              <strong>{candidate.name}</strong>
              <p>{candidate.email}</p>
            </div>
            <div>
              <Link to={`activities/${candidate.id}`}>
                <button type="button">Ver atividades</button>
              </Link>
              <button type="button">Editar</button>
              <button
                type="button"
                onClick={() => handleDeleteCandidate(candidate.id)}
              >
                Excluir
              </button>
            </div>
          </Candidate>
        ))}
      </CandidatesContainer>
    </Container>
  );
};

export default Dashboard;
