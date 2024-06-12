import { RendererWebGL } from '@/utils/rendererWebGL';
import { getDevice } from '@/utils/rendererUtils';
import React, { useRef, useEffect, useState } from 'react';
import { PoseDetector } from '@tensorflow-models/pose-detection';

const WebGLVideoRenderer: React.FC<{ model: PoseDetector }> = ({ model }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<RendererWebGL | null>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const startVideo = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: 640, height: 480 },
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onloadedmetadata = async() => {
                            await videoRef.current?.play();
                            setIsVideoLoaded(true);
                        };
                    }
                } catch (err) {
                    console.error('Error accessing user media', err);
                }
            }
        };

        const initializeRenderer = () => {
            if (canvasRef.current) {
                const { context } = getDevice<WebGLRenderingContext>(canvasRef.current);
                rendererRef.current = new RendererWebGL(canvasRef.current, context);
                console.log('Renderer initialized');
            }
        };

        const detectPose = async () => {
            if (rendererRef.current && model && videoRef.current) {
                const poses = await model.estimatePoses(videoRef.current);
                await rendererRef.current.draw(videoRef.current, poses);
            }
            requestAnimationFrame(detectPose);
        };

        if (isVideoLoaded) {
            detectPose();
        }

        initializeRenderer();
        startVideo();
    }, [model, isVideoLoaded]);

    return (
        <div>
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} width="640" height="480" />
        </div>
    );
};

export default WebGLVideoRenderer;
