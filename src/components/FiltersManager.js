// components/FiltersManager.js
import React from 'react';
import Filter from './Filter';

const FiltersManager = ({ filters, onFilterChange }) => (
    <div>
        {filters.map(({ title, values }) => (
            <Filter key={title} title={title} values={values} onFilterChange={onFilterChange} />
        ))}
    </div>
);

export default FiltersManager;
