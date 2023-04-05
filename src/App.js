import './App.css';
import Questions from './Questions/Questions';
//import LandingPage from './LandingPage/LandingPage';

function App() {
  return (
    <main className='main'>
        
      <div className='container'>
         <div className='top-circle'></div>
          <div className='bottom-circle'></div>
          <Questions />
      </div>
    </main>
  );
}

export default App;
