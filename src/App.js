import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, NavLink, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import Home from './pages/Home';
import Category from './pages/Category';
import NewCategory from './pages/NewCategory';
import data from './mock.json';
import AddItemToCategory from './pages/AddItemToCategory';
import { capitalizeFirstLetter } from './utils/fe_utility_functions';

function App() {

    // This is of course just for the purpose of this exercise. I would not use localStorage as the main company database
    if (!localStorage.getItem('db_exercise2')) {
        localStorage.setItem('db_exercise2', JSON.stringify(data));
    } else {
        data = JSON.parse(localStorage.getItem('db_exercise2'));
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(data.items.map(category => category.name));
    }, []);

    const updateCategories = (newCategory) => {
        setCategories([...categories, newCategory]);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Router>
            <Navbar color="light" light expand="md" fixed='top'>
                <NavbarBrand tag={Link} to="/">
                    Home
                </NavbarBrand>

                <NavbarToggler onClick={toggleNavbar} />

                <Collapse isOpen={isOpen} navbar>
                    <div className="d-md-none"><hr /></div>
                    <div className="d-none d-md-block vr"></div>

                    <Nav className="mr-auto" navbar onClick={toggleNavbar}>
                        {categories.map((category, index) => (
                            <NavItem key={index}>
                                <NavLink tag={Link} to={`/category/${category.toLowerCase()}`}>
                                    {capitalizeFirstLetter(category)}
                                </NavLink>
                            </NavItem>
                        ))}

                        <div className="d-md-none"><hr /></div>
                        <div className="d-none d-md-block vr"></div>

                        <NavItem>
                            <NavLink tag={Link} to={'/new-category/'}>
                                Add a category
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to={'/add-item/'}>
                                Add an item to a category
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>

            <Container style={{ marginTop: '4rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/new-category/" element={<NewCategory updateCategories={updateCategories} />} />
                    <Route path="add-item" element={<AddItemToCategory />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
