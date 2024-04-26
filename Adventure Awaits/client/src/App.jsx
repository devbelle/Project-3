import './index.css';
import Page from './components/pages/index.jsx'
import {useLocation} from 'react-router-dom'

function App() {
const currentPage = useLocation().pathname;
console.log(currentPage);

  return (
    <div className='home'>
      <Page currentPage = {currentPage}/>
    </div>
  );
}

export default App
