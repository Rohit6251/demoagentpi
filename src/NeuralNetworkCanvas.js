import React, { useRef, useEffect, useState } from "react";

const NODE_COUNT = 40;
const MAX_DISTANCE = 120;

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const mousePos = useRef({ x: null, y: null });

  // Initialize nodes once
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const newNodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      newNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,  // velocity X
        vy: (Math.random() - 0.5) * 0.6,  // velocity Y
      });
    }
    setNodes(newNodes);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function updateNodes() {
      for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x <= 0 || node.x >= width) node.vx = -node.vx;
        if (node.y <= 0 || node.y >= height) node.vy = -node.vy;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            let opacity = 1 - dist / MAX_DISTANCE;

            if (
              mousePos.current.x !== null &&
              mousePos.current.y !== null
            ) {
              const mouseDx = (nodes[i].x + nodes[j].x) / 2 - mousePos.current.x;
              const mouseDy = (nodes[i].y + nodes[j].y) / 2 - mousePos.current.y;
              const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
              if (mouseDist < 100) opacity = 1;
            }

            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = "cyan";
            ctx.shadowBlur = 8;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        let glowRadius = 8;
        let opacity = 0.6;
        if (
          mousePos.current.x !== null &&
          mousePos.current.y !== null
        ) {
          const dx = node.x - mousePos.current.x;
          const dy = node.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            glowRadius = 14;
            opacity = 1;
          }
        }

        ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
        ctx.shadowColor = "cyan";
        ctx.shadowBlur = glowRadius;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      updateNodes();
      requestAnimationFrame(draw);
    }

    draw();

    // Cleanup
    return () => cancelAnimationFrame(draw);
  }, [nodes]);

  function handleMouseMove(e) {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }

  function handleMouseLeave() {
    mousePos.current = { x: null, y: null };
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor: "#000",
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
