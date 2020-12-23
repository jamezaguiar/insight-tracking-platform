import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { FiChevronLeft, FiUser, FiMail, FiNavigation } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface NewActivityParams {
  candidate_id: string;
}
interface NewActivityFormData {
  name: string;
  description: string;
  year: number;
}

const NewActivity: React.FC = () => {
  const { params } = useRouteMatch<NewActivityParams>();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: NewActivityFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Digite o nome da atividade'),
          description: Yup.string().required('Digite a descrição da atividade'),
          year: Yup.string()
            .matches(/^[0-9]+$/, 'Apenas números')
            .min(4, 'Digite um ano com 4 dígitos')
            .max(4, 'Digite um ano com 4 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post(
          `/activities/${params.candidate_id}`,
          data,
        );

        addToast({
          type: 'success',
          title: 'Atividade cadastrada com sucesso',
          description: `O atividade ${response.data.name} foi cadastrada.`,
        });

        history.push(`/activities/${params.candidate_id}`);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao cadastrar atividade',
          description:
            'Não foi possível cadastrar a atividade, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, params.candidate_id],
  );

  return (
    <Container>
      <Link to={`/activities/${params.candidate_id}`}>
        <FiChevronLeft size={24} />
        Voltar
      </Link>
      <FormContainer>
        <h1>Nova atividade</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="description" icon={FiMail} placeholder="Descrição" />
          <Input name="year" icon={FiNavigation} placeholder="Ano" />

          <Button type="submit" loading={loading}>
            Cadastrar
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default NewActivity;
