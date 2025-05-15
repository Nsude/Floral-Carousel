import { useRef, useState } from "react"
import FloralCarousel from "./components/FloralCarousel"
import NavButton from "./components/NavButton"
import styles from "./styles.module.scss"
import {testimonials} from "./components/DummyData";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(SplitText, CustomEase);
export const myEase = CustomEase.create("custom", "0.76, 0, 0.24, 1");

function App() {
  const total = testimonials.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [allowNavigation, setAllowNavigation] = useState(true);
  const [isNext, setIsNext] = useState(false);
  const descTextsRef = useRef([]);

  useGSAP(() => {
    const texts = descTextsRef.current;
    if (!texts) return;

    texts.forEach(text => {
      const split = SplitText.create(text, {type: "lines", autoSplit: true, mask: "lines"});
      
      gsap.from(split.lines, {
        y: 40,
        opacity: 0,
        duration: .6,
        ease: "power3.out"
      })
    })

  }, [activeIndex])

  const toggleAllowNavigation = () => {
    setAllowNavigation(false);
    setTimeout(() => {
      setAllowNavigation(true);
    }, 600)
  }

  const handleNext = () => {
    if (!allowNavigation) return;
    setIsNext(true);
    toggleAllowNavigation();

    if (activeIndex == total - 1) {
      return setActiveIndex(0);
    }

    setActiveIndex(activeIndex + 1);
  }

  const handlePrev = () => {
    if (!allowNavigation) return;
    setIsNext(false);
    toggleAllowNavigation();

    if (activeIndex == 0) {
      return setActiveIndex(total - 1)
    }

    setActiveIndex(activeIndex - 1);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.section_desc}>
        <span>Testimonials</span>

        <div className={styles.filler_texts}>
          <div className={styles.section_year}>
            <span>@2022-2025</span>
            <div className={styles.dev_cred}>
              <span>Designer & Developer</span>
              <span>Meshach Nsude</span>
            </div>
          </div>

          <span>/01</span>
        </div>

      </div>

      <div className={styles.floral_nd_desc_container}>
        {/* florar Carousel */}
        <div className={styles.floral_container}>
          <FloralCarousel 
            testimonials={testimonials} 
            activeIndex={activeIndex} 
            isNext={isNext}/>
        </div>

        {/* Description & nav buttons */}
        <div className={styles.floral_desc_nd_nav}>
          <div className={styles.floral_desc}>
            <div>
              <h2 ref={(el) => descTextsRef.current[0] = el}>{testimonials[activeIndex].name}</h2>
              <span ref={(el) => descTextsRef.current[1] = el} className={styles.client_title}>{testimonials[activeIndex].title}</span>
            </div>

            <p ref={(el) => descTextsRef.current[2] = el}>{testimonials[activeIndex].review}</p>
          </div>

          <div className={styles.floral_nav}>
            <div role="button" onClick={handlePrev}>
              <NavButton left={true} />
            </div>
            <div role="button" onClick={handleNext}>
              <NavButton />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App