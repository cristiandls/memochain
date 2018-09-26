import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <Link to="/memogame">Ir al juego!!</Link>
    </Layout>
  );
};

export default Home;
