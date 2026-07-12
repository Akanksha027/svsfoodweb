"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { RESTAURANT, DEFAULT_MENU_IMAGE } from "@/data/menu";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    setQty,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const minOrder = Number(RESTAURANT.minOrder) || 100;
  const meetsMin = totalPrice >= minOrder;

  const whatsappMessage = encodeURIComponent(
    [
      `Hi SVS Food! I'd like to place an order:`,
      "",
      ...items.map(
        (i) => `• ${i.name} x${i.qty} — ₹${Math.round(i.price * i.qty)}`
      ),
      "",
      `Total: ₹${Math.round(totalPrice)}`,
      `Name: `,
      `Address: `,
    ].join("\n")
  );

  const whatsappUrl = `https://wa.me/91${RESTAURANT.contact.replace(/\D/g, "")}?text=${whatsappMessage}`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[1000] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      {/* Panel — full width on phones, roomy sidebar on tablet/desktop */}
      <aside
        className={`fixed top-0 right-0 z-[1001] h-[100dvh] w-full sm:w-[min(100%,28rem)] md:w-[min(100%,34rem)] lg:w-[min(100%,40rem)] bg-[var(--cream)] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between gap-4 px-5 sm:px-7 md:px-8 py-5 sm:py-6 border-b border-black/10 shrink-0">
          <div className="min-w-0">
            <h2 className="font-mouse-memoirs uppercase text-[clamp(1.75rem,6vw,2.75rem)] text-[var(--red)] leading-none">
              Your Cart
            </h2>
            <p className="font-nunito text-base sm:text-lg font-bold text-black/50 mt-1.5">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/5 hover:bg-black/10 font-bold text-2xl sm:text-3xl flex items-center justify-center"
            aria-label="Close cart"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7 md:px-8 py-5 sm:py-6">
          {items.length === 0 ? (
            <div className="h-full min-h-[50vh] flex flex-col items-center justify-center text-center gap-4 py-16">
              <span className="text-6xl sm:text-7xl opacity-40" aria-hidden>
                🛒
              </span>
              <p className="font-mouse-memoirs uppercase text-2xl sm:text-3xl text-black/40">
                Cart is empty
              </p>
              <p className="font-nunito text-base sm:text-lg text-black/50 max-w-[280px]">
                Add burgers, pizza & more from the menu.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 bg-[var(--red)] text-white font-mouse-memoirs uppercase text-lg sm:text-xl px-8 py-3.5 rounded-full"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <ul className="space-y-4 sm:space-y-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 sm:gap-4 bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-sm border border-black/5"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 rounded-xl sm:rounded-2xl bg-[var(--cream)] overflow-hidden">
                    <Image
                      src={item.image || DEFAULT_MENU_IMAGE}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5"
                      sizes="(max-width: 640px) 96px, 128px"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-modak text-[var(--red)] text-[clamp(1.15rem,4vw,1.65rem)] leading-tight">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-black/30 hover:text-[var(--red)] text-lg sm:text-xl font-bold shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5"
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="font-nunito font-extrabold text-sm sm:text-base text-black/70">
                      ₹{Math.round(item.price)} each
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-black/5 rounded-full p-1">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[var(--red)] font-bold text-xl leading-none shadow-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="font-nunito font-extrabold text-lg sm:text-xl min-w-[1.75rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--red)] text-white font-bold text-xl leading-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-nunito font-extrabold text-lg sm:text-xl md:text-2xl whitespace-nowrap">
                        ₹{Math.round(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-black/10 px-5 sm:px-7 md:px-8 py-5 sm:py-6 space-y-3.5 sm:space-y-4 bg-white shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mouse-memoirs uppercase text-xl sm:text-2xl text-black/60">
                Total
              </span>
              <span className="font-modak text-[clamp(1.75rem,5vw,2.5rem)] text-[var(--red)] leading-none">
                ₹{Math.round(totalPrice)}
              </span>
            </div>

            {!meetsMin && (
              <p className="font-nunito text-sm sm:text-base font-bold text-amber-800 bg-amber-50 rounded-xl px-4 py-3">
                Min order ₹{minOrder}. Add ₹{Math.round(minOrder - totalPrice)} more.
              </p>
            )}

            <a
              href={meetsMin ? whatsappUrl : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center font-mouse-memoirs uppercase text-xl sm:text-2xl py-4 sm:py-4.5 rounded-full transition-opacity ${
                meetsMin
                  ? "bg-[#25D366] text-white hover:opacity-90"
                  : "bg-black/20 text-black/40 pointer-events-none"
              }`}
            >
              Order on WhatsApp
            </a>

            <div className="flex gap-3">
              <a
                href={`tel:${RESTAURANT.contact}`}
                className="flex-1 text-center font-mouse-memoirs uppercase text-lg sm:text-xl py-3.5 sm:py-4 rounded-full border-2 border-[var(--red)] text-[var(--red)]"
              >
                Call
              </a>
              <button
                type="button"
                onClick={clearCart}
                className="flex-1 font-mouse-memoirs uppercase text-lg sm:text-xl py-3.5 sm:py-4 rounded-full border-2 border-black/15 text-black/50 hover:border-[var(--red)] hover:text-[var(--red)]"
              >
                Clear
              </button>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}

export function FloatingCartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[999] w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] bg-[var(--red)] border-[3px] border-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
      aria-label={`Open cart, ${totalItems} items`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.2"
        stroke="currentColor"
        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[1.6rem] h-[1.6rem] sm:min-w-[1.75rem] sm:h-[1.75rem] px-1 bg-[var(--yellow)] text-[var(--dark)] text-sm font-extrabold rounded-full flex items-center justify-center border-2 border-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
