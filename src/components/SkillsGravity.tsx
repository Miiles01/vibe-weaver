import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    { text: "Ventas", type: "rect" },
    { text: "Marketing", type: "circle" },
    { text: "Customer Experience", type: "rect" },
    { text: "Funnels", type: "rect" },
    { text: "CRM", type: "circle" },
    { text: "Vibe Coding", type: "rect" },
    { text: "Branding", type: "rect" },
    { text: "Automatización con IA", type: "rect" }
];

const COLORS = [
    "#154FD1", // Brand Blue
    "#0F3DA1", // Darker Blue
    "#3A76F0", // Lighter Blue
    "#1A1A1A", // Near Black
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
        engine.gravity.y = 1.0;

        const getDimensions = () => ({
            width: containerRef.current?.offsetWidth || 0,
            height: containerRef.current?.offsetHeight || 0
        });

        let { width, height } = getDimensions();

        const THICKNESS = 1000;
        const INSET = 20;

        const ground = Matter.Bodies.rectangle(width / 2, height + THICKNESS / 2 - INSET, width * 3, THICKNESS, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-THICKNESS / 2 + INSET, height / 2, THICKNESS, height * 3, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + THICKNESS / 2 - INSET, height / 2, THICKNESS, height * 3, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -1500, width * 3, THICKNESS, { isStatic: true });

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // Create Skill Bodies with mixed shapes
        const skillBodies = SKILLS.map((skill, index) => {
            const x = (width * 0.2) + (Math.random() * (width * 0.6));
            const y = -150 - (index * 80);

            let body;
            let w, h;

            if (skill.type === "circle") {
                const radius = 50 + (skill.text.length * 2);
                body = Matter.Bodies.circle(x, y, radius, {
                    restitution: 0.8,
                    friction: 0.05,
                    density: 0.001
                });
                w = h = radius * 2;
            } else {
                w = skill.text.length * 12 + 60;
                h = 60;
                body = Matter.Bodies.rectangle(x, y, w, h, {
                    restitution: 0.6,
                    friction: 0.1,
                    chamfer: { radius: h / 2 }
                });
            }

            return { body, id: index, type: skill.type, w, h };
        });

        Matter.World.add(world, skillBodies.map(b => b.body));

        // Mouse constraint
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.1,
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        const runner = Matter.Runner.create();
        runnerRef.current = runner;

        // Animation Loop
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

        // Resize Handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const newDim = getDimensions();
            Matter.Body.setPosition(ground, { x: newDim.width / 2, y: newDim.height + THICKNESS / 2 - INSET });
            Matter.Body.setPosition(wallLeft, { x: -THICKNESS / 2 + INSET, y: newDim.height / 2 });
            Matter.Body.setPosition(wallRight, { x: newDim.width + THICKNESS / 2 - INSET, y: newDim.height / 2 });
        };

        window.addEventListener('resize', handleResize);

        // ScrollTrigger
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 85%",
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
        <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-12 text-center dynamic-text">
                Mis principales enfoques
            </h2>

            <div
                ref={containerRef}
                id="contenedor-gravedad"
                className="w-full h-[65vh] bg-secondary/5 rounded-[3.5rem] border border-border/10 overflow-hidden relative cursor-grab active:cursor-grabbing backdrop-blur-sm shadow-inner"
            >
                {/* Abstract Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[length:48px_48px]" />
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
                                transform: "translate(-50%, -1000px)",
                                width: skill.type === "circle" ? `${100 + skill.text.length * 4}px` : "auto",
                                height: skill.type === "circle" ? `${100 + skill.text.length * 4}px` : "64px",
                                padding: skill.type === "circle" ? "0" : "0 36px",
                                backgroundColor: COLORS[index % COLORS.length],
                                color: "white",
                                borderRadius: skill.type === "circle" ? "50%" : "9999px",
                                fontSize: skill.type === "circle" ? "14px" : "18px",
                                fontWeight: 600,
                                textAlign: "center",
                                whiteSpace: skill.type === "circle" ? "normal" : "nowrap",
                                userSelect: "none",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                willChange: "transform",
                                transition: "box-shadow 0.2s ease",
                            }}
                            className="font-heading hover:shadow-2xl hover:scale-105"
                        >
                            {skill.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsGravity;
