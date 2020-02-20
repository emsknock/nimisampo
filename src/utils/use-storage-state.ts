import React, { useState, useEffect } from "react";

const useStorageState = <T>(
    key: string,
    fallbackValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
    
    const storedValue = localStorage.getItem(key);

    const [value, setValue] = useState(
        storedValue ? JSON.parse(storedValue) : fallbackValue
    );

    useEffect(
        () => localStorage.setItem(key, JSON.stringify(value)),
        [key, value]
    );

    return [value, setValue];

}

export { useStorageState };