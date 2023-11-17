import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { colorToHex } from '../utils/fe_utility_functions';

const ProductCard = ({ product }) => {
    const excluded_attributes = ['id', 'name', 'price'];

    // Filter out keys based on the excluded attributes
    const filteredKeys = Object.keys(product).filter(key => !excluded_attributes.includes(key));

    // Use Array.prototype.map to get an array of values for the filtered keys
    const values = filteredKeys.map(key => product[key]);

    const description = values.join(' | ');

    return (
        <Card className="mb-4">
            <CardImg top width="100%" src={`https://via.placeholder.com/300x200/${colorToHex(product.color ?? 'black')}`} alt={`${product.name ?? 'Item'}`} />
            <CardBody>
                {product.name && <CardTitle tag="h5" className='mb-3'>{product.name}</CardTitle>}
                {description && <CardSubtitle tag="h6" className="mb-3 text-muted">{`${description}`}</CardSubtitle>}
                {product.price && <CardText tag="h5">{`${product.price} €`}</CardText>}
                {/* <Button color="primary">Add to cart</Button> */}
            </CardBody>
        </Card>
    );
};

export default ProductCard;
