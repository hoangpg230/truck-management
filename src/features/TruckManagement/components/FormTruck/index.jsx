import { Form, Input, Button, Typography, Select, AutoComplete } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select

function FormTruck({ id, truck, onFinish }) {
  const dispatch = useDispatch()
  const [lengthDesc, setLengthDesc] = useState(0)
  const [lengthParkingAddress, setLengthParkingAddress] = useState(0)
  const [optionsSelected, setOptionsSelected] = useState([])
  const [result, setResult] = useState([])

  if (id) {
    var { truckPlate, cargoType, diver, pakingAddress, description } = truck
  }

  useEffect(() => {
    if (id) {
      setLengthDesc(description.length)
      setLengthParkingAddress(pakingAddress.length)
    }
  }, [truck])

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

  const handleSearchAutoComplete = (value) => {
    let res = []

    if (!value) {
      res = []
    } else {
      res = ['Jack', 'Jonh', 'Lucy'].filter((element) =>
        element.toLowerCase().includes(value.toLowerCase())
      )
    }

    setResult(res)
  }

  const handleFinish = (values) => {
    onFinish(values)
  }

  useEffect(() => {
    console.log()
    return () => {
      console.log('log')
      dispatch({ type: 'UPDATE_TRUCK', payload: {} })
    }
  }, [])

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
        validateTrigger="onBlur"
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
        <AutoComplete
          onSearch={handleSearchAutoComplete}
          placeholder="input here"
        >
          {result.map((email) => (
            <Option key={email} value={email}>
              {email}
            </Option>
          ))}
        </AutoComplete>
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
            max: 200,
            message: 'Max length is 200 characters!',
          },
        ]}
        style={{ margin: 0 }}
        hasFeedback
      >
        <TextArea
          onChange={handleOnChangePakingAddress}
          rows={4}
          placeholder="maxLength is 200"
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
            max: 200,
            message: 'Max length is 200 characters!',
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
