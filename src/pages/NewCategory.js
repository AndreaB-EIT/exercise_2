import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const NewCategory = () => {

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


    const handleAddAttribute = () => {
        if (attributeName.trim() !== '' && attributeValue.trim() !== '') {
            setStartingItems((prevItems) => [
                ...prevItems,
                { [attributeName]: attributeValue },
            ]);
            setAttributeName('');
            setAttributeValue('');
        } else {
            setStartingItemAttributeFeedback({
                status: 'danger',
                message: 'The new attribute must have a name and a value'
            });
        }
    };

    const handleSaveCategory = () => {
        // This is just a basic example, you might want to add more validation and error handling

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
                // Append a new object to the "items" array
                const newCategory = {
                    name: categoryName,
                    products: startingItems,
                };

                data.items.push(newCategory);
                localStorage.setItem('db', JSON.stringify(data));

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
                    {startingItems.map((item, index) => (
                        <div key={index}>
                            <p>{Object.keys(item)}: {Object.values(item)}</p>
                        </div>
                    ))}
                    <FormGroup>
                        <Label for="attributeName">Attribute Name</Label>
                        <Input
                            type="text"
                            id="attributeName"
                            value={attributeName}
                            onChange={(e) => setAttributeName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="attributeValue">Attribute Value</Label>
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
