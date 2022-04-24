import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { getTruck } from '../../../../actions/truck'
import FormTruck from '../../components/FormTruck'
import './Create.css'

const { Title } = Typography

const Create = () => {
  const { requesting, truck, error } = useSelector((state) => state.truck)
  const dispatch = useDispatch()

  const [isSubmit, setIsSubmit] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (isSubmit && !requesting && error) {
      alert('error')
    } else if (isSubmit && !requesting && !error) {
      alert('sussus')
    }
  }, [requesting, error])

  // Update
  const { id } = useParams()
  const location = useLocation()

  useEffect(() => {
    if (id) {
      console.log('render')
      const action = () => ({ type: '_GET_TRUCK', payload: id })
      dispatch(action())
      return () => {
        const action = getTruck({})
        dispatch(action)
      }
    }
  }, [])
  useEffect(() => {
    navigate(location.pathname)
  }, [truck])

  const onFinish = (values) => {
    if (id) {
      const newValues = { ...values, id }
      const action = () => ({ type: '_UPDATE_TRUCK', payload: newValues })
      dispatch(action())
      setIsSubmit(true)
    } else {
      const action = () => ({ type: '_ADD_TRUCK', payload: values })
      dispatch(action())
      setIsSubmit(true)
    }
  }

  return (
    <>
      <Title level={3} className="my-3">
        {id ? 'Update Truck' : 'Add Truck'}
      </Title>
      <div className="ml-5">
        {!id ? (
          <FormTruck onFinish={onFinish} />
        ) : !truck.truckPlate ? (
          'loading...'
        ) : (
          truck.truckPlate && (
            <FormTruck id={id} truck={truck} onFinish={onFinish} />
          )
        )}
      </div>
    </>
  )
}

export default Create
