async function eulerMethod(f, x0, y0) {
    let x = x0;
    let y = y0;
    let steps = numberOfSteps;
    let h = stepSize;
    
    let prevX = x, prevY = y;

    for (let i = 0; i < steps; i++) {
        if (!running) { stopRunning(); return; }
        
        y = y + h * f(x, y);  // Euler's formula
        x = x + h;

        drawLine(prevX, prevY, x, y);  // Draw line from previous point to current point
        drawPoint(x, y);  // Function to plot the point (x, y)
        
        prevX = x;
        prevY = y;
        
        await sleep();  // Wait for some time before the next iteration

        if (i % 10 == 0) { 
            drawGraph();
        }
    }
    stopRunning();
}
