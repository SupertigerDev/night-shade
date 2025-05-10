interface State {
  brightness: number;
  temperature: number;
}

export const getStore = <T extends keyof State>(
  key: T,
  defaultValue: State[T]
): State[T] => backend.store.get(key, defaultValue);

export const updateStore = <T extends keyof State>(key: T, value: State[T]) =>
  backend.store.set(key, value);
