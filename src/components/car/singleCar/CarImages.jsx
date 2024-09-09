import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import NoCarImage from '../../../assets/car/no_image.png';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 2.2, // Display 2 items per slide
    slidesToSlide: 1, // Slide one item at a time
  },
  tablet: {
    breakpoint: { max: 1279, min: 768 },
    items: 1.2, // Display 1 item per slide
    slidesToSlide: 1, // Slide one item at a time
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // Display 1 item per slide
    slidesToSlide: 1, // Slide one item at a time
  },
};

function CarImages({ images = [] }) {
  if (!images.length) {
    return (
      <div>
        <img src={NoCarImage} alt='Car has no image template' />
      </div>
    ); // Optional: Fallback UI
  }

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      partialVisible={true}
      keyBoardControl={true}
      customTransition='transform 300ms ease-in-out'
      transitionDuration={500}
      containerClass='carousel-container'
      dotListClass='custom-dot-list-style'
      itemClass='car-carousel-item'
    >
      {images.map((img) => (
        <div key={img._id} className='car-carousel-item-container'>
          <img src={img.url} alt='Car' />
        </div>
      ))}
    </Carousel>
  );
}

export default CarImages;
