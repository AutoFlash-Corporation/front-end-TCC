'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../styles/carousel.module.css'; // Arquivo CSS

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
                <div className={styles.emblaSlide}>Slide 1</div>
                <div className={styles.emblaSlide}>Slide 2</div>
                <div className={styles.emblaSlide}>Slide 3</div>
            </div>
            <button className={styles.prevButton} onClick={scrollPrev}>◀</button>
            <button className={styles.nextButton} onClick={scrollNext}>▶</button>
        </div>
    );
};

export default Carousel;
