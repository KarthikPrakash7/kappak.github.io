import { useEffect, useRef } from "react";

function hexToRgba(hex: string, alpha: number): string {
  let r: number, g: number, b: number;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `rgba(${r},${g},${b},${alpha})`;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const NODE_COLORS = ["#7fd8c4", "#d9a15c", "#e26a5c"];
const LINK_COLOR = "#7fd8c4";
const DENSITY = 55;
const SPEED = 0.35;
const LINK_DISTANCE = 150;
const HOVER_DISTANCE = 200;
const HOVER_GRAVITY = 0.005;
const HOVER_BRIGHTEN = 0.7;
const BASE_OPACITY = 0.3;
const OVERSCAN = 80;

export function NodeGraphBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let nodes: Node[] = [];

    function spawnNodes() {
      const minX = -OVERSCAN;
      const maxX = width + OVERSCAN;
      const minY = -OVERSCAN;
      const maxY = height + OVERSCAN;
      nodes = Array.from({ length: DENSITY }, () => ({
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY),
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        r: 1 + Math.random() * 1.6,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
      }));
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnNodes();
    }

    function getBrightness(x: number, y: number): number {
      if (mouse.x <= -9000 || HOVER_DISTANCE <= 0 || HOVER_BRIGHTEN <= 0) return 0;
      const dist = Math.hypot(mouse.x - x, mouse.y - y);
      if (dist >= HOVER_DISTANCE) return 0;
      return (1 - dist / HOVER_DISTANCE) * HOVER_BRIGHTEN;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      const hasHover = mouse.x > -9000;

      // update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -OVERSCAN || n.x > width + OVERSCAN) n.vx *= -1;
        if (n.y < -OVERSCAN || n.y > height + OVERSCAN) n.vy *= -1;

        if (hasHover && HOVER_GRAVITY > 0) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < HOVER_DISTANCE) {
            const strength = (1 - dist / HOVER_DISTANCE) * HOVER_GRAVITY;
            n.x += dx * strength;
            n.y += dy * strength;
          }
        }
      }

      // draw links
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const proximity = 1 - dist / LINK_DISTANCE;
            const bright = getBrightness((a.x + b.x) / 2, (a.y + b.y) / 2);
            const alpha = Math.min(1, proximity * BASE_OPACITY + bright * proximity);
            ctx!.strokeStyle = hexToRgba(LINK_COLOR, alpha);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        const bright = getBrightness(n.x, n.y);
        const alpha = Math.min(1, BASE_OPACITY + bright);
        ctx!.fillStyle = hexToRgba(n.color, alpha);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = wrap!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}
