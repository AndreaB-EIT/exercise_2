// src/pages/Category.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';
import Filter from '../components/Filter';
import ProductCard from '../components/ProductCard';

const Category = () => {

    const data = JSON.parse(localStorage.getItem('db'));
    const { id: categoryId } = useParams();

    const [categoryData, setCategoryData] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({});
    const [pageProducts, setPageProducts] = useState([]);
    const [isFiltersManagerOpen, setIsFiltersManagerOpen] = useState(false);

    useEffect(() => {
        // Simulating data fetch
        try {
            setCategoryData(data);
        } catch (error) {
            console.error('Error fetching category data:', error);
        }

        setAppliedFilters({});
        setPageProducts([]);
    }, [categoryId]);

    useEffect(() => {
        // Update the pageProducts when appliedFilters or categoryData changes
        if (categoryData) {
            setPageProducts(filterProducts());
        }
    }, [appliedFilters, categoryData]);

    if (!categoryData) {
        // Render a loading state while data is being fetched
        return <p>Loading...</p>;
    }

    // Find the category item based on the id
    const selectedCategory = categoryData.items.find(item => item.name === categoryId);
    const { name: categoryName, products } = selectedCategory;

    // Extract attributes dynamically from the first product, excluding those not to be shown
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

                {/* Dynamic Filters Section */}
                <Col xs={12} md={3}>
                    <Button
                        color="primary"
                        onClick={() => setIsFiltersManagerOpen(!isFiltersManagerOpen)}
                        className="d-block d-md-none mb-3"
                    >
                        {isFiltersManagerOpen ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                    <Collapse isOpen={isFiltersManagerOpen} className="d-md-block">
                        <div>
                            {filters.map(({ title, values }) => (
                                <Filter
                                    key={`${title}_${categoryId}`} // This makes the component visually reset on category change
                                    title={title}
                                    values={values}
                                    onFilterChange={handleFilterChange}
                                />
                            ))}

                        </div>
                    </Collapse>
                </Col>

                {/* Main Content Section */}
                <Col xs={12} md={9}>
                    <h2>Our {categoryName}</h2>
                    {/* Display filtered products here */}
                    <Row>
                        {pageProducts.length > 0 ? pageProducts.map((product) => (
                            // Adjust the column sizes for different screen sizes
                            <Col key={product.id} xs={12} sm={6} lg={4}>
                                <ProductCard product={product} />
                            </Col>
                        )) : (
                            <p>Sorry, there are no results. Try changing the filters you applied</p>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Category;
