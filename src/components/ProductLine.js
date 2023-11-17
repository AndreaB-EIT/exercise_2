import React from 'react';
import { Row, Col } from 'reactstrap';
import { colorToHex } from '../utils/fe_utility_functions';

const ProductLine = ({ product }) => {
    // Extract attributes dynamically from the product, excluding those not to be shown
    const excluded_attributes = ['id', 'name', 'price'];
    const filteredKeys = Object.keys(product).filter(key => !excluded_attributes.includes(key));
    const values = filteredKeys.map(key => product[key]);
    const description = values.join(' - ');

    return (
        <Row className="align-items-center">
            <Col xs={2} className='d-flex justify-content-center'>
                <img
                    src={`https://via.placeholder.com/64x64/${colorToHex(product.color ?? 'black')}`}
                    alt={`${product.name ?? 'Item'}`}
                    className="img-fluid"
                />
            </Col>
            <Col xs={10}>
                {product.name && <h3>{product.name}</h3>}
                {description && <p className="mb-1">{description}</p>}
                {product.price && <p style={{ fontSize: '1.25rem' }}>{`${product.price} €`}</p>}
            </Col>
            <hr className='mt-2'></hr>
        </Row>
    );
};

export default ProductLine;
