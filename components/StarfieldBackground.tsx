import React, { useEffect, useRef } from 'react';

interface Star {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    z: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

const StarfieldBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let lastScrollY = window.scrollY || 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 5000), 300);
            stars = [];
            for (let i = 0; i < count; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                stars.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    z: Math.random() * 3 + 0.5,
                    size: Math.random() * 1.8 + 0.3,
                    opacity: Math.random() * 0.6 + 0.2,
                    twinkleSpeed: Math.random() * 0.003 + 0.001,
                    twinklePhase: Math.random() * Math.PI * 2,
                });
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.targetX = e.clientX / window.innerWidth;
            mouseRef.current.targetY = e.clientY / window.innerHeight;
        };

        const drawStar = (star: Star, time: number) => {
            const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
            const opacity = star.opacity + twinkle * 0.2;
            const size = star.size + twinkle * 0.3;

            const hue = 40 + Math.sin(star.twinklePhase) * 30;
            const saturation = 10 + Math.sin(star.twinklePhase * 1.3) * 10;
            const lightness = 85 + twinkle * 10;

            ctx!.beginPath();
            ctx!.arc(star.x, star.y, Math.max(size, 0.2), 0, Math.PI * 2);
            ctx!.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.max(opacity, 0.05)})`;
            ctx!.fill();

            // Soft glow for brighter stars
            if (star.size > 1.2) {
                const gradient = ctx!.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.size * 3
                );
                gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity * 0.3})`);
                gradient.addColorStop(1, 'transparent');
                ctx!.beginPath();
                ctx!.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                ctx!.fillStyle = gradient;
                ctx!.fill();
            }
        };

        const animate = (time: number) => {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth mouse interpolation
            const mouse = mouseRef.current;
            mouse.x += (mouse.targetX - mouse.x) * 0.03;
            mouse.y += (mouse.targetY - mouse.y) * 0.03;

            // Scroll delta calculation
            const currentScrollY = window.scrollY || 0;
            const scrollDelta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            // Mouse offset from center (range: -0.5 to 0.5)
            const mx = mouse.x - 0.5;
            const my = mouse.y - 0.5;

            for (const star of stars) {
                // Parallax: deeper stars (higher z) move more with mouse
                const parallaxStrength = star.z * 12;
                const parallaxX = mx * parallaxStrength;
                const parallaxY = my * parallaxStrength;

                // Apply scroll parallax
                star.baseY -= scrollDelta * star.z * 0.15;

                // Slow upward drift + gentle sway
                star.baseY -= star.z * 0.04;
                star.baseX += Math.sin(time * 0.0001 + star.twinklePhase) * 0.02;

                // Apply parallax to base position
                star.x = star.baseX + parallaxX;
                star.y = star.baseY + parallaxY;

                // Wrap around
                if (star.baseY < -5) {
                    star.baseY = canvas.height + 5;
                    star.baseX = Math.random() * canvas.width;
                }
                if (star.baseY > canvas.height + 5) {
                    star.baseY = -5;
                    star.baseX = Math.random() * canvas.width;
                }
                if (star.baseX < -5) star.baseX = canvas.width + 5;
                if (star.baseX > canvas.width + 5) star.baseX = -5;

                drawStar(star, time);
            }

            // Subtle nebula glows that shift with mouse
            const nebulaGradient = ctx!.createRadialGradient(
                canvas.width * (0.3 + mx * 0.1), canvas.height * (0.4 + my * 0.1), 0,
                canvas.width * (0.3 + mx * 0.1), canvas.height * (0.4 + my * 0.1), canvas.width * 0.5
            );
            nebulaGradient.addColorStop(0, 'rgba(255, 194, 14, 0.012)');
            nebulaGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.006)');
            nebulaGradient.addColorStop(1, 'transparent');
            ctx!.fillStyle = nebulaGradient;
            ctx!.fillRect(0, 0, canvas.width, canvas.height);

            const nebulaGradient2 = ctx!.createRadialGradient(
                canvas.width * (0.7 - mx * 0.1), canvas.height * (0.6 - my * 0.1), 0,
                canvas.width * (0.7 - mx * 0.1), canvas.height * (0.6 - my * 0.1), canvas.width * 0.4
            );
            nebulaGradient2.addColorStop(0, 'rgba(6, 182, 212, 0.008)');
            nebulaGradient2.addColorStop(0.5, 'rgba(255, 194, 14, 0.004)');
            nebulaGradient2.addColorStop(1, 'transparent');
            ctx!.fillStyle = nebulaGradient2;
            ctx!.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };

        const onScramble = (e: CustomEvent | Event) => {
            const customEvent = e as CustomEvent;
            const px = customEvent.detail.x;
            const py = customEvent.detail.y;

            for (const star of stars) {
                const dx = star.x - px;
                const dy = star.y - py;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // If star is within 400px of the click, scramble it outwards
                if (dist < 400) {
                    const force = (400 - dist) / 400; // Stronger closer to center
                    const angle = Math.atan2(dy, dx) + (Math.random() - 0.5); // Add some chaos
                    const push = force * (Math.random() * 150 + 50);

                    star.baseX += Math.cos(angle) * push;
                    star.baseY += Math.sin(angle) * push;
                }
            }
        };

        resize();
        animationFrameId = requestAnimationFrame(animate);
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scrambleStars', onScramble as EventListener);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scrambleStars', onScramble as EventListener);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none transform-gpu will-change-transform"
            style={{ background: 'transparent' }}
        />
    );
};

export default StarfieldBackground;
