import ArrowIcon from "../assets/icons/ArrowIcon";
import styles from "./styles/navButton.module.scss"

const NavButton = ({ left = false}) => {
  return (
    <button data-left={left} className={styles.wrapper}>
      <div className={styles.icons_container}>
        <ArrowIcon left={left} />
        <span>
          <ArrowIcon left={left} />
        </span>
      </div>
    </button>
  )
}

export default NavButton;