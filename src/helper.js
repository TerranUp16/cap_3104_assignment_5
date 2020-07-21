import React from 'react';
import Form from 'react-bootstrap/Form';

export const selectedOption = (curValue, optionValue) => {
    if (curValue === optionValue) {
        return (
            <option selected>{optionValue}</option>
        )
    } else {
        return (
            <option>{optionValue}</option>
        )
    }
}