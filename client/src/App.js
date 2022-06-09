import React from 'react';
import AudioPlayer from './components/audio-player/AudioPlayer';
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
      <AudioPlayer />
    </>
  );
}

export default App;
