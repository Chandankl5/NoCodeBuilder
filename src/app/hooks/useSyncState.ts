import { useMemo } from "react";

interface UseSyncState<T> {
  key: string;
  defaultState?: T;
}

type State<T> = [T, (state: T) => void];

export function useSyncState<T>({
  key,
  defaultState,
}: UseSyncState<T>): State<T> {
  const syncState = (state: T) => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  };

  const initialState: State<T> = useMemo(() => {
    return [(defaultState ?? {}) as T, syncState];
  }, [defaultState]);

  if (typeof window !== "undefined") {
    const savedState = window.localStorage.getItem(key);
    if (savedState && savedState !== "undefined") {
      return [JSON.parse(savedState) as T, syncState];
    } else return initialState;
  } else {
    return initialState;
  }
}
