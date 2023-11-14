import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

const ProductCard = ({ product }) => {
    const { name, color, price, id } = product;

    const excluded_attributes = ['id', 'name', 'price'];

    // Filter out keys based on the excluded attributes
    const filteredKeys = Object.keys(product).filter(key => !excluded_attributes.includes(key));

    // Use Array.prototype.map to get an array of values for the filtered keys
    const values = filteredKeys.map(key => product[key]);

    const description = values.join(' | ');

    function colorToHex(colorName) {

        // Return a default color if the mock item doesn't have a color attribute
        if (!colorName) {
            return '000000';
        }

        // Define a map of main colors and their hexadecimal values
        const colorMap = {
            red: 'ff0000',
            green: '00ff00',
            blue: '0000ff',
            yellow: 'ffff00',
            orange: 'ffa500',
            purple: '800080',
            pink: 'ffc0cb',
            brown: 'a52a2a',
            grey: '808080',
            black: '000000',
            white: 'ffffff',
        };

        // Convert color name to lowercase for case-insensitive matching
        const lowerCaseColorName = colorName.toLowerCase();

        // Check if the color name is in the map
        if (lowerCaseColorName in colorMap) {
            return colorMap[lowerCaseColorName];
        } else {
            // Return a default color if the input is not recognized
            return '000000';
        }
    }

    return (
        <Card className="mb-4">
            {/* You can use a placeholder image or fetch an actual image */}
            <CardImg top width="100%" src={`https://via.placeholder.com/300x200/${colorToHex(color)}`} alt={`${name} image`} />
            <CardBody>
                <CardTitle tag="h5">{name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{`${description}`}</CardSubtitle>
                <CardText>{`${price} €`}</CardText>
                {/* <Button color="primary">Add to cart</Button> */}
            </CardBody>
        </Card>
    );
};

export default ProductCard;
