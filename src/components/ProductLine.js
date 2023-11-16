// ProductLine.js
import React from 'react';
import { Row, Col } from 'reactstrap';
import { colorToHex } from '../utils/fe_utility_functions'; // Import the colorToHex function from ProductCard

const ProductLine = ({ product }) => {
    // Extract attributes dynamically from the product, excluding those not to be shown
    const excluded_attributes = ['id', 'name', 'price'];
    const filteredKeys = Object.keys(product).filter(key => !excluded_attributes.includes(key));
    const values = filteredKeys.map(key => product[key]);
    const description = values.join(' | ');

    return (
        <Row className="mb-2 align-items-center">
            <Col xs={2}>
                {/* Small image on the left */}
                <img
                    src={`https://via.placeholder.com/64x64/${colorToHex(product.color ?? 'black')}`}
                    alt={`${product.name ?? 'Item'} image`}
                    className="img-fluid"
                />
            </Col>
            <Col xs={10}>
                {/* Text on the right */}
                <h3>{product.name}</h3>
                <p className="mb-1">{description}</p>
                <p className="text-muted">{`${product.price} €`}</p>
            </Col>
            <hr></hr>
        </Row>
    );
};

export default ProductLine;
