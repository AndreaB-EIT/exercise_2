import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';

const NewCategory = ({ updateCategories }) => {

    const data = JSON.parse(localStorage.getItem('db_exercise2'));

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

                // Create a new array with the "id" attribute and all other inserted attributes
                const newArrayWithId = !startingItems.some(item => Object.keys(item).includes('id'))
                    ? [{ 'id': `${categoryName}_001` }, ...startingItems]
                    : startingItems;

                const firstProduct = newArrayWithId.reduce((result, item) => {
                    const [key] = Object.keys(item);
                    const value = item[key];
                    result[key] = value;
                    return result;
                }, {});

                const newCategory = {
                    name: categoryName,
                    products: [firstProduct],
                };

                data.items.push(newCategory);
                localStorage.setItem('db_exercise2', JSON.stringify(data));

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
                            <Row key={index} className='justify-content-between'>
                                {Object.keys(item).map(key => (
                                    <>
                                        <Col>
                                            <li
                                                className='p-1 mb-2'
                                                key={`${index}-${key}`}
                                                style={attributeStyles[key] || {}}
                                            >
                                                {key}: {item[key]}
                                            </li>
                                        </Col>
                                        <Col className='d-flex justify-content-end align-items-center'>
                                            <Button
                                                outline
                                                size='sm'
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
                    {!isIdAdded && <div className='mb-3'><strong>The "id" attribute is added automatically with value (category name)_001 unless you add it and specify it however you want</strong></div>}
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
                        Add attribute
                    </Button>
                </FormGroup>
                <Button block className='mt-3' color="success" onClick={handleSaveCategory}>
                    Save new category
                </Button>
            </Form>
        </div>
    );
};

export default NewCategory;
