import React, { useEffect, useState } from 'react'
import { Typography, Button, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { searchTruck } from '../../../../actions/truck'
const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

const typeSeacrh = [
  {
    value: 'truckPlate',
    title: 'Truck plate',
  },
  {
    value: 'cargoType',
    title: 'Cargo Type',
  },
  {
    value: 'diver',
    title: 'Driver',
  },
  {
    value: 'truckType',
    title: 'Truck Type',
  },
  {
    value: 'price',
    title: 'Price',
  },
  {
    value: 'dimension',
    title: 'Dimension',
  },
  {
    value: 'parkingAddress',
    title: 'Parking Address',
  },
  {
    value: 'status',
    title: 'Status',
  },
  {
    value: 'description',
    title: 'Description',
  },
]

const Main = () => {
  const [random, setRandom] = useState(0)
  const [currentSelect, setCurrentSelect] = useState('truckPlate')
  const truckState = useSelector((state) => state.truck)
  const { trucks, requesting, error, searchChange, searchText } = truckState
  const dispath = useDispatch()

  useEffect(() => {
    dispath({ type: '_GET_ALL_TRUCK' })
  }, [])

  useEffect(() => {
    setRandom(Math.random())
  }, [searchChange])

  function handleSelectChange(value) {
    setCurrentSelect(value)
  }

  const onSearch = (value) => {
    const options = {
      value,
      type: currentSelect,
    }
    dispath({ type: '_SEARCH_TEXT', payload: options })
  }

  const handleDeleteRecord = (id) => {
    dispath({
      type: '_DELETE_TRUCK',
      payload: id,
    })
  }

  const handleChangeSearch = (e) => {
    const value = e.target.value
    dispath({ type: 'TYPE_SEARCH', payload: value })
  }

  return (
    <div>
      <Title level={3} className="mt-3">
        Truck Management
      </Title>
      <Button type="primary" size={'default'} className="mb-3">
        <Link to="/truck/add">Add Truck</Link>
      </Button>
      <div>
        {requesting && !error && <Text italic>Loading...</Text>}
        {error && <Text type="danger">Something went wrong...</Text>}
        {!requesting && !error && (
          <>
            <div className="flex justify-end">
              <Select
                defaultValue={currentSelect}
                style={{ width: 120, marginRight: 10 }}
                onChange={handleSelectChange}
              >
                {typeSeacrh.map((e, i) => (
                  <Option key={i} value={e.value}>
                    {e.title}
                  </Option>
                ))}
              </Select>
              <Search
                value={searchText}
                onChange={handleChangeSearch}
                placeholder="Type here to search..."
                onSearch={onSearch}
                enterButton
                style={{ width: 304, float: 'right', paddingRight: 50 }}
                className="mb-2 "
              />
            </div>
            <Table
              defaultCurrent={1}
              data={trucks}
              onDeleteRecord={handleDeleteRecord}
            />
            )
          </>
        )}
      </div>
    </div>
  )
}

export default Main
