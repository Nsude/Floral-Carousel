import FloralCarousel from "./components/FloralCarousel"
import NavButton from "./components/NavButton"
import styles from "./styles.module.scss"

function App() {

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
          <FloralCarousel />
        </div>

        {/* Description & nav buttons */}
        <div className={styles.floral_desc_nd_nav}>
          <div className={styles.floral_desc}>
            <div>
              <h2>Samantha Wheeler</h2>
              <span className={styles.client_title}>CEO Dumb Broot</span>
            </div>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus corrupti sunt ipsa quos laborum iusto cum a, sed nulla maiores, praesentium incidunt nemo consectetur adipisci illum vero! Aperiam, hic harum.</p>
          </div>

          <div className={styles.floral_nav}>
            <NavButton left={true} />
            <NavButton />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App