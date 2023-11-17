import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption, Button, Container } from 'reactstrap';
import { capitalizeFirstLetter } from '../utils/fe_utility_functions';

const Home = () => {
    const data = JSON.parse(localStorage.getItem('db_exercise2'));
    const categories = data.items;

    const items = categories.map((category, index) => ({
        id: index,
        name: category.name,
    }));

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(true);

    const next = () => {
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = newIndex => {
        setActiveIndex(newIndex);
    };

    const toggleAnimating = () => {
        setAnimating(!animating);
    };

    const slides = items.map(item => (
        <CarouselItem key={item.name} className='carousel-item'>
            <Link to={`/category/${item.name.toLowerCase()}`}>
                {/* I do not own the following pictures, all rights reserved to their owners */}
                <img
                    src={`/${item.name}_category.png`}
                    alt={`Category: ${item.name}`}
                    className="img-fluid carousel-image"
                />
                <div className='overlay'></div>
                <CarouselCaption captionText={`Our new ${item.name}`} captionHeader={capitalizeFirstLetter(item.name)} />
            </Link>
        </CarouselItem>
    ));

    return (
        <div>
            <Container className='carousel-container'>
                <h1 className='mb-3'>Our product categories</h1>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    interval={animating ? 5000 : false}
                    ride="carousel"
                    slide={animating}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            </Container>
            <Container className="text-center my-3">
                <Button outline color="primary" onClick={toggleAnimating}>
                    {animating ? 'Disable animation and autoscroll' : 'Enable animation and autoscroll'}
                </Button>
            </Container>
        </div>
    );
};

export default Home;
