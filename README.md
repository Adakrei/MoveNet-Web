# MoveNet-Web
MoveNet-Web is a sophisticated web application designed to demonstrate the capabilities of real-time human pose estimation using TensorFlow.js and the MoveNet model. The application is built with the following primary technologies:
- **Next.js**: A React framework for building server-side rendered and statically exported React applications.
- **TensorFlow.js**: A JavaScript library for training and deploying machine learning models in the browser and on Node.js.
- **MoveNet**: A state-of-the-art pose detection model that enables high-accuracy, real-time human pose estimation.
- **WebGL**: A cross-platform web standard for rendering 3D and 2D graphics, utilized here as the backend to leverage GPU acceleration.

### Key Features:
1. **Real-Time Pose Estimation**: Utilizing the MoveNet model, the application provides highly accurate and fast pose estimation.
2. **GPU Acceleration Using WebGL**: By setting TensorFlow.js to use the WebGL backend, the application takes full advantage of available GPU resources for efficient computation.
3. **Modern Web Stack**: Built on Next.js, the application benefits from server-side rendering, static site generation, and optimal web performance practices.

### Technical Overview:
1. **Project Initialization**:
   - Created a new Next.js application using the Create Next App tool.
   - Managed dependencies with pnpm for efficient and fast package management.

2. **Model Integration**:
   - Installed TensorFlow.js and the Pose Detection models.
   - Configured the TensorFlow.js backend to use WebGL for GPU acceleration.
   - Implemented pose estimation functionality in a React component.

3. **Resource Management**:
   - Stored image resources in the Next.js public directory for easy access.
   - Ensured loading and processing images efficiently within the application.

This repository serves as an excellent starting point for anyone looking to explore pose estimation in web applications or delve into the integration of machine learning models with modern JavaScript frameworks.

### Usage Instructions:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/adakrei/MoveNet-Web.git
   cd MoveNet-Web
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the Development Server**:
   ```bash
   pnpm dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

### Conclusion
MoveNet-Web combines cutting-edge machine learning with modern web technologies to deliver a seamless and efficient pose estimation application. By leveraging TensorFlow.js, WebGL, and Next.js, it provides a powerful foundation for real-time pose analysis directly in the browser.
