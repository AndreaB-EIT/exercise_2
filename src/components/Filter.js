// components/Filter.js
import React, { useState } from 'react';
import { Input, Label, Row, Col, Button } from 'reactstrap';

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

    return (
        <div className='filter'>
            <Row className="mb-3">
                <Col>
                    <h4>{title}</h4>
                </Col>
                <Col className="text-right">
                    <Button color="danger" outline onClick={handleReset}>
                        Reset this filter
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
                            {value}
                        </Label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Filter;
