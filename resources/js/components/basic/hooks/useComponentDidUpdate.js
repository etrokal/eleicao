import { useRef, useEffect } from "react";

const useComponentDidUpdate = (fn, dependencies = []) => {
  const initialRun = useRef(true);
  useEffect(() => {
    if (initialRun.current === true) {
      initialRun.current = false;
      return;
    }
    return fn();
  }, dependencies);
};

export default useComponentDidUpdate;
