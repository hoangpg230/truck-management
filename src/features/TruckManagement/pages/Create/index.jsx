import React, { useEffect, useState } from 'react'
import './Create.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Typography } from 'antd'

import FormTruck from '../../components/FormTruck'

import { getTruck } from '../../../../actions/truck'

const { Title } = Typography

const Create = () => {
  const [idState, setIdState] = useState(null)
  const { requesting, truck, error } = useSelector((state) => state.truck)
  const dispatch = useDispatch()

  const [isSubmit, setIsSubmit] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (isSubmit && !requesting && error) {
      alert('error')
    } else if (isSubmit && !requesting && !error) {
      alert('success')
      navigate('/truck')
    }
  }, [requesting, error])
  var { id } = useParams()
  // Update
  const _path = useLocation().pathname
  const [path, setPath] = useState(_path)

  useEffect(() => {
    const action = () => ({ type: 'UPDATE_TRUCK', payload: {} })
    dispatch(action())
  }, [])
  useEffect(() => {
    if (id) {
      const action = () => ({ type: '_GET_TRUCK', payload: id })
      dispatch(action())

      return () => {
        const action = getTruck({})
        dispatch(action)
      }
    }
  }, [])
  const history = useNavigate()

  const onFinish = (values) => {
    if (id) {
      const newValues = { ...values, id }
      const action = () => ({ type: '_UPDATE_TRUCK', payload: newValues })
      dispatch(action())
      setIsSubmit(true)
    }
  }

  useEffect(() => {
    const action = () => ({ type: 'UPDATE_TRUCK', payload: {} })
    dispatch(action())
  }, [truck])
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
