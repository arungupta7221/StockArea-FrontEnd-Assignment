import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editWarehouse } from '../redux/warehousesSlice'
import './WareHouseDetail.css'

const WarehouseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const warehouses = useSelector((state) => state.warehouses)

  const [warehouse, setWarehouse] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Find the selected warehouse by ID from the Redux store
    const selectedWarehouse = warehouses.find((w) => w.id === parseInt(id, 10))

    if (selectedWarehouse) {
      setWarehouse(selectedWarehouse)
    } else {
      // If the warehouse with the given ID is not found, redirect to the Warehouse List page
      navigate('/')
    }
  }, [id, warehouses, navigate])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)

    // Dispatch an action to edit the warehouse information
    dispatch(editWarehouse(warehouse))
  }

  const handleCancelClick = () => {
    setIsEditing(false)

    // Reset the warehouse data to its original state
    const originalWarehouse = warehouses.find((w) => w.id === parseInt(id, 10))
    setWarehouse(originalWarehouse)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setWarehouse({
      ...warehouse,
      [name]: value,
    })
  }

  if (!warehouse) {
    return <div>Loading...</div>
  }

  return (
    <div className="warehouse-details-container">
      {' '}
      {/* Add a container class */}
      <h1 className="warehouse-details-heading">Warehouse Details</h1>
      <button className="edit-button" onClick={handleEditClick}>
        Edit
      </button>
      {isEditing ? (
        <>
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </>
      ) : null}
      <div>
        <label className="label">Name:</label>
        <input
          type="text"
          name="name"
          value={warehouse.name}
          onChange={handleChange}
          readOnly={!isEditing}
          className="input"
        />
      </div>
      <div>
        <label className="label">City:</label>
        <input
          type="text"
          name="city"
          value={warehouse.city}
          onChange={handleChange}
          readOnly={!isEditing}
          className="input"
        />
      </div>
      <div>
        <label className="label">Cluster:</label>
        <input
          type="text"
          name="cluster"
          value={warehouse.cluster}
          onChange={handleChange}
          readOnly={!isEditing}
          className="input"
        />
      </div>
      <div>
        <label className="label">Space Available:</label>
        <input
          type="number"
          name="space_available"
          value={warehouse.space_available}
          onChange={handleChange}
          readOnly={!isEditing}
          className="input"
        />
      </div>
      <div>
        <label className="label">Is Live:</label>
        <input
          type="checkbox"
          name="is_live"
          checked={warehouse.is_live}
          onChange={handleChange}
          disabled={!isEditing}
          className="checkbox"
        />
      </div>
    </div>
  )
}

export default WarehouseDetails
