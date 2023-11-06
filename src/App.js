import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HotelList from './screens/hotelList/HotelList';
import Hotel from './screens/hotel/Hotel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/:id" Component={Hotel} />
        <Route path="*" Component={HotelList} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
