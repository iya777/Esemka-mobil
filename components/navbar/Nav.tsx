"use client";
import styles from "./Nav.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../../utils/anim";
import { Body } from "./Body";
// import Footer from "./Footer";
import Image from "./Image";
import Footer from "./Footer";

const links = [
  {
    title: "Bima 1.2",
    href: "/products/bima-1-2",
    src: "esemka-bima-1-2.jpg",
  },
  {
    title: "Bima 1.3",
    href: "/products/bima-1-3",
    src: "esemka-bima-1-3.png",
  },
];

export default function Nav({
  onOpenProducts,
}: {
  onOpenProducts: () => void;
}) {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            onOpenProducts={onOpenProducts}
          />
          <Footer />
        </div>
        <Image
          src={links[selectedLink.index].src}
          selectedLink={selectedLink}
          alt={links}
        />
      </div>
    </motion.div>
  );
}
