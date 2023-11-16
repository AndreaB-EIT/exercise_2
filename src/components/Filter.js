// components/Filter.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Label, Button } from 'reactstrap';

const Filter = ({ title, values, onFilterChange }) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleValueChange = (value) => {
        setSelectedValue(value);
        onFilterChange(title, value);
    };

    const handleReset = () => {
        setSelectedValue(null);
        onFilterChange(title, null);
    };

    const { id: categoryId } = useParams();
    useEffect(() => {
        setSelectedValue(null); // Reset selected value when the category changes
    }, [categoryId]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='filter'>
            <div className="mb-3 filter-title">
                <p>{capitalizeFirstLetter(title)}</p>
                <Button color="danger" outline onClick={handleReset}>
                    Reset filter
                </Button>
            </div>
            <ul className="list-unstyled">
                {values.map((value) => (
                    <li key={value}>
                        <Input
                            type="radio"
                            id={`filter_${title}_${value}`}
                            name={title}
                            value={value}
                            checked={selectedValue === value}
                            onChange={() => handleValueChange(value)}
                        />
                        <Label htmlFor={`filter_${title}_${value}`} className="radio-label">
                            {capitalizeFirstLetter(value)}
                        </Label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
