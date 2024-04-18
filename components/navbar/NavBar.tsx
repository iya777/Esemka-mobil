"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import esemkaLogo from "@/public/assets/logo-small.png";
import { AlignJustify, ChevronDown, CircleUser } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav";
import Side from "../sidebar/Side";
import { SideBackground, background } from "../../utils/anim";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { usePathname, useSearchParams } from "next/navigation";

const NavBar = () => {
  const searchParams = useSearchParams();
  const [isOpenProducts, setOpenProducts] = useState(false);
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  const onOpenProducts = () => {
    setOpenProducts(!isOpenProducts);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
          setOpenProducts(false);
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            // @ts-ignore
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false),
            // @ts-ignore
            setOpenProducts(false)
          );
        },
      },
    });
  }, []);

  return (
    <>
      <div className="flex flex-col absolute w-[100vw] z-[2]">
        <div
          className={`flex items-center gap-8 p-6 px-16 justify-between border-b border-zinc-900
          ${
            isOpenProducts
              ? "bg-zinc-900 "
              : "bg-gradient-to-b from-zinc-900 to-transparent hover:bg-zinc-900 transition-colors duration-700 "
          }
          `}
        >
          <Link href="/">
            <Image
              src={esemkaLogo}
              alt="esemka-logo"
              width={70}
              height={70}
              className="grayscale contrast-200 brightness-200 invert hover:grayscale hover:brightness-100 hover:contrast-100 hover:invert-0 transition-all duration-500"
            />
          </Link>
          <ul className="flex font-extralight">
            <li>
              <Button
                variant="link"
                className="text-white decoration-transparent text-md hover:text-transparent hover:text-zinc-400 transition-colors duration-700"
              >
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-white decoration-transparent text-md hover:text-transparent hover:text-zinc-400 transition-colors duration-700"
              >
                About
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-white decoration-transparent text-md hover:text-transparent hover:text-zinc-400 transition-colors duration-700"
              >
                <Link href="/news">News</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-white decoration-transparent text-md hover:text-transparent hover:text-zinc-400 transition-colors gap-1"
                onClick={onOpenProducts}
              >
                <span className={isOpenProducts ? "text-zinc-400" : ""}>
                  Products
                </span>
                <span>
                  <ChevronDown
                    className={
                      isOpenProducts
                        ? "text-zinc-400 rotate-180 transition-transform duration-700"
                        : "rotate-0 transition-transform duration-700"
                    }
                  />
                </span>
              </Button>
            </li>
          </ul>
        </div>
        <AnimatePresence mode="wait">
          {isOpenProducts && (
            <div className=" bg-zinc-900 ">
              <Nav onOpenProducts={onOpenProducts} />
            </div>
          )}
        </AnimatePresence>
        <motion.div
          variants={background}
          initial="initial"
          animate={isOpenProducts ? "open" : "closed"}
          className="bg-black/50 h-[100vh] w-[100vw] left-0 top-[100%]"
          onClick={onOpenProducts}
        ></motion.div>
      </div>
      <div ref={button} className="headerButtonContainer">
        <Button
          variant="link"
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="button bg-zinc-700 hover:bg-zinc-900 transition-colors duration-700"
        >
          <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
        </Button>
      </div>
      <AnimatePresence mode="wait">{isActive && <Side />}</AnimatePresence>
    </>
  );
};

export default NavBar;
