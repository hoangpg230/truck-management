import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Space, Button, Modal, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Text } = Typography

export default ({ data, onDeleteRecord }) => {
  const [visible, setVisible] = useState(false)
  const [idTruck, setIdTruck] = useState(0)

  const onDelete = (id) => {
    showModal()
    setIdTruck(id)
  }

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const handleDeleteRecord = () => {
    setVisible(false)
    onDeleteRecord(idTruck)
  }

  const columns = [
    {
      title: 'Truck plate',
      dataIndex: 'truckPlate',
      width: '10%',
    },
    {
      title: 'Cargo Type',
      dataIndex: 'cargoType',
      width: '10%',
      render: (text) => text.join(', '),
    },
    {
      title: 'Driver',
      dataIndex: 'diver',
      with: '10%',
    },
    {
      title: 'Truck Type',
      dataIndex: 'truckType',
      with: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      with: '10%',
    },
    {
      title: 'Dimension (L-W-H)',
      dataIndex: 'dimension',
      with: '10%',
    },
    {
      title: 'Parking Address',
      dataIndex: 'pakingAddress',
      with: '10%',
    },
    {
      title: 'Production Year',
      dataIndex: 'productionYear',
      sorter: (a, b) => a.productionYear - b.productionYear,
      with: '5%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      with: '10%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      with: '10%',
    },
    {
      title: 'Action',
      with: '5%',
      render: (record) => {
        return (
          <>
            <Space size="middle">
              <Link to={`/truck/update/${record.id}`}>
                <EditOutlined />
              </Link>

              <DeleteOutlined onClick={() => onDelete(record.id)} />
            </Space>
          </>
        )
      },
    },
  ]
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title={<Text type="danger">Delete record</Text>}
        visible={visible}
        onOk={handleDeleteRecord}
        onCancel={hideModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Do you want continue...</p>
      </Modal>
    </>
  )
}
