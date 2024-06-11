'use client';

import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-wasm';
import * as movenet from '@tensorflow-models/pose-detection';
import Stats from 'stats.js';

const IndexPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<movenet.PoseDetector>();
    const statsRef = useRef<Stats>();

    useEffect(() => {
        const loadModel = async () => {
            await tf.setBackend('webgl');
            modelRef.current = await movenet.createDetector(movenet.SupportedModels.MoveNet);
        };

        const startVideo = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { width: 640, height: 480 },
                    });
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.onloadedmetadata = () => {
                            videoRef.current?.play();
                            detectPose();
                        };
                    }
                } catch (err) {
                    console.error('Error accessing user media', err);
                }
            }
        };

        const detectPose = async () => {
            if (modelRef.current && videoRef.current) {
                statsRef.current?.begin();
                const poses = await modelRef.current.estimatePoses(videoRef.current);
                drawPoses(poses);
                statsRef.current?.end();
            }
            requestAnimationFrame(detectPose);
        };

        const drawPoses = (poses: movenet.Pose[]) => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx && videoRef.current) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                    poses.forEach((pose) => {
                        pose.keypoints.forEach((keypoint) => {
                            if (keypoint.score !== undefined && keypoint.score > 0.5) {
                                const { y, x } = keypoint;
                                ctx.beginPath();
                                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                                ctx.fillStyle = 'red';
                                ctx.fill();
                            }
                        });
                    });
                }
            }
        };

        const initStats = () => {
            statsRef.current = new Stats();
            statsRef.current.showPanel(0);
            document.body.appendChild(statsRef.current.dom);
        };

        initStats();
        loadModel();
        startVideo();
    }, []);

    return (
        <div>
            <h1>MoveNet with TensorFlow.js and WebGL</h1>
            <video ref={videoRef} style={{ display: 'none' }} />
            <canvas ref={canvasRef} width="640" height="480" />
        </div>
    );
};

export default IndexPage;
