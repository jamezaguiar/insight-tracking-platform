import React from 'react';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <img
        src="https://insightlab.ufc.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/02/LogoInsight.png.webp"
        alt="Insight Logo"
      />
      <h1>Dashboard</h1>
    </Container>
  );
};

export default Dashboard;
