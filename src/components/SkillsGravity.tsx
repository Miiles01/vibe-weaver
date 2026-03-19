import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    "Estrategia de Ventas", "Funnels de IA", "Automatización CRM",
    "Lead Generation", "Revenue Ops", "Branding con IA",
    "Creación de Identidad de Marca", "Innovación Creativa",
    "Soluciones de IA", "Agentes Autónomos", "Workflows Zapier/Make",
    "Copywriting", "Prompt Engineering", "Escalamiento GTM", "Vibe Coding"
];

const SkillsGravity = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Engine
        const engine = Matter.Engine.create();
        engineRef.current = engine;
        const { world } = engine;
        engine.gravity.y = 1.2; // Slightly stronger gravity

        const getDimensions = () => ({
            width: containerRef.current?.offsetWidth || 0,
            height: containerRef.current?.offsetHeight || 0
        });

        let { width, height } = getDimensions();

        // Thicker boundaries to prevent escaping
        const THICKNESS = 500;
        const ground = Matter.Bodies.rectangle(width / 2, height + THICKNESS / 2, width * 2, THICKNESS, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-THICKNESS / 2, height / 2, THICKNESS, height * 2, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + THICKNESS / 2, height / 2, THICKNESS, height * 2, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width * 2, THICKNESS, { isStatic: true });

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // Create Skill Bodies with larger sizes
        const skillBodies = SKILLS.map((skill, index) => {
            // Larger font size means larger tags. text-lg is ~18px. 
            // Multiplier refined for Plus Jakarta Sans
            const textWidth = skill.length * 11 + 60;
            const textHeight = 54; // Larger height

            const x = (width * 0.2) + (Math.random() * (width * 0.6));
            const y = -200 - (index * 60); // Staggered start far above

            const body = Matter.Bodies.rectangle(x, y, textWidth, textHeight, {
                restitution: 0.7,
                friction: 0.1,
                chamfer: { radius: textHeight / 2 },
            });

            return { body, id: index, width: textWidth, height: textHeight };
        });

        Matter.World.add(world, skillBodies.map(b => b.body));

        // Interactive mouse constraint
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        const runner = Matter.Runner.create();
        runnerRef.current = runner;

        // Optimized Animation Loop
        let animationFrame: number;
        const updateDOM = () => {
            skillBodies.forEach((item, index) => {
                const domElement = itemRefs.current[index];
                if (domElement) {
                    const { x, y } = item.body.position;
                    const angle = item.body.angle;
                    domElement.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
                }
            });
            animationFrame = requestAnimationFrame(updateDOM);
        };

        // Responsive cleanup & logic
        const handleResize = () => {
            if (!containerRef.current) return;
            const newDim = getDimensions();
            Matter.Body.setPosition(ground, { x: newDim.width / 2, y: newDim.height + THICKNESS / 2 });
            Matter.Body.setPosition(wallRight, { x: newDim.width + THICKNESS / 2, y: newDim.height / 2 });
        };

        window.addEventListener('resize', handleResize);

        // ScrollTrigger to trigger physics and animation
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            onEnter: () => {
                Matter.Runner.run(runner, engine);
                updateDOM();
            },
            once: true
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrame) cancelAnimationFrame(animationFrame);
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="contenedor-gravedad"
            className="w-full h-[65vh] bg-secondary/10 rounded-[2.5rem] border border-border/20 overflow-hidden relative mb-32 cursor-grab active:cursor-grabbing"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="absolute inset-0">
                {SKILLS.map((skill, index) => (
                    <div
                        key={index}
                        ref={(el) => (itemRefs.current[index] = el)}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            transform: "translate(-50%, -1000px)", // Hidden way above
                            padding: "16px 32px", // Increased padding
                            backgroundColor: "#154FD1",
                            color: "white",
                            borderRadius: "9999px",
                            fontSize: "18px", // Increased font size
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            boxShadow: "0 8px 24px rgba(21, 79, 209, 0.2)",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            willChange: "transform",
                        }}
                        className="font-heading"
                    >
                        {skill}
                    </div>
                ))}
            </div>

            {/* Subtle interaction cue */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-black animate-bounce">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </div>
            </div>
        </div>
    );
};

export default SkillsGravity;
