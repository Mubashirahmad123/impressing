let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseDown = false;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (!this.rotating && this.mouseDown) {
        this.velX = e.clientX - this.prevMouseX;
        this.velY = e.clientY - this.prevMouseY;
      }

      const dirX = e.clientX - this.mouseX;
      const dirY = e.clientY - this.mouseY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (180 * angle) / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper && !this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper || e.button !== 0) return; // Only handle left mouse button
      this.holdingPaper = true;
      this.mouseDown = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    paper.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.mouseDown = false;
      this.rotating = false;
    });

    paper.addEventListener('mouseleave', () => {
      if (this.holdingPaper && !this.rotating) {
        this.holdingPaper = false;
        this.mouseDown = false;
      }
    });

    // For rotation with right mouse button
    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.holdingPaper) {
        this.rotating = true;
      }
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// For music
window.onload = function () {
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.play();
};
