import { ofType } from 'redux-observable'
import {
  switchMap,
  mergeMap,
  startWith,
  endWith,
  map,
  catchError,
} from 'rxjs/operators'
import { of, from } from 'rxjs'

import truckApi from '../api/truckApi'

const requesting = () => ({ type: 'TRUCK_REQUEST' })
const getAllTruck = (payload) => ({ type: 'GET_ALL_TRUCK', payload })
const addTruck = () => ({ type: 'ADD_TRUCK' })
const deleteTruck = () => ({ type: 'DELETE_TRUCK' })

export const getAllTruckEpic = (action$) =>
  action$.pipe(
    ofType('_GET_ALL_TRUCK'),
    switchMap((action) =>
      from(truckApi.getAll()).pipe(
        map(getAllTruck),
        catchError((error) => {
          return of({
            type: 'ERROR',
          })
        })
      )
    ),
    startWith(requesting())
  )

export const deleteTruckEpic = (action$, state$, { store }) =>
  action$.pipe(
    ofType('_DELETE_TRUCK'),
    switchMap((action) =>
      from(truckApi.delete(action.payload)).pipe(
        map(() => deleteTruck()),
        endWith(store.dispatch({ type: '_GET_ALL_TRUCK' })),
        catchError((error) => {
          return of({
            type: 'ERROR',
          })
        })
        // startWith(requesting())
      )
    )
  )

export const addTruckEpic = (action$, state$, { store }) =>
  action$.pipe(
    ofType('_ADD_TRUCK'),
    switchMap((action) =>
      from(truckApi.post(action.payload)).pipe(
        map(addTruck),
        catchError((error) => {
          return of({
            type: 'ERROR',
          })
        }),
        startWith(requesting())
      )
    )
  )
export default [getAllTruckEpic, addTruckEpic, deleteTruckEpic]
