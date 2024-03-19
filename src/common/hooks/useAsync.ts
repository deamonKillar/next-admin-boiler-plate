import { useCallback, useState } from 'react'
import { RECOIL_ASYNC_STATE } from '../constants'

// Matching the recoil loadable to maintain consistency
export interface IAsyncState {
  loading: null | typeof RECOIL_ASYNC_STATE.LOADING
  hasValue: null | typeof RECOIL_ASYNC_STATE.HAS_VALUE
  hasError: null | typeof RECOIL_ASYNC_STATE.HAS_ERROR
  contents: any
}

const initialState = {
  loading: null,
  hasValue: null,
  hasError: null,
  contents: null
}

/**
 * Hook to provide async status of an API call
 *
 * @returns a tuple [state, function]
 * state - async state of Promise
 *
 * function - which accepts a Promise and can be invoked on event handling etc...
 *
 * callback function - which sets state to null
 *
 */

const useAsync = () => {
  const [state, setState] = useState<IAsyncState | null>(initialState)

  const setNull = useCallback(() => {
    setState(null)
  }, [])

  return [
    state,
    async (promise: Promise<any>) => {
      setState({
        loading: RECOIL_ASYNC_STATE.LOADING,
        hasValue: null,
        hasError: null,
        contents: null
      })
      try {
        const res = await promise
        setState({
          loading: null,
          hasValue: RECOIL_ASYNC_STATE.HAS_VALUE,
          hasError: null,
          contents: res
        })
      } catch (err: any) {
        setState({
          ...state,
          loading: null,
          hasValue: null,
          hasError: RECOIL_ASYNC_STATE.HAS_ERROR,
          contents: err
        })
        throw new Error(err)
      }
    },
    setNull
  ] as [IAsyncState | null, (promise: Promise<any>) => Promise<void>, () => void]
}

export default useAsync
