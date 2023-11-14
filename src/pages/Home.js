// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = ['T-shirts', 'Shoes', 'Jeans', 'Watches'];

    return (
        <div>
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

            <h1>Product Categories</h1>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
