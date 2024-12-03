import {Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home';
import { SocketProvider } from './providers/socket';
import RoomPage from './Pages/Room';
import { PeerProvider } from './providers/Peer';



function App() {






  return (
    <div className="App">
     

     <PeerProvider> 
      <SocketProvider> 

      <Routes> 
      <Route  path="/"  element={<Home/>}  / >
      <Route  path="/room/:roomId"  element={<RoomPage/>}  / >
      </Routes>

      
      </SocketProvider>
      </PeerProvider>
     
    </div>
  );
}

export default App;
