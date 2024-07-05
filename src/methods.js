async function eulerMethod(f, x0, y0) {
    let x = x0;
    let y = y0;
    let steps = numberOfSteps;
    let h = stepSize;
    
    for (let i = 0; i < steps; i++) {
        if (!running) { stopRunning(); return; }
        
        y = y + h * f(x, y);  // Euler's formula
        x = x + h;

        drawPoint(x, y);  // Function to plot the point (x, y)
        await sleep();  // Wait for some time before the next iteration

        if (i % 10 == 0) { 
            drawGraph();
        }
    }
    stopRunning();
}

// Example differential equation function dy/dx = f(x, y)
function differentialEquation(x, y) {
    return x * y;  // Replace with function
}
