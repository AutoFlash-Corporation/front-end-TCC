'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../Carousel/carousel.module.css'; // Arquivo CSS

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 4 });


    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
                <div className={styles.emblaSlide}></div>
                <div className={styles.emblaSlide}></div>
                <div className={styles.emblaSlide}></div>
                <div className={styles.emblaSlide}></div>
                <div className={styles.emblaSlide}></div>
                <div className={styles.emblaSlide}></div>
            </div>
        </div>
    );
};

export default Carousel;
