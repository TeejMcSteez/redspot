'use client';

import { useRef, useEffect } from 'react';

export default function JupiterCanvas() {

    const canvas = useRef(null);

    useEffect(() => {
        // Jupiter animation inside canvas
    });

    return (
        <canvas ref={canvas} width={500} height={500} className='mx-auto border border-white rounded-xl'/>
    );

}