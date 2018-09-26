import React from 'react';
import { Icon } from 'semantic-ui-react';

import Layout from './Layout';

const NoMatch = () => {
  return (
    <Layout>
      <Icon name="minus circle" size="huge" color="red" />
      <strong>Page not found!</strong>
    </Layout>
  );
};

export default NoMatch;
