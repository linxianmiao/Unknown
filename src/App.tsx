import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import '../public/css/global.scss';
import AA from '../public/images/1.png';
import { MainLayout } from './components';

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <MainLayout className='test'>
        <div className='App'>
          <h2>hello react</h2>
          <img src="https://media-streaming.yahaha.com/mediaType/11ff305f-14f9-4e6a-b92f-2c00265af3ee/App.png" alt="" />
          <img src={AA} alt="" />
        </div>
      </MainLayout>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(<App />);
