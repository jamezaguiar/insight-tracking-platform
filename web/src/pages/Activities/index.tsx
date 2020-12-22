import React from 'react';
import { FiPlus, FiChevronLeft } from 'react-icons/fi';
import { useRouteMatch, Link } from 'react-router-dom';

import {
  Container,
  CandidateInfo,
  Options,
  ActivitiesContainer,
  Activity,
} from './styles';

interface ActivitiesParams {
  candidate_id: string;
}

const Activities: React.FC = () => {
  const { params } = useRouteMatch<ActivitiesParams>();

  return (
    <Container>
      <CandidateInfo>
        <h1>Jamerson Aguiar</h1>
        <p>jamersonalsilva14@gmail.com</p>
        <p>Rua José Correia, N 203, Centro, Ocara-CE</p>
      </CandidateInfo>
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
        <Activity>
          <div>
            <h1>Typescript Masterclass</h1>
            <p>Primeiros passos com Typescript; Estrutura de projeto</p>
            <p>2020</p>
          </div>
          <div>
            <button type="button">Editar</button>
            <button type="button">Excluir</button>
          </div>
        </Activity>
      </ActivitiesContainer>
    </Container>
  );
};

export default Activities;
