import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const AddItemToCategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [itemAttributes, setItemAttributes] = useState({});
    const [existingAttributeValues, setExistingAttributeValues] = useState({});
    const [feedback, setFeedback] = useState({
        'status': '',
        'message': ''
    });
    const [previousItem, setPreviousItem] = useState(null);

    const data = JSON.parse(localStorage.getItem('db_exercise2'));

    useEffect(() => {
        if (data && data.items) {
            setCategories(data.items.map((category) => category.name));

            const existingValues = {};
            data.items.forEach((category) => {
                category.products.forEach((product) => {
                    Object.keys(product).forEach((attribute) => {
                        if (!existingValues[attribute]) {
                            existingValues[attribute] = [];
                        }
                        if (!existingValues[attribute].includes(product[attribute])) {
                            existingValues[attribute].push(product[attribute]);
                        }
                    });
                });
            });
            setExistingAttributeValues(existingValues);
        }
    }, []);

    const handleCategoryChange = (event) => {
        const selected = event.target.value;
        setSelectedCategory(selected);

        const selectedCategoryData = data.items.find(
            (category) => category.name === selected
        );

        const initialAttributes = {};
        if (
            selectedCategoryData &&
            selectedCategoryData.products.length > 0
        ) {
            const firstProduct = selectedCategoryData.products[0];
            Object.keys(firstProduct).forEach((attribute) => {
                initialAttributes[attribute] = '';
            });
        }

        setItemAttributes(initialAttributes);
    };

    const handleAttributeChange = (attribute, value) => {
        setItemAttributes((prevAttributes) => ({
            ...prevAttributes,
            [attribute]: value,
        }));
    };

    const handleSaveItem = () => {
        const hasEmptyAttribute = Object.values(itemAttributes).some(
            (value) => value.trim() === ''
        );

        if (hasEmptyAttribute) {
            setFeedback({
                status: 'danger',
                message: 'All attributes must not be empty'
            });
            return;
        }

        // Store the current item as the previous item
        setPreviousItem({ category: selectedCategory, attributes: itemAttributes });

        data.items.find(category => category.name === selectedCategory).products.push(itemAttributes);
        localStorage.setItem('db_exercise2', JSON.stringify(data));

        // Reset error and form fields
        setFeedback({
            status: 'success',
            message: 'Item added successfully'
        });
        setItemAttributes({});
    };

    const handleUndo = () => {
        if (previousItem) {
            // Revert to the previous item
            setSelectedCategory(previousItem.category);
            setItemAttributes(previousItem.attributes);

            // Remove the last added item from the data object
            const updatedData = JSON.parse(localStorage.getItem('db_exercise2'));
            const categoryIndex = updatedData.items.findIndex(
                (category) => category.name === previousItem.category
            );

            if (categoryIndex !== -1) {
                const lastAddedItemIndex = updatedData.items[categoryIndex].products.findIndex(
                    (product) => JSON.stringify(product) === JSON.stringify(previousItem.attributes)
                );

                if (lastAddedItemIndex !== -1) {
                    updatedData.items[categoryIndex].products.splice(lastAddedItemIndex, 1);
                    localStorage.setItem('db_exercise2', JSON.stringify(updatedData));
                }
            }

            setPreviousItem(null);
            setFeedback({
                status: 'info',
                message: 'Successfully undone the last item insertion'
            });
        }
    };

    return (
        <div>
            <h2>Add Item to Category</h2>
            <Form>
                <FormGroup>
                    <Label for="categorySelect">Select Category</Label>
                    <Input
                        type="select"
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                {selectedCategory && (
                    <>
                        <h3>Add Item to {selectedCategory}</h3>
                        {Object.keys(itemAttributes).map((attribute) => (
                            <FormGroup key={attribute}>
                                <Label for={attribute}>{attribute}</Label>
                                <Input
                                    type="text"
                                    id={attribute}
                                    value={itemAttributes[attribute]}
                                    onChange={(e) =>
                                        handleAttributeChange(attribute, e.target.value)
                                    }
                                    placeholder={`Enter ${attribute}`}
                                    autoComplete="off"
                                    list={`${attribute}-list`}
                                />
                                <datalist id={`${attribute}-list`}>
                                    {existingAttributeValues[attribute]
                                        ?.filter(
                                            (value) =>
                                                value &&
                                                data.items.some(
                                                    (category) =>
                                                        category.name === selectedCategory &&
                                                        category.products.some(
                                                            (product) => product[attribute] === value
                                                        )
                                                )
                                        )
                                        .map((value) => (
                                            <option key={value} value={value} />
                                        ))}
                                </datalist>
                            </FormGroup>
                        ))}
                        {feedback.status && <Alert className='mb-2' color={feedback.status}>{feedback.message}</Alert>}
                        {feedback.status === 'success' ? (
                            <Button block color="danger" onClick={handleUndo}>
                                Undo
                            </Button>
                        ) : (
                            <Button block color="primary" onClick={handleSaveItem}>
                                Save item
                            </Button>
                        )}
                    </>
                )}
            </Form>
        </div>
    );
};

export default AddItemToCategory;
