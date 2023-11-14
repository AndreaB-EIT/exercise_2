// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const data = JSON.parse(localStorage.getItem('db'));
    const categories = data.items.map(category => category.name);

    return (
        <div>
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
