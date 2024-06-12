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


    flipCanvas = (ctx: CanvasRenderingContext2D, width: number) => {
        ctx.save();
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
    };

    draw(video: HTMLVideoElement, poses: poseDetection.Pose[]): Promise<void> {
        console.log('Drawing frame');
        const gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');
        if (ctx && video) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.flipCanvas(ctx, canvas.width);
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
            ctx.restore();
        }

        return Promise.resolve();
    }
}
