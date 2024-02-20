import { useState } from "react";

function useArray<T>(defaultValue: T[]) {
  const [array, setArray] = useState(defaultValue);

  function push(element: T) {
    setArray((a) => [...a, element]);
  }

  function filter(callback: () => boolean) {
    setArray((a) => a.filter(callback));
  }

  function update(index: number, newElement: T) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1),
    ]);
  }
  function updateCallback(index: number, updater: (prevArray: T) => T) {
    setArray((a) => [
      ...a.slice(0, index),
      updater(a[index]),
      ...a.slice(index + 1),
    ]);
  }

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  return {
    array,
    length: array.length,
    setArray,
    push,
    filter,
    update,
    updateCallback,
    remove,
  };
}

export default useArray;
