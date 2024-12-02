
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import axios from 'axios';
import './App.css';
import UserContextProvider from './context/UserContext';
import Loginpage from './pages/Loginpage';
import Home from './pages/Home';
import Adminlanding from './pages/adminPages/Adminlanding';
import InventoryManagerLanding from './pages/inventorymanager/InventoryManagerLanding';
//import ProductManagerLanding from './pages/productmanager/ProductManagerLanding';
import SalesManagerLanding from './pages/salesmanager/SalesManagerLanding';
import ProtectedRoute from './protectedRouters/ProtectedRoute';
import Notifacition from './pages/adminPages/Notification'
import Inventory from './pages/inventorymanager/Inventory';
import Profile from './pages/inventorymanager/Profile';



axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}></Toaster>
        <Routes>
          <Route path='/' element={<Loginpage/>}/>
          <Route path='/home' element={<Home/>}/>

          <Route path='/admindash' element={<ProtectedRoute><Adminlanding/></ProtectedRoute>}/>
          <Route path='/Notifacition' element={<Notifacition/>}/>
          
          <Route path='/inventorymanagerdash' element={<ProtectedRoute><InventoryManagerLanding/></ProtectedRoute>}/>   
          <Route path='/inventory' element={<ProtectedRoute><Inventory/></ProtectedRoute>}></Route>
          <Route path='/my-profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
          
          <Route path='/salesmanagerdash' element={<ProtectedRoute><SalesManagerLanding/></ProtectedRoute>}/>    
      
        </Routes>
        </UserContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
