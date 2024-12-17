document.addEventListener("DOMContentLoaded", () => {
    const explanations = [
      "1. 나는",
      "2. 너가 다른 사람한테 고백하는거 싫은데",
      "3. 아 진짜",
      "4. 미치겠다",
      "5. 나 진짜 미친거 확실한듯",
      "6. 나 너 좋아해",
      "7. 진짜",
      "8. 장난 아니고",
      "9. 거짓말 아닌데",
      "10. 아니야",
      "11. 이런거로 거짓말 안해",
      "12. 진짜 시기 놓치면 후회할거같아서",
      "13. 아니야",
      "14. 어떻게 하면 믿을래",
      "15. 진심인데",
      "16. 진짜",
      "17. 진심이야",
      "18. ㅋㅋㅋㅋ진짜 아닌데",
      "19. 솔직히",
      "20. 아 몰라",
      "21. 나 이런걸로 거짓말 절대 안하고",
      "22. 너무 갑작스럽게 말해서",
      "23. 생각 정리할 시간이 필요한건 아는데",
      "24. 진심인것만 알아줫으면 좋겠어",
      "25. 일주일 후..."
    ];
  
    const explanationContainer = document.getElementById("explanation-container");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
  
    let currentStep = 0;
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    function showStep(index) {
      explanationContainer.innerHTML = explanations[index];
      explanationContainer.style.opacity = "0";
      explanationContainer.style.transform = "translateY(30px)";
      setTimeout(() => {
        explanationContainer.style.opacity = "1";
        explanationContainer.style.transform = "translateY(0)";
      }, 100);
    }
  
    // "이전" 버튼 처리
    prevButton.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
      // "이전" 버튼이 첫 번째 단계에서 다시 숨겨짐
      if (currentStep === 0) prevButton.style.display = "none";
      nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>'; // "다음 ▶" 아이콘으로 변경
    });
  
    // "다음" 버튼 처리
    nextButton.addEventListener("click", () => {
      if (currentStep < explanations.length - 1) {
        currentStep++;
        showStep(currentStep);
        prevButton.style.display = "inline-block"; // "이전" 버튼 보이기
      } else {
        launchFireworks();
        nextButton.innerHTML = '<i class="fas fa-redo-alt"></i>'; // "처음으로 🔄" 아이콘으로 변경
        currentStep++;
      }
  
      if (currentStep >= explanations.length) resetSteps();
    });
  
    function resetSteps() {
      currentStep = 0;
      showStep(currentStep);
      nextButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
      prevButton.style.display = "none"; // "이전" 버튼 숨기기
    }
  
    function launchFireworks() {
      const particles = [];
      const colors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
  
      function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.opacity = 1;
      }
  
      Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
      };
  
      Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.closePath();
      };
  
      function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 30; i++) {
          particles.push(new Particle(x, y, color));
        }
      }
  
      function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
          particle.update();
          particle.draw();
          if (particle.opacity <= 0) particles.splice(index, 1);
        });
        if (particles.length > 0) requestAnimationFrame(animateFireworks);
      }
  
      for (let i = 0; i < 5; i++) createFirework();
      animateFireworks();
    }
  
    // 첫 번째 단계 표시
    showStep(currentStep);
  });
