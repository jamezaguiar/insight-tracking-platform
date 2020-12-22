import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  SearchContainer,
  CandidatesContainer,
  Candidate,
} from './styles';
import api from '../../services/api';

interface FindCandidatesFormData {
  activity_name: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
}

const FindCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activity, setActivity] = useState('');

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: FindCandidatesFormData) => {
    const response = await api.get<Candidate[]>(
      `/candidates/activities?activity_name=${data.activity_name}`,
    );

    if (response.data.length === 0) {
      addToast({
        type: 'info',
        title: 'Não encontrado',
        description: 'Não foram encontrados candidatos com essa atividade.',
      });
    }

    setActivity(data.activity_name);
    setCandidates(response.data);
  }, []);

  const handleDeleteCandidate = useCallback(
    async (candidate_id: string) => {
      try {
        await api.delete(`/candidates?candidate_id=${candidate_id}`);
        handleSubmit({ activity_name: activity });
        addToast({
          title: 'Feito!',
          type: 'success',
          description: 'Candidato excluído com sucesso!',
        });
      } catch (err) {
        addToast({
          title: 'Algo deu errado.',
          type: 'error',
          description: 'Não foi possível excluir o candidato, tente novamente.',
        });
      }
    },
    [activity, addToast, handleSubmit],
  );

  return (
    <Container>
      <h1>Buscar candidatos</h1>
      <Link to="/">
        <FiChevronLeft size={24} />
        Voltar
      </Link>
      <SearchContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="activity_name"
            placeholder="Digite o nome da atividade"
            icon={FiSearch}
          />
          <Button type="submit">Buscar</Button>
        </Form>
      </SearchContainer>
      <CandidatesContainer>
        {candidates.map((candidate) => (
          <Candidate key={candidate.id}>
            <div>
              <strong>{candidate.name}</strong>
              <p>{candidate.email}</p>
            </div>
            <div>
              <Link to={`activities/${candidate.id}`}>
                <Button type="button">Ver atividades</Button>
              </Link>
              <Link to={`edit-candidate/${candidate.id}`}>
                <Button type="button">Editar</Button>
              </Link>
              <Button
                type="button"
                onClick={() => handleDeleteCandidate(candidate.id)}
              >
                Excluir
              </Button>
            </div>
          </Candidate>
        ))}
      </CandidatesContainer>
    </Container>
  );
};

export default FindCandidates;
