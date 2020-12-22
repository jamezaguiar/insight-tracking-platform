import React from 'react';
import { Link } from 'react-router-dom';

import { FiPlus, FiSearch } from 'react-icons/fi';

import {
  Container,
  LogoContainer,
  Options,
  CandidatesContainer,
  Candidate,
} from './styles';

const Dashboard: React.FC = () => {
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
        <Candidate>
          <div>
            <strong>Jamerson Aguiar</strong>
            <p>jamersonalsilva14@gmail.com</p>
          </div>
          <div>
            <Link to="/activities/candidate_id">
              <button type="button">Ver atividades</button>
            </Link>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>
          </div>
        </Candidate>
        <Candidate>
          <div>
            <strong>Jamerson Aguiar</strong>
            <p>jamersonalsilva14@gmail.com</p>
          </div>
          <div>
            <Link to="/activities/candidate_id">
              <button type="button">Ver atividades</button>
            </Link>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>
          </div>
        </Candidate>
      </CandidatesContainer>
    </Container>
  );
};

export default Dashboard;
