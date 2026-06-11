import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TopNav.css";

interface Item {
  id: string;
  label: string;
}

export function TopNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="topnav">
      <div className="topnav-inner">
        <a href="#top" className="topnav-brand mono">
          karthik<span className="topnav-brand-accent">.dev</span>
        </a>
        <nav className="topnav-links">
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className={`topnav-link mono ${active === i.id ? "active" : ""}`}
            >
              {i.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="topnav-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`topnav-burger-bar ${open ? "open top" : ""}`} />
          <span className={`topnav-burger-bar ${open ? "open mid" : ""}`} />
          <span className={`topnav-burger-bar ${open ? "open bottom" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="topnav-mobile"
          >
            {items.map((i) => (
              <a
                key={i.id}
                href={`#${i.id}`}
                onClick={() => setOpen(false)}
                className={`topnav-mobile-link mono ${active === i.id ? "active" : ""}`}
              >
                {i.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
