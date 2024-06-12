'use client';

import useMoveNet from '@/hooks/useMoveNet';
import WebGLVideoRenderer from '@/components/WebGLVideoRenderer';
import { useEffect, useRef } from 'react';
import Stats from 'stats.js';

const IndexPage = () => {
    const statsRef = useRef<Stats>();
    const model = useMoveNet();

    useEffect(() => {
        if (!statsRef.current) {
            statsRef.current = new Stats();
            statsRef.current.showPanel(0);
            document.body.appendChild(statsRef.current.dom);
            statsRef.current.dom.style.position = 'absolute';
            statsRef.current.dom.style.top = '0px';
            statsRef.current.dom.style.right = '0px';
            statsRef.current.dom.style.left = 'auto';
        }

        const updateStats = () => {
            if (!statsRef.current) {
                return;
            }
            statsRef.current.begin();
            statsRef.current.end();
            requestAnimationFrame(updateStats);
        };

        updateStats();
    }, []);

    return (
        <div>
            <h1>MoveNet with TensorFlow.js and WebGL</h1>
            {model ? <WebGLVideoRenderer model={model} /> : <p>Loading model...</p>}
        </div>
    );
};

export default IndexPage;
