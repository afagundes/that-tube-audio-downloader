import React from 'react';
import BottomBar from './components/BottomBar';
import Form from './components/Form';
import Header from './components/Header';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Layout>
        <Header />
        <Form />
      </Layout>
      <BottomBar />
    </>
  );
}

export default App;
