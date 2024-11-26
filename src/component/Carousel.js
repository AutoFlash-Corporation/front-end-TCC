'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../styles/carousel.module.css'; // Arquivo CSS

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 4 });


    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
                <div className={styles.emblaSlide}>Slide 1</div>
                <div className={styles.emblaSlide}>Slide 2</div>
                <div className={styles.emblaSlide}>Slide 3</div>
                <div className={styles.emblaSlide}>Slide 4</div>
                <div className={styles.emblaSlide}>Slide 5</div>
                <div className={styles.emblaSlide}>Slide 6</div>
            </div>
        </div>
    );
};

export default Carousel;
