// src/pages/Category.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import FiltersManager from '../components/FiltersManager';

import data from '../mock.json';
import ProductCard from '../components/ProductCard';

const Category = () => {
    const { id } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({});

    useEffect(() => {
        // Simulate data fetch (replace with your actual data fetching logic)
        const fetchData = async () => {
            try {
                setCategoryData(data);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        // Call the fetch function
        fetchData();
    }, []);

    if (!categoryData) {
        // Render a loading state while data is being fetched
        return <p>Loading...</p>;
    }

    // Find the category item based on the id
    const selectedCategory = categoryData.items.find(item => item.name === id);
    const { name, products } = selectedCategory;

    // Extract attributes dynamically from the first product, excluding "id"
    const excluded_attributes = ['id', 'name', 'price'];
    const attributes = Object.keys(products[0]).filter(attribute => !excluded_attributes.includes(attribute));

    // Create an array of objects with title and values for FiltersManager
    const filters = attributes.map(attribute => ({
        title: attribute,
        values: Array.from(new Set(products.map(product => product[attribute])))
    }));

    const handleFilterChange = (filterTitle, selectedValue) => {
        // Update the applied filters state when a filter changes
        setAppliedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };

            if (selectedValue === null) {
                delete updatedFilters[filterTitle];
            } else {
                updatedFilters[filterTitle] = selectedValue;
            }

            return updatedFilters;
        });
    };


    const filterProducts = () => {
        // Filter the products based on the applied filters
        return products.filter(product =>
            Object.entries(appliedFilters).every(([filterTitle, selectedValue]) => {
                // Check if the product has the selected value for the filter
                return product[filterTitle] === selectedValue;
            })
        );
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col xs={12} md={3}>
                    {/* Dynamic Filters Section */}
                    <FiltersManager filters={filters} onFilterChange={handleFilterChange} />
                </Col>
                <Col xs={12} md={9}>
                    {/* Main Content Section */}
                    <h2>{name} Category</h2>
                    {/* Display filtered products here */}
                    <Row>
                        {filterProducts().map((product) => (
                            // Adjust the column sizes for different screen sizes
                            <Col key={product.id} xs={12} sm={6} lg={4}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Category;
