// WarehouseList.js
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWarehouses } from '../redux/warehousesSlice'
import { Link } from 'react-router-dom'
import warehouseData from '../warehouseData'
import './WareHouseList.css'

const WarehouseList = () => {
  const dispatch = useDispatch()
  const warehouses = useSelector((state) => state.warehouses)

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses)
  const [filters, setFilters] = useState({ city: '', cluster: '', spaceLimit: '' })

  useEffect(() => {
    dispatch(fetchWarehouses(warehouseData))
  }, [dispatch])

  useEffect(() => {
    const filtered = warehouses.filter(
      (warehouse) =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filters.city || warehouse.city === filters.city) &&
        (!filters.cluster || warehouse.cluster === filters.cluster) &&
        (!filters.spaceLimit || warehouse.space_available >= parseInt(filters.spaceLimit, 10)),
    )
    setFilteredWarehouses(filtered)
  }, [searchTerm, filters, warehouses])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  return (
    <div>
      <h1>Warehouse List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select name="city" value={filters.city} onChange={handleFilterChange}>
        <option value="">All Cities</option>
        {Array.from(new Set(warehouses.map((warehouse) => warehouse.city))).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select name="cluster" value={filters.cluster} onChange={handleFilterChange}>
        <option value="">All Clusters</option>
        {Array.from(new Set(warehouses.map((warehouse) => warehouse.cluster))).map((cluster) => (
          <option key={cluster} value={cluster}>
            {cluster}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="spaceLimit"
        placeholder="Space Available Limit"
        value={filters.spaceLimit}
        onChange={handleFilterChange}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Cluster</th>
            <th>Space Available</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>
                <Link to={`/warehouse/${warehouse.id}`}>{warehouse.name}</Link>
              </td>
              <td>{warehouse.city}</td>
              <td>{warehouse.cluster}</td>
              <td>{warehouse.space_available}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WarehouseList
