import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WarehouseList from './components/WareHouseList'
import WarehouseDetails from './components/WareHouseDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WarehouseList />} />
        <Route path="/warehouse/:id" element={<WarehouseDetails />} />
      </Routes>
    </Router>
  )
}

export default App
