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

        const engine = Matter.Engine.create();
        engineRef.current = engine;
        const { world } = engine;
        engine.gravity.y = 0.8;

        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        // Boundaries
        const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width, 100, { isStatic: true }); // High ceiling

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // Create Skill Bodies
        const skillBodies = SKILLS.map((skill, index) => {
            const textWidth = skill.length * 8 + 40;
            const x = Math.random() * (width - textWidth) + textWidth / 2;
            const y = -100 - (index * 40); // Staggered start above the container

            const body = Matter.Bodies.rectangle(x, y, textWidth, 36, {
                restitution: 0.6,
                friction: 0.1,
                chamfer: { radius: 18 },
            });

            return { body, id: index };
        });

        Matter.World.add(world, skillBodies.map(b => b.body));

        // Mouse interaction
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        // Runner (Don't run yet)
        const runner = Matter.Runner.create();
        runnerRef.current = runner;

        // Animation Loop (DOM Update)
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

        // ScrollTrigger to start the engine
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
            className="w-full h-[60vh] bg-secondary/10 rounded-3xl border border-border/20 overflow-hidden relative mb-24 cursor-grab active:cursor-grabbing"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
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
                            transform: "translate(-50%, -500px)", // Start far above
                            padding: "8px 18px",
                            backgroundColor: "#154FD1",
                            color: "white",
                            borderRadius: "9999px",
                            fontSize: "13px",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            willChange: "transform",
                        }}
                    >
                        {skill}
                    </div>
                ))}
            </div>

            {/* Section Label moved to subtle hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
                <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-black">interact</span>
            </div>
        </div>
    );
};

export default SkillsGravity;
