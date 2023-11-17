// components/Filter.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Label, Button, Row, Col } from 'reactstrap';
import { capitalizeFirstLetter } from '../utils/fe_utility_functions';

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

    return (
        <div className='filter'>
            <Row className="justify-content-between align-items-baseline mb-3">
                <Col><p className='filter-title'>{capitalizeFirstLetter(title)}</p></Col>
                <Col className='d-flex justify-content-end'>
                    <Button size='sm' color="danger" outline onClick={handleReset}>
                        Reset filter
                    </Button>
                </Col>
            </Row>
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
