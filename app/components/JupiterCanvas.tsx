'use client';

import { useRef, useEffect } from 'react';

export default function JupiterCanvas() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext("2d") : null;

        let animationFrameId;

        const draw = (timestamp: number) => {
            // GRS Properties
            const GRS_0: number = 330;
            const t0: number = Date.UTC(2025, 6, 1) / 1000; // July 1, 2025 UTC seconds
            const driftRate: number = -0.10; // degrees/day
            // Time
            const now = Date.now() / 1000;
            const dDays = (now - t0) / 86400;

            // GRS Rotation Logic
            const grsLongitudeDeg = (GRS_0 + driftRate * dDays) % 360;
            const normalizedLongitude = (grsLongitudeDeg + 360) % 360;

            ctx?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0); // very readable typscript, nullish-coalescing and optional properties

            const cx = canvas ? canvas.width / 2 : 0;
            const cy = canvas ? canvas.height / 2 : 0;
            const r = 200;

            ctx?.beginPath();
            ctx?.arc(cx, cy, r, 0, 2 * Math.PI);
            if (ctx) {
                ctx.fillStyle = "blue";
            }
            ctx?.fill();

            // Project GRS longitude
            const grsAngleRad = (normalizedLongitude * Math.PI) / 180;
            const grsX = cx + r * Math.cos(grsAngleRad);
            const grsY = cy + r * Math.sin(grsAngleRad);

            ctx?.beginPath();
            ctx?.arc(grsX, grsY, 10, 0, 2 * Math.PI);
            if (ctx) {
                ctx.fillStyle = 'red';
            }
            ctx?.fill();

            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);
    }, []);

    return (
        <canvas ref={canvasRef} width={500} height={500} className='mx-auto border border-white rounded-xl'/>
    );

}