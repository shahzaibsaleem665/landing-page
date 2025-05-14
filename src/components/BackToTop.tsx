import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../styles/components/BackToTop.module.scss";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button className={styles.backToTop} onClick={scrollToTop}>
        <FaArrowUp className={styles.icon} />
      </button>
    )
  );
};

export default BackToTop;
