import { useEffect, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

const useMoveNet = () => {
    const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            const detectorConfig: poseDetection.MoveNetModelConfig = {
                modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
                enableTracking: true,
                trackerType: poseDetection.TrackerType.BoundingBox,
            };
            await tf.setBackend('webgl');
            await tf.ready();
            const newDetector = await poseDetection.createDetector(
                poseDetection.SupportedModels.MoveNet,
                detectorConfig,
            );
            setDetector(newDetector);
        };

        loadModel();
    }, []);

    return detector;
};

export default useMoveNet;
