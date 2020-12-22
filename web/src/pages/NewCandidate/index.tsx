import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiChevronLeft, FiUser, FiMail, FiNavigation } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContainer } from './styles';

interface NewCandidateFormData {
  name: string;
  email: string;
  address: string;
}

const NewCandidate: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: NewCandidateFormData) => {
      try {
        setLoading(true);

        const response = await api.post('/candidates', data);

        addToast({
          type: 'success',
          title: 'Candidato cadastrado com sucesso',
          description: `O candidato ${response.data.name} foi cadastrado.`,
        });

        history.push('/');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar candidato',
          description:
            'Não foi possível cadastrar o candidato, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Link to="/">
        <FiChevronLeft size={24} />
        Voltar
      </Link>
      <FormContainer>
        <h1>Novo candidato</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="address" icon={FiNavigation} placeholder="Endereço" />

          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default NewCandidate;
