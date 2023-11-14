// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, Container, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import Home from './pages/Home';
import Category from './pages/Category';

function App() {
    const categories = ['T-shirts', 'Shoes', 'Jeans', 'Watches'];

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Router>
            {/* <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">
                    Home
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                    {categories.map((category, index) => (
                        <NavItem key={index}>
                            <NavLink tag={Link} to={`/category/${category.toLowerCase()}`}>
                                {category}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </Navbar> */}

            <Navbar color="light" light expand="md">
                <NavbarBrand tag={Link} to="/">
                    Home
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
                    </Nav>
                </Collapse>
            </Navbar>

            <Container className="mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
