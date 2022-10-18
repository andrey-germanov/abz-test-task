import { Header } from './components/Header';
import { Users } from './components/Users';
import { Forms } from './components/Form';
import { WelcomeBlock } from './components/WelcomeBlock';

const App = () => {
  return (
    <div className="App">
     <Header/>
     <WelcomeBlock/>
     <Users/>
     <Forms/>
    </div>
  );
}

export default App;
