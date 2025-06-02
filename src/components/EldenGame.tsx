
import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import RuneFrame from './RuneFrame';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  passed: boolean;
}

const EldenGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  // Game state
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  // Game objects refs (to maintain state between renders)
  const playerRef = useRef<GameObject>({
    x: 50,
    y: 0,
    width: 40,
    height: 60
  });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const groundYRef = useRef(0);
  const jumpingRef = useRef(false);
  const jumpHeightRef = useRef(0);
  const gravityRef = useRef(0.6);
  const jumpStrengthRef = useRef(-12);
  const gameSpeedRef = useRef(5);
  const animationFrameRef = useRef<number | null>(null);
  const lastObstacleTimeRef = useRef(0);
  
  // Images
  const [playerImage] = useState(new Image());
  const [obstacleImage] = useState(new Image());
  const [backgroundImage] = useState(new Image());
  
  // Load images
  useEffect(() => {
    playerImage.src = '/assets/game/tarnished-runner.png';
    obstacleImage.src = '/assets/game/elden-obstacle.png';
    backgroundImage.src = '/assets/backgrounds/elden-ring-landscape.jpg';
  }, [playerImage, obstacleImage, backgroundImage]);

  // Initialize canvas and set up game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      groundYRef.current = canvas.height - 40;
      playerRef.current.y = groundYRef.current - playerRef.current.height;
    };
    
    // Initial resize
    resizeCanvas();
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('eldenRunnerHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Handle key events for desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !jumpingRef.current && isGameActive) {
        jump();
      }
      
      if (e.code === 'Space' && !isGameActive) {
        startGame();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameActive]);
  
  // Game loop
  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#463c28';
    ctx.fillRect(0, groundYRef.current, canvas.width, 40);
    
    // Apply gravity to player
    if (jumpingRef.current) {
      playerRef.current.y += jumpHeightRef.current;
      jumpHeightRef.current += gravityRef.current;
      
      if (playerRef.current.y >= groundYRef.current - playerRef.current.height) {
        playerRef.current.y = groundYRef.current - playerRef.current.height;
        jumpingRef.current = false;
      }
    }
    
    // Draw player
    if (playerImage.complete) {
      ctx.drawImage(
        playerImage,
        playerRef.current.x,
        playerRef.current.y,
        playerRef.current.width,
        playerRef.current.height
      );
    } else {
      // Fallback drawing if image isn't loaded
      ctx.fillStyle = '#d4af37';
      ctx.fillRect(
        playerRef.current.x,
        playerRef.current.y,
        playerRef.current.width,
        playerRef.current.height
      );
    }
    
    // Generate obstacles
    const currentTime = Date.now();
    const timeDiff = currentTime - lastObstacleTimeRef.current;
    const randomInterval = Math.random() * 1000 + 1000; // Between 1 and 2 seconds
    
    if (timeDiff > randomInterval && isGameActive) {
      const newObstacle: Obstacle = {
        x: canvas.width,
        y: groundYRef.current - 40,
        width: 30,
        height: 40,
        passed: false
      };
      
      obstaclesRef.current.push(newObstacle);
      lastObstacleTimeRef.current = currentTime;
    }
    
    // Update and draw obstacles
    obstaclesRef.current.forEach((obstacle, index) => {
      obstacle.x -= gameSpeedRef.current;
      
      // Draw obstacle
      if (obstacleImage.complete) {
        ctx.drawImage(
          obstacleImage,
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        );
      } else {
        // Fallback drawing
        ctx.fillStyle = '#7E69AB';
        ctx.fillRect(
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        );
      }
      
      // Collision detection
      if (detectCollision(playerRef.current, obstacle)) {
        endGame();
      }
      
      // Score when passing obstacle
      if (!obstacle.passed && obstacle.x < playerRef.current.x) {
        obstacle.passed = true;
        setScore(prevScore => prevScore + 1);
        
        // Increase game speed every 5 points
        if ((score + 1) % 5 === 0) {
          gameSpeedRef.current += 0.5;
        }
      }
      
      // Remove obstacles that are off-screen
      if (obstacle.x + obstacle.width < 0) {
        obstaclesRef.current.splice(index, 1);
      }
    });
    
    // Draw score
    ctx.fillStyle = '#d4af37';
    ctx.font = '20px "Cinzel Decorative", serif';
    ctx.fillText(`Score: ${score}`, 20, 30);
    
    if (isGameActive) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  };
  
  // Collision detection
  const detectCollision = (player: GameObject, obstacle: GameObject) => {
    return (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    );
  };
  
  // Jump function
  const jump = () => {
    if (!jumpingRef.current) {
      jumpingRef.current = true;
      jumpHeightRef.current = jumpStrengthRef.current;
    }
  };
  
  // Start game
  const startGame = () => {
    setIsGameActive(true);
    setGameOver(false);
    setScore(0);
    obstaclesRef.current = [];
    gameSpeedRef.current = 5;
    playerRef.current.y = groundYRef.current - playerRef.current.height;
    lastObstacleTimeRef.current = Date.now();
    jumpingRef.current = false;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  };
  
  // End game
  const endGame = () => {
    setIsGameActive(false);
    setGameOver(true);
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('eldenRunnerHighScore', score.toString());
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
  
  // Handle touch for mobile
  const handleTouchStart = () => {
    if (!isGameActive && !gameOver) {
      startGame();
    } else if (isGameActive && !jumpingRef.current) {
      jump();
    } else if (gameOver) {
      startGame();
    }
  };
  
  return (
    <section id="game" className="py-12 md:py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-elden text-elden-gold text-center mb-8">
          TARNISHED RUNNER
        </h2>
        
        <div className="mb-6 text-center">
          <p className="text-elden-ash font-lore mb-4">
            Press {isMobile ? 'the screen' : 'SPACE'} to jump and avoid obstacles in the Lands Between.
          </p>
          <p className="text-elden-gold font-lore mb-4">
            High Score: {highScore}
          </p>
        </div>
        
        <RuneFrame title="CHALLENGE THE LANDS BETWEEN">
          <div className="relative">
            <canvas 
              ref={canvasRef} 
              className="w-full h-64 md:h-80 bg-black"
              onTouchStart={handleTouchStart}
              onClick={handleTouchStart}
            />
            
            {!isGameActive && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <button 
                  className="elden-button text-xl px-8 py-4"
                  onClick={startGame}
                >
                  Begin Journey
                </button>
              </div>
            )}
            
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
                <p className="text-elden-gold font-elden text-2xl mb-4">YOU DIED</p>
                <p className="text-elden-ash font-lore mb-4">Score: {score}</p>
                <button 
                  className="elden-button mt-4"
                  onClick={startGame}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-elden-ash font-lore">
              Jump over the obstacles to survive. The journey gets faster as your score increases.
            </p>
          </div>
        </RuneFrame>
      </div>
    </section>
  );
};

export default EldenGame;
