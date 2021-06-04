import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { setCookie, parseCookies } from 'nookies'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const { key: storageValue } = parseCookies();

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    setCookie(undefined, key, JSON.stringify(state), {
      maxAge: 60 * 60 * 24 * 30, // 30dias,
      path: "/"
    });
  }, [key, state])

  return [state, setState];

}

export default usePersistedState;
