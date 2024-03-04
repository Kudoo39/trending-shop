/* eslint-disable no-undef */
import { Category } from '../../misc/type'
import categoryReducer, { setSelectedCategory } from '../../redux/slices/categorySlice' // Import the reducer and action creator

type InitialState = {
  categories: Category[]
  selectedCategory: number
  loading: boolean
  error: string | null
}

const initialState: InitialState = {
  categories: [],
  selectedCategory: 0,
  loading: false,
  error: null
}

describe('category reducer', () => {
  test('should return initial state', () => {
    const state = categoryReducer(undefined, { type: '' })
    expect(state).toEqual(initialState)
  })

  test('should handle setSelectedCategory', () => {
    const action = setSelectedCategory(1)
    const nextState = categoryReducer(initialState, action)
    expect(nextState.selectedCategory).toEqual(1)
  })

  test('should not modify state for unknown action types', () => {
    const previousState: InitialState = {
      categories: [],
      selectedCategory: 1,
      loading: false,
      error: null
    }
    const action = { type: 'UNKNOWN_ACTION' }
    const nextState = categoryReducer(previousState, action)

    expect(nextState).toEqual(previousState)
  })
})
