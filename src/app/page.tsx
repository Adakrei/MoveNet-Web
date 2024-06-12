'use client';

import { useEffect, useRef } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import Stats from 'stats.js';

const IndexPage = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<poseDetection.PoseDetector>();
    const statsRef = useRef<Stats>();

    useEffect(() => {
        const loadModel = async () => {
            const detectorConfig: poseDetection.MoveNetModelConfig = {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
                enableTracking: true,
                trackerType: poseDetection.TrackerType.BoundingBox
            };
            await tf.setBackend('webgl');
            await tf.ready();
            modelRef.current = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
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

        const flipCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            ctx.save();
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
        };

        const drawPoses = (poses: poseDetection.Pose[]) => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx && videoRef.current) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Flip the canvas horizontally
                    flipCanvas(ctx, canvas.width, canvas.height);
                    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                    // Draw the keypoints
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
                    // Reverse the flip for subsequent drawing
                    ctx.restore();
                }
            }
        };

        const initStats = () => {
            if (!statsRef.current) {
                statsRef.current = new Stats();
                statsRef.current.showPanel(0);
                document.body.appendChild(statsRef.current.dom);
            }
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
