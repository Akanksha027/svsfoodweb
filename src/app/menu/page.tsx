"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import {
  MENU_CATEGORIES,
  RESTAURANT,
  TOTAL_ITEMS,
  DEFAULT_MENU_IMAGE,
  type MenuItem,
} from "@/data/menu";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

export default function MenuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]?.slug ?? "burgers");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-title-part", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
      });

      gsap.from(".menu-smile-sticker-wrap", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 1.4,
        ease: "back.out(1.8)",
        delay: 0.4,
      });

      gsap.to(".menu-smile-sticker-inner", {
        y: -15,
        rotation: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = MENU_CATEGORIES.map((c) =>
      document.getElementById(`cat-${c.slug}`)
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveCategory(visible.target.id.replace("cat-", ""));
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    document.getElementById(`cat-${slug}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div ref={containerRef} className="menu-page-wrapper">
      <SmoothScroll />
      <Navbar />

      {/* ── Hero ── */}
      <main className="relative w-full h-[85vh] max-md:h-[70vh] overflow-hidden flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 bg-black">
          <Image
            src="/images/smoky-burger.webp"
            alt="SVS Food menu"
            fill
            className="object-cover opacity-85"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
          <div className="relative w-fit">
            <div className="menu-smile-sticker-wrap absolute w-[11vw] max-md:w-[20vw] h-auto top-[-6.5vw] left-[-3vw] max-md:left-[-1.5vw] z-20 drop-shadow-2xl pointer-events-none">
              <div className="menu-smile-sticker-inner w-full h-full">
                <Image
                  src="/images/smile.webp"
                  alt="Smile Sticker"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            <h1
              className="flex flex-col uppercase leading-[0.85] text-[12vw] max-md:text-[16vw] text-[var(--yellow)] drop-shadow-2xl select-none"
              style={{ fontFamily: "'CustomNavbarFont1', sans-serif" }}
            >
              <span
                className="menu-title-part"
                style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}
              >
                Eat Like You
              </span>
              <span
                className="menu-title-part"
                style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}
              >
                Mean It
              </span>
            </h1>
          </div>
          <p className="mt-6 font-nunito font-bold text-white/90 text-[1.4vw] max-md:text-[3.8vw] max-w-xl">
            {TOTAL_ITEMS} items · {MENU_CATEGORIES.length} categories · Ready in{" "}
            {RESTAURANT.deliveryTime}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[12vw] max-md:h-[20vw]"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.71,76.4,103.42,54.7,157,41.25,212.59,27.32,269.44,30.41,321.39,56.44Z"
              fill="var(--cream)"
            />
          </svg>
        </div>
      </main>

      {/* ── Menu sections ── */}
      <section className="w-full relative bg-[var(--cream)] py-[4vw] z-10 pt-12 flex flex-col items-center">
        <div className="w-full max-w-[90vw] max-md:max-w-[92vw] mx-auto mb-[6vw] flex flex-col items-center text-center">
          <span className="bg-[var(--yellow)] text-white font-modak text-[2.5vw] max-md:text-[5vw] px-[2vw] py-[0.5vw] max-md:px-[4vw] max-md:py-[1.5vw] rounded-full uppercase tracking-wider inline-block -rotate-2 mb-6">
            FULL MENU
          </span>
          <h2 className="uppercase leading-[0.85] text-[7.5vw] max-md:text-[10vw] text-[var(--red)] font-mouse-memoirs whitespace-nowrap mb-24 max-md:mb-14">
            Order Your Favourites
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 max-md:gap-3 mb-8 mt-10">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.slug)}
                className={`shrink-0 font-mouse-memoirs uppercase tracking-wide px-10 py-4 max-md:px-7 max-md:py-3 rounded-full text-[2.4vw] max-md:text-[5vw] transition-all duration-200 ${activeCategory === cat.slug
                  ? "bg-[var(--red)] text-white shadow-md"
                  : "bg-white text-[var(--dark)] hover:bg-black/5 border border-black/10 shadow-sm"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <p className="mt-2 font-nunito font-bold text-black/70 text-[1.3vw] max-md:text-[3.6vw] max-w-3xl">
            From smash-style burgers to pizza, sides, dips & desserts — fresh from{" "}
            {RESTAURANT.name}, {RESTAURANT.city}. Min order ₹{RESTAURANT.minOrder}.
          </p>
        </div>

        <div className="w-full max-w-[90vw] max-md:max-w-[92vw] mx-auto space-y-[8vw]">
          {MENU_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={`cat-${cat.slug}`}
              className="scroll-mt-24 max-md:scroll-mt-20"
            >
              <div className="flex items-end justify-between gap-4 mb-[3vw] max-md:mb-5 border-b-[3px] border-black/5 pb-[1.5vw]">
                <div className="flex items-center gap-[2vw] max-md:gap-3 min-w-0">
                  {cat.image ? (
                    <div className="relative shrink-0 w-[7vw] h-[7vw] max-md:w-[16vw] max-md:h-[16vw]">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-contain drop-shadow-md"
                        sizes="(max-width: 768px) 16vw, 7vw"
                      />
                    </div>
                  ) : null}
                  <h3 className="font-mouse-memoirs uppercase text-[4vw] max-md:text-[8vw] text-[var(--red)] leading-none truncate">
                    {cat.name}
                  </h3>
                </div>
                <span className="font-mouse-memoirs text-black/60 text-[1.4vw] max-md:text-[3.5vw] uppercase shrink-0">
                  {cat.items.length} items
                </span>
              </div>

              <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-[2.5vw] max-md:gap-4">
                {cat.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
      <Footer />
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const [src, setSrc] = useState(item.image);
  const { addItem, getQty, setQty, openCart } = useCart();
  const qty = getQty(item.id);

  useEffect(() => {
    setSrc(item.image);
  }, [item.image]);

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      priceLabel: item.priceLabel,
      image: item.image,
    });
  };

  return (
    <article className="menu-card-item relative bg-white rounded-[2vw] max-md:rounded-[5vw] p-[2vw] max-md:p-[4vw] flex flex-col shadow-md border-[3px] border-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <div className="absolute left-0 right-0 top-[38%] -translate-y-1/2 h-[2.8vw] max-md:h-[6vw] z-0 flex flex-col justify-between overflow-hidden opacity-90">
        <div className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,var(--red)_0px,var(--red)_14px,#fff_14px,#fff_28px)]" />
        <div className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,#fff_0px,#fff_14px,var(--red)_14px,var(--red)_28px)]" />
      </div>

      {/* Cart / add button */}
      {qty === 0 ? (
        <button
          type="button"
          onClick={handleAdd}
          className="absolute top-[2vw] right-[2vw] max-md:top-[4vw] max-md:right-[4vw] z-30 w-[3.5vw] max-md:w-[11vw] h-[3.5vw] max-md:h-[11vw] bg-[var(--yellow)] hover:scale-105 active:scale-95 text-[var(--dark)] rounded-full flex items-center justify-center shadow-md transition-transform"
          aria-label={`Add ${item.name} to cart`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.4"
            stroke="currentColor"
            className="w-[1.6vw] max-md:w-[5vw] h-[1.6vw] max-md:h-[5vw]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      ) : (
        <div className="absolute top-[1.5vw] right-[1.5vw] max-md:top-[3vw] max-md:right-[3vw] z-30 flex items-center gap-1 bg-[var(--red)] text-white rounded-full px-1 py-1 shadow-md">
          <button
            type="button"
            onClick={() => setQty(item.id, qty - 1)}
            className="w-[2.8vw] max-md:w-[8vw] h-[2.8vw] max-md:h-[8vw] rounded-full bg-white/20 font-bold text-[1.4vw] max-md:text-[5vw] leading-none"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <button
            type="button"
            onClick={openCart}
            className="font-nunito font-extrabold text-[1.2vw] max-md:text-[4vw] min-w-[2vw] px-1"
            aria-label={`${qty} in cart, open cart`}
          >
            {qty}
          </button>
          <button
            type="button"
            onClick={() => setQty(item.id, qty + 1)}
            className="w-[2.8vw] max-md:w-[8vw] h-[2.8vw] max-md:h-[8vw] rounded-full bg-[var(--yellow)] text-[var(--dark)] font-bold text-[1.4vw] max-md:text-[5vw] leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}

      <div className="relative z-10 w-full aspect-[5/4] max-md:aspect-[4/3] mb-3">
        <Image
          src={src}
          alt={item.name}
          fill
          className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
          sizes="(max-width: 768px) 90vw, 28vw"
          onError={() => {
            if (src !== DEFAULT_MENU_IMAGE) setSrc(DEFAULT_MENU_IMAGE);
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-1.5 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {item.isJain && (
            <span className="text-[0.65rem] max-md:text-[0.7rem] font-nunito font-extrabold uppercase tracking-wide bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Jain
            </span>
          )}
          {item.isDairyFree && (
            <span className="text-[0.65rem] max-md:text-[0.7rem] font-nunito font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              Dairy Free
            </span>
          )}
        </div>

        <div className="flex items-start justify-between gap-2">
          <h4 className="font-modak text-[1.5vw] max-md:text-[5vw] text-[var(--red)] leading-[1.15]">
            {item.name}
          </h4>
          <span className="shrink-0 font-nunito font-extrabold text-[1.6vw] max-md:text-[4.2vw] text-black/80 px-2 py-1 bg-black/5 rounded-lg whitespace-nowrap">
            {item.priceLabel}
          </span>
        </div>

        {item.priceNote ? (
          <p className="font-nunito font-bold text-[0.85vw] max-md:text-[2.8vw] text-black/50">
            {item.priceNote}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleAdd}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-[var(--red)] hover:bg-black text-white font-mouse-memoirs uppercase tracking-wide text-[1.2vw] max-md:text-[4vw] py-[0.9vw] max-md:py-[3vw] rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.2"
            stroke="currentColor"
            className="w-[1.4vw] max-md:w-[4.5vw] h-[1.4vw] max-md:h-[4.5vw]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          {qty > 0 ? "Add more" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

function CtaSection() {
  return (
    <section className="cta-section" id="cta-desktop">
      <svg className="cta-wave" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path
          fill="var(--yellow)"
          d="M0,0 C 400,150 1000,200 1440,50 L1440,0 L0,0 Z"
        />
      </svg>

      <div className="cta-content-wrapper">
        <div className="cta-text-area">
          <div className="cta-sticker">FEEL IT</div>
          <h2 className="cta-headline">
            FEEL THE
            <br />
            CHANGE
          </h2>
          <p className="cta-desc">
            Hungry in {RESTAURANT.city}? Call {RESTAURANT.contact} or swing by near
            Circuit House, Rewa Road — hot burgers, pizza & more ready to go.
          </p>
          <a
            href={`tel:${RESTAURANT.contact}`}
            className="relative w-fit border-none bg-transparent p-0 block cursor-pointer outline-none select-none mt-[1vw]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="-10 -10 602 475"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            >
              <path
                stroke="#ffffff"
                strokeWidth="10"
                fill="#F91914"
                d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z"
              />
            </svg>
            <span className="relative z-10 text-white font-bold text40 uppercase inline-block px-[4vw] py-[1.5vw] max-md:px-[10vw] max-md:py-[4vw]">
              Call to Order
            </span>
          </a>
        </div>

        <div className="cta-image-wrapper">
          <Image
            src="/images/burgerH.webp"
            alt="SVS Food burger"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="footer-top">
        <nav className="footer-nav">
          <Link href="/">HOME</Link>
          <Link href="/menu">BURGERS</Link>
          <Link href="/spices">SPICES</Link>
          <a href={`tel:${RESTAURANT.contact}`}>CONTACT</a>
        </nav>
        <div className="footer-copyright">© 2026 — ALL RIGHTS RESERVED</div>
      </div>

      <div className="footer-line" />

      <div className="footer-mid">
        <p>
          {RESTAURANT.address} · {RESTAURANT.contact}
        </p>
      </div>

      <div className="footer-giant-crav">
        <h1 className="footer-crav-text">SVSFood</h1>

        <div className="footer-floating footer-cheese">
          <div className={`pop-inner ${isVisible ? "pop-up-1" : "pop-hidden"}`}>
            <Image
              src="/images/cheese.webp"
              alt="Cheese"
              width={200}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="footer-floating footer-tomato">
          <div className={`pop-inner ${isVisible ? "pop-up-2" : "pop-hidden"}`}>
            <Image
              src="/images/tomato.webp"
              alt="Tomato"
              width={200}
              height={200}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        <div className="footer-floating footer-meat">
          <div className={`pop-inner ${isVisible ? "pop-up-3" : "pop-hidden"}`}>
            <Image
              src="/images/meat.webp"
              alt="Meat"
              width={300}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
