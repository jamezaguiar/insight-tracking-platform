import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import {
  FiChevronLeft,
  FiTag,
  FiMessageSquare,
  FiCalendar,
} from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, FormContainer } from './styles';

interface EditActivityParams {
  activity_id: string;
  candidate_id: string;
}

interface EditActivityFormData {
  name?: string;
  description?: string;
  year?: number;
}

interface Activity {
  name: string;
  description: string;
  year: number;
}

const EditActivity: React.FC = () => {
  const { params } = useRouteMatch<EditActivityParams>();

  const [activity, setActivity] = useState<Activity | null>(null);

  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const handleGetActivity = useCallback(async () => {
    const response = await api.get<Activity>(
      `/candidate/activities/${params.activity_id}`,
    );

    setActivity(response.data);
  }, [params.activity_id]);

  useEffect(() => {
    handleGetActivity();
  }, [handleGetActivity]);

  const handleSubmit = useCallback(
    async (data: EditActivityFormData) => {
      try {
        setLoading(true);

        const response = await api.put(`/activities/${params.candidate_id}`, {
          id: params.activity_id,
          name: data.name,
          description: data.description,
          year: data.year,
        });

        addToast({
          type: 'success',
          title: 'Atividade editada com sucesso',
          description: `A atividade ${response.data.name} foi editada.`,
        });

        history.push(`/activities/${params.candidate_id}`);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao editar atividade',
          description: 'Não foi possível editar a atividade, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, params.activity_id, params.candidate_id],
  );

  return (
    <Container>
      <Link to="/">
        <FiChevronLeft size={24} />
        Voltar
      </Link>
      <FormContainer>
        <h1>Editar atividade</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            defaultValue={activity?.name}
            icon={FiTag}
            placeholder="Nome"
          />
          <Input
            name="description"
            defaultValue={activity?.description}
            icon={FiMessageSquare}
            placeholder="Descrição"
          />
          <Input
            name="year"
            defaultValue={activity?.year}
            icon={FiCalendar}
            placeholder="Ano"
          />

          <Button type="submit" loading={loading}>
            Editar
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default EditActivity;
