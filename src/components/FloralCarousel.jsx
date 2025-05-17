import { useRef } from "react";
import styles from "./styles/floral.module.scss"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { myEase } from "../App";

const FloralCarousel = ({testimonials = [], activeIndex, isNext}) => {
  const total = testimonials.length;
  const layers = useRef([...Array(total).keys()].reverse());
  const prevIndexRef = useRef(activeIndex);

  useGSAP(() => {
    const images = document.querySelectorAll('.carousel-image');
    const prev = prevIndexRef.current;
    if (!images || prev === activeIndex) return null;

    const tl = gsap.timeline();
    // rotate images
    images.forEach((img) => {
      const currentRotate = parseInt(gsap.getProperty(img, "rotate"));
      
      tl.to(img, {
        rotate: isNext ? `${currentRotate - 5}deg` : `${currentRotate + 5}deg`,
        duration: .6,
        ease: myEase
      }, "<");
    })
    
    let prevImageReset = false;
    if (isNext) {
      const prevImage = images[prev];

      tl.to(prevImage, {
        opacity: 0, 
        duration: .4,
        delay: .2, 
        onUpdate: () => {
          const currentOpactiy = gsap.getProperty(prevImage, "opacity");
          if (currentOpactiy < 0.1 && !prevImageReset) {
            prevImageReset = true;
            // reorder layers
            layers.current = layers.current.map((zIndex, i) => {
              if (i === prev) return 0;
              const increased = zIndex + 1;
              return increased > total - 1 ? total - 1 : increased;
            });


            // reset the zIndex of all the images
            images.forEach((img, i) => tl.set(img, {zIndex: layers.current[i]}));

            // animate the prevImage
            tl.fromTo(prevImage, 
              { rotate: `${(5 * total)}deg`,
                opacity: 0
            }, {
              rotate: `${5 * (total - 1)}deg`,
              opacity: 1,
              duration: .6,
              ease: "power3.out"
            })
          }
        }
      }, "<")
      
      // navigate prev
    } else {
      const bottomImageIndex = layers.current.findIndex(z => z === 0);
      const bottomImage = images[bottomImageIndex];
      let bottomImageReset = false;

      // animate bottom image out
      tl.to(bottomImage, {
        opacity: 0,
        duration: .6,
        onUpdate: () => {
          const currentOpactiy = gsap.getProperty(bottomImage, "opacity");
          if (currentOpactiy < 0.4 && !bottomImageReset) {
            bottomImageReset = true;
            
            // reorder layers & prevent -1 zIndex on reduce
            layers.current = layers.current.map((zIndex, i) => {
              if (zIndex === 0) return total - 1;
              const reduced = zIndex - 1;
              return reduced === -1 ? 0 : reduced;
            });

            // reset all zIndexes 
            images.forEach((img, i) => tl.set(img, {zIndex: layers.current[i]}, "<"));

            gsap.fromTo(bottomImage, {
              opacity: 0,
              rotate: '-10deg',
            }, {
              opacity: 1,
              rotate: '0deg',
              duration: .4, 
              ease: myEase
            })
          }
        }
      }, "<")
    }
    
    prevIndexRef.current = activeIndex;

  }, [activeIndex])

  return (
    <div className={styles.wrapper}>
      {
        testimonials.map((item, i) => (
          <div 
            key={'image_' + i} 
            className={styles.image_container + ' carousel-image'}
            style={{
              zIndex: layers.current[i],
              rotate: `${5 * i}deg`
            }}>
            <img src={item.image} alt={`client image-${i}`} />
          </div>
        ))
      }
    </div>
  )
}

export default FloralCarousel;