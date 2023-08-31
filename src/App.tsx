import React from 'react'
import ReactDOM from 'react-dom/client'
import '../public/css/global.scss';
import  AA from '../public/images/1.png';
const App: React.FC<any> = () => {
  return(
    <div className='App'>
      <h2>hello react</h2>
      <img src={AA} alt="" />
    </div>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
