// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Container, NavLink, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import Home from './pages/Home';
import Category from './pages/Category';
import NewCategory from './pages/NewCategory';
import data from './mock.json';
import AddItemToCategory from './pages/AddItemToCategory';

function App() {

    // I am fully aware that this is not the best way to manage this
    // However, given the context of this simple exercise I decided to keep it simple
    // and not rewrite a lot of code to use either React context or Redux to save a "global database"
    // to read and edit at will, since I didn't want to install extra packages (node and react already
    // have enough as is for even the simplest of tasks) to deal with file management nor setting up
    // a Firebase or MySQL database just for this simple task
    if (!localStorage.getItem('db')) {
        localStorage.setItem('db', JSON.stringify(data));
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(data.items.map(category => category.name));
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Router>
            <Navbar color="light" light expand="md">
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

            {/* <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">
                    Categories
                </NavbarBrand>

                <NavbarToggler onClick={toggleNavbar} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {categories.map((category, index) => (
                            <NavItem key={index}>
                                <NavLink tag={Link} to={`/category/${category.toLowerCase()}`} onClick={toggleNavbar}>
                                    {category}
                                </NavLink>
                            </NavItem>
                        ))}
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
            </Navbar> */}

            <Container className="mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/new-category/" element={<NewCategory />} />
                    <Route path="add-item" element={<AddItemToCategory />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
