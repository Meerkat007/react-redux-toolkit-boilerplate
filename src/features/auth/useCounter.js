import React from 'react';
import {CounterContext} from '../../App';

export function useCounter() {
    const {count, setCount} = React.useContext(CounterContext); 
    return {count, setCount}
}