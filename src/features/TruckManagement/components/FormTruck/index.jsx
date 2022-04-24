import { Form, Input, Button, Typography, Select } from 'antd'
import { useState } from 'react'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select

function FormTruck({ id, truck, onFinish }) {
  const [lengthDesc, setLengthDesc] = useState(0)
  const [lengthParkingAddress, setLengthParkingAddress] = useState(0)
  const [optionsSelected, setOptionsSelected] = useState([])

  if (id) {
    var { truckPlate, cargoType, diver, pakingAddress, description } = truck
  }

  const children = []
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option
        disabled={
          optionsSelected.length > 10
            ? optionsSelected.includes(i.toString(36) + i)
              ? false
              : true
            : false
        }
        key={i.toString(36) + i}
      >
        {i.toString(36) + i}
      </Option>
    )
  }

  const handleChange = (value) => {
    setOptionsSelected(value)
  }

  const handleOnChangeDesc = (e) => {
    setLengthDesc(e.target.value.length)
  }

  const handleOnChangePakingAddress = (e) => {
    setLengthParkingAddress(e.target.value.length)
  }

  const handleFinish = (values) => {
    onFinish(values)
  }
  return (
    <Form
      initialValues={
        id && {
          truckPlate,
          cargoType,
          diver,
          pakingAddress,
          description,
        }
      }
      onFinish={handleFinish}
    >
      <Form.Item
        label="Truck Plate"
        wrapperCol={{
          offset: 1,
          span: 10,
        }}
        name="truckPlate"
        rules={[
          {
            required: true,
            message: 'Please input your truck plate!',
          },
          {
            pattern: /^[1-9]{1}[0-9]{1}[A-Z]{1}-([0-9]{4,5})$/,
            message: 'Truck plate can not correct format!',
          },
        ]}
      >
        <Input placeholder="Exp: 30A-12345 or 30A-1234" />
      </Form.Item>

      <Form.Item
        label="Cargo Type"
        wrapperCol={{
          offset: 1,
          span: 10,
        }}
        name="cargoType"
        rules={[
          {
            required: true,
            message: 'Please select your cargo type!',
          },
        ]}
      >
        <Select
          onChange={handleChange}
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
        >
          {children}
        </Select>
      </Form.Item>

      <Form.Item
        label="Driver"
        wrapperCol={{
          offset: 1,
          span: 10,
        }}
        name="diver"
        rules={[
          {
            required: true,
            message: 'Please select your driver!',
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Select a driver"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Parking address"
        wrapperCol={{
          offset: 1,
          span: 10,
        }}
        name="pakingAddress"
        rules={[
          {
            max: 15,
            message: 'Max length is 15 characters!',
          },
        ]}
        style={{ margin: 0 }}
        hasFeedback
      >
        <TextArea
          onChange={handleOnChangePakingAddress}
          rows={4}
          placeholder="maxLength is 200"
          maxLength={200}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 12,
        }}
      >
        <Text>{`${lengthParkingAddress} / 200`}</Text>
      </Form.Item>

      <Form.Item
        label="Description"
        wrapperCol={{
          offset: 1,
          span: 10,
        }}
        name="description"
        rules={[
          {
            max: 15,
            message: 'Max length is 15 characters!',
          },
        ]}
        style={{ margin: 0 }}
        hasFeedback
      >
        <TextArea
          onChange={handleOnChangeDesc}
          rows={4}
          placeholder="maxLength is 200"
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 12,
        }}
      >
        <Text>{`${lengthDesc} / 200`}</Text>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormTruck
