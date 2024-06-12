import * as poseDetection from '@tensorflow-models/pose-detection';
import { RefObject } from 'react';

export class RendererWebGL {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;

    constructor(canvas: HTMLCanvasElement, context: WebGLRenderingContext) {
        this.canvas = canvas;
        this.gl = context;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(video: HTMLVideoElement, poses: poseDetection.Pose[]): Promise<void> {
        console.log('Drawing frame');
        const gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');
        console.log(video);
        if (ctx && video) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            console.log('Drawing poses on canvas');
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

        return Promise.resolve();
    }
}
