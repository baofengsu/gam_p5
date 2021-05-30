  // let p;
  const particles =  [];
 
  // p5js自动调用1次
  function setup() {
      // 创建画布
      var canvas = createCanvas(window.innerWidth, window.innerHeight);
      canvas.parent('sketch-holder');

      // p = new Particle();
      const particlesLength = Math.floor(window.innerWidth / 10);// 粒子数量

      for(let i=0;i<particlesLength;i++) {
          particles.push(new Particle());
      }
  }

  // p5js自动循环调用
  function draw() {
      var canvas = createCanvas(window.innerWidth, window.innerHeight);
     // canvas.parent('sketch-holder');


      background('#34495e');
      // p.customUpdate();
      // p.customDraw();
      particles.forEach((p,index) => {
          p.customUpdate();
          p.customDraw();
          p.checkParticles(particles.slice(index));
      });
  }

  // 粒子
  class Particle {
      constructor() {
          // 生成每个粒子的位置
          this.pos = createVector(random(width),random(height));
          // 粒子的大小
          this.size = 10;
          // 移动速度
          this.vel = createVector(random(-5,5),random(-5,5));
      }

      // 绘制图形
      customDraw() {
          // 绘制单个粒子
          noStroke();
          fill('#1abc9c');
          circle(this.pos.x,this.pos.y,this.size);
      }

      // 更新动画
      customUpdate(){
          this.pos.add(this.vel);
          this.customEdges();
      }

      // 检测边缘
      customEdges() {
          if(this.pos.x < 0 || this.pos.x > width) {
              this.vel.x *= -1;
          }
          if(this.pos.y < 0 || this.pos.y > height) {
              this.vel.y *= -1;
          }
      }

      // 粒子连线
      checkParticles(particles) {
          particles.forEach(particle => {
              // 距离矩阵来限制范围
              const d = dist(this.pos.x, this.pos.y,particle.pos.x,particle.pos.y);

              if(d < 50){
                  stroke('#3498db');
                  line(this.pos.x, this.pos.y,particle.pos.x,particle.pos.y);
              }
          })
      }
  }

