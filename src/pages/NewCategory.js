import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';

const NewCategory = ({ updateCategories }) => {

    const data = JSON.parse(localStorage.getItem('db'));

    const [categoryName, setCategoryName] = useState('');
    const [startingItems, setStartingItems] = useState([]);
    const [attributeName, setAttributeName] = useState('');
    const [attributeValue, setAttributeValue] = useState('');
    const [categoryNameInputFeedback, setCategoryNameInputFeedback] = useState({
        'status': '',
        'message': ''
    });
    const [startingItemAttributeFeedback, setStartingItemAttributeFeedback] = useState({
        'status': '',
        'message': ''
    });
    const [attributeStyles, setAttributeStyles] = useState({});
    const [isIdAdded, setIdAdded] = useState(false);


    const handleAddAttribute = () => {
        setAttributeStyles({});
        if (startingItems.some(item => Object.keys(item).includes(attributeName))) {
            setStartingItemAttributeFeedback({
                status: 'danger',
                message: 'No duplicate attribute names allowed'
            });
            setAttributeStyles(prevStyles => ({
                ...prevStyles,
                [attributeName]: { backgroundColor: '#f8d7da', color: '#58151c' }
            }));
            return;
        }

        if (attributeName === 'id') {
            setIdAdded(true);
        }

        if (attributeName.trim() !== '' && attributeValue.trim() !== '') {
            setStartingItems((prevItems) => [
                ...prevItems,
                { [attributeName]: attributeValue },
            ]);
            setAttributeName('');
            setAttributeValue('');
            setStartingItemAttributeFeedback({
                status: '',
                message: ''
            });
        } else {
            setStartingItemAttributeFeedback({
                status: 'danger',
                message: 'The new attribute must have a name and a value'
            });
        }
    };

    const handleDeleteAttribute = (index, key) => {
        const updatedItems = startingItems.filter((item, i) =>
            i !== index
        );
        setStartingItems(updatedItems);
        if (key === 'id') {
            setIdAdded(false);
        }

        setAttributeStyles(prevStyles => {
            const updatedStyles = { ...prevStyles };
            delete updatedStyles[key];
            return updatedStyles;
        });
    };

    const handleSaveCategory = () => {
        if (categoryName.trim() === '') {
            setCategoryNameInputFeedback({
                status: 'danger',
                message: `The new category must have a name`
            });
        } else {
            // Check if the new category name already exists
            const categoryExists = data.items.some(
                (items) => items.name === categoryName
            );

            if (categoryExists) {
                setCategoryNameInputFeedback({
                    status: 'danger',
                    message: `Sorry, the category "${categoryName}" already exists`
                });
            } else {
                setCategoryNameInputFeedback({
                    status: 'success',
                    message: `The category "${categoryName}" has been successfully added to the database`
                });

                // Create a new array with the "id" attribute and other attributes
                const newArrayWithId = !startingItems.some(item => Object.keys(item).includes('id'))
                    ? [{ 'id': `${categoryName}_001` }, ...startingItems]
                    : startingItems;

                const newCategory = {
                    name: categoryName,
                    products: newArrayWithId,
                };

                // if (!startingItems.some(item => Object.keys(item).includes('id'))) {
                //     setStartingItems((prevItems) => [{ 'id': `${categoryName}_001` }, ...prevItems]);
                // }
                // const newCategory = {
                //     name: categoryName,
                //     products: startingItems,
                // };

                data.items.push(newCategory);
                localStorage.setItem('db', JSON.stringify(data));

                updateCategories(newCategory.name);

                console.log(`Category "${categoryName}" added successfully.`);
            }

            // Reset form fields
            setCategoryName('');
            setStartingItems([]);
        }
    };

    return (
        <div>
            <h2>Add a new category</h2>
            <Form>
                <FormGroup>
                    <Label for="categoryName">New category name</Label>
                    <Input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    {categoryNameInputFeedback.status && <Alert className='mt-2' color={categoryNameInputFeedback.status}>{categoryNameInputFeedback.message}</Alert>}
                </FormGroup>
                <FormGroup>
                    <Label tag='h3' for="startingItems">Starting item for the category</Label>
                    <p className='mb-1'>Attributes added so far:</p>
                    <div>
                        {startingItems.length > 0 ? (startingItems.map((item, index) => (
                            <Row key={index}>
                                {Object.keys(item).map(key => (
                                    <>
                                        <Col xs={9}>
                                            <li
                                                className='p-1 mb-2'
                                                key={`${index}-${key}`}
                                                style={attributeStyles[key] || {}}
                                            >
                                                {key}: {item[key]}
                                            </li>
                                        </Col>
                                        <Col xs={3}>
                                            <Button
                                                color='danger'
                                                onClick={() => handleDeleteAttribute(index, key)}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </>
                                ))}
                            </Row>
                        ))) : (
                            <p>None</p>
                        )}
                    </div>
                    {!isIdAdded && <p>The "id" attribute will be added automatically if you don't add it</p>}
                    <FormGroup>
                        <Label for="attributeName">Attribute name</Label>
                        <Input
                            type="text"
                            id="attributeName"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attributeValue">Attribute value</Label>
                        <Input
                            type="text"
                            id="attributeValue"
                            value={attributeValue}
                            onChange={(e) => setAttributeValue(e.target.value)}
                        />
                        {startingItemAttributeFeedback.status && <Alert className='mt-2' color={startingItemAttributeFeedback.status}>{startingItemAttributeFeedback.message}</Alert>}
                    </FormGroup>
                    <Button color="primary" onClick={handleAddAttribute}>
                        Add Attribute
                    </Button>
                </FormGroup>
                <Button color="success" onClick={handleSaveCategory}>
                    Save Category
                </Button>
            </Form>
        </div>
    );
};

export default NewCategory;
