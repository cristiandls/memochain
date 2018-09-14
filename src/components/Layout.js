import React from 'react';
import { Header, Container } from 'semantic-ui-react';

import { h1 } from './Layout.css';

const Layout = ({ children }) => {
  return (
    <Container>
      <Header as="h1" className={h1}>
        MemoChain
      </Header>
      {children}
    </Container>
  );
};

export default Layout;
