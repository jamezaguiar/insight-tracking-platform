import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { FiChevronLeft, FiUser, FiMail, FiNavigation } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContainer } from './styles';

interface EditCandidateParams {
  candidate_id: string;
}

interface EditCandidateFormData {
  name?: string;
  email?: string;
  address?: string;
}

interface Candidate {
  name: string;
  email: string;
  address: string;
}

const EditCandidate: React.FC = () => {
  const { params } = useRouteMatch<EditCandidateParams>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleGetCandidate = useCallback(async () => {
    const response = await api.get<Candidate>(
      `/candidates/${params.candidate_id}`,
    );

    setCandidate(response.data);
  }, [params.candidate_id]);

  useEffect(() => {
    handleGetCandidate();
  }, [handleGetCandidate]);

  const handleSubmit = useCallback(
    async (data: EditCandidateFormData) => {
      try {
        setLoading(true);

        const response = await api.put('/candidates', {
          id: params.candidate_id,
          name: data.name,
          email: data.email,
          address: data.address,
        });

        addToast({
          type: 'success',
          title: 'Candidato editado com sucesso',
          description: `O candidato ${response.data.name} foi editado.`,
        });

        history.push(`/activities/${params.candidate_id}`);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar candidato',
          description: 'Não foi possível editar o candidato, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, params.candidate_id],
  );

  return (
    <Container>
      <Link to="/">
        <FiChevronLeft size={24} />
        Voltar
      </Link>
      <FormContainer>
        <h1>Editar candidato</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            defaultValue={candidate?.name}
            icon={FiUser}
            placeholder="Nome"
          />
          <Input
            name="email"
            defaultValue={candidate?.email}
            icon={FiMail}
            placeholder="E-mail"
          />
          <Input
            name="address"
            defaultValue={candidate?.address}
            icon={FiNavigation}
            placeholder="Endereço"
          />

          <Button type="submit" loading={loading}>
            Editar
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default EditCandidate;
