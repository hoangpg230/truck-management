import common from '../utils/common'

const initState = {
  trucks: [],
  truck: {},
  requesting: false,
  success: false,
  error: false,
  searchChange: false,
  searchText: '',
}
let tmpTrucks = []

const truckReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TRUCK_REQUEST':
      state.error = false
      state.success = false
      state.requesting = true
      return { ...state }
    case 'GET_ALL_TRUCK':
      state.trucks = common.transformArray([...action.payload]).reverse()
      tmpTrucks = state.trucks
      state.requesting = false
      return { ...state }
    case 'GET_TRUCK':
      state.truck = action.payload
      state.requesting = false
      return { ...state }
    case 'ADD_TRUCK':
      state.requesting = false
      return { ...state }
    case 'UPDATE_TRUCK':
      state.requesting = false
      return { ...state }
    case 'DELETE_TRUCK':
      state.requesting = false
      return { ...state }
    case 'ERROR':
      state.requesting = false
      state.error = true
      return { ...state }
    case 'TYPE_SEARCH':
      state.searchText = action.payload
      return { ...state }
    case 'SEARCH_TEXT':
      state.searchChange = !state.searchChange
      state.trucks = tmpTrucks.filter((e) => {
        if (action.payload.type === 'cargoType') {
          return e[action.payload.type].find((e) =>
            e
              .toLocaleLowerCase()
              .includes(action.payload.value.toLocaleLowerCase())
          )
        }
        return e[action.payload.type]
          .toLocaleLowerCase()
          .includes(action.payload.value.toLocaleLowerCase())
      })
      state.requesting = false
      return { ...state }
    default:
      return state
  }
}

export default truckReducer
