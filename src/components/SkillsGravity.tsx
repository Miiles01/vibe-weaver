import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    "Ventas", "Marketing", "Customer Experience",
    "Funnels", "CRM", "Vibe Coding", "Branding",
    "Automatización con IA"
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
        engine.gravity.y = 1.1;

        const getDimensions = () => ({
            width: containerRef.current?.offsetWidth || 0,
            height: containerRef.current?.offsetHeight || 0
        });

        let { width, height } = getDimensions();

        // 1. "Safe Zone" Boundary Calculation
        // This ensures the tags NEVER touch the actual overflow-hidden container edge.
        const THICKNESS = 1000;
        const DESKTOP_TAG_H = 64;
        const MOBILE_TAG_H = 48;
        const SAFE_PADDING = window.innerWidth < 768 ? 20 : 50;

        const currentTagH = window.innerWidth < 768 ? MOBILE_TAG_H : DESKTOP_TAG_H;

        // Ground is inset by half the tag height + safe padding
        const groundY = height - (currentTagH / 2) - SAFE_PADDING;
        const wallInset = SAFE_PADDING + 40; // Extra inset for walls

        const ground = Matter.Bodies.rectangle(width / 2, groundY + THICKNESS / 2, width * 10, THICKNESS, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-THICKNESS / 2 + wallInset, height / 2, THICKNESS, height * 10, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + THICKNESS / 2 - wallInset, height / 2, THICKNESS, height * 10, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -2000, width * 10, THICKNESS, { isStatic: true });

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // 2. Create Skill Bodies (Standardized Rectangles Only)
        const skillBodies = SKILLS.map((skill, index) => {
            const isMobile = window.innerWidth < 768;
            const fontSize = isMobile ? 18 : 22;
            const horizontalPadding = isMobile ? 40 : 64;
            const textWidth = skill.length * (fontSize * 0.6) + horizontalPadding;
            const textHeight = currentTagH;

            const x = (width * 0.2) + (Math.random() * (width * 0.6));
            const y = -200 - (index * 120);

            const body = Matter.Bodies.rectangle(x, y, textWidth, textHeight, {
                restitution: 0.5,
                friction: 0.1,
                density: 0.001,
                chamfer: { radius: textHeight / 2 }
            });

            return { body, id: index, w: textWidth, h: textHeight };
        });

        Matter.World.add(world, skillBodies.map(b => b.body));

        // 3. Mouse Interaction (Tuned for snappiness)
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2, // Faster response
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        const runner = Matter.Runner.create();
        runnerRef.current = runner;

        // 4. Performance: Matter-Native Synchronization
        // Using "afterUpdate" event to ensure DOM updates are synced with the physics simulation precisely
        const updateDOM = () => {
            skillBodies.forEach((item, index) => {
                const domElement = itemRefs.current[index];
                if (domElement) {
                    const { x, y } = item.body.position;
                    const angle = item.body.angle;
                    // Using individual values for better rendering stability
                    domElement.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
                }
            });
        };

        Matter.Events.on(engine, 'afterUpdate', updateDOM);

        // 5. Responsive Maintenance
        const handleResize = () => {
            if (!containerRef.current) return;
            const newDim = getDimensions();
            const tagH = window.innerWidth < 768 ? MOBILE_TAG_H : DESKTOP_TAG_H;
            const pad = window.innerWidth < 768 ? 20 : 50;
            const winset = pad + 40;

            Matter.Body.setPosition(ground, { x: newDim.width / 2, y: newDim.height - (tagH / 2) - pad + THICKNESS / 2 });
            Matter.Body.setPosition(wallLeft, { x: -THICKNESS / 2 + winset, y: newDim.height / 2 });
            Matter.Body.setPosition(wallRight, { x: newDim.width + THICKNESS / 2 - winset, y: newDim.height / 2 });
        };

        window.addEventListener('resize', handleResize);

        // 6. ScrollTrigger Integration
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 85%",
            onEnter: () => {
                Matter.Runner.run(runner, engine);
            },
            once: true
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            Matter.Events.off(engine, 'afterUpdate', updateDOM);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div className="mb-48 pt-32 px-4 md:px-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-20 text-center dynamic-text tracking-tighter leading-none">
                Mis principales enfoques
            </h2>

            <div
                ref={containerRef}
                id="contenedor-gravedad"
                style={{ borderRadius: "50px" }}
                className="w-full h-[60vh] md:h-[75vh] bg-secondary/5 border border-border/10 overflow-hidden relative cursor-grab active:cursor-grabbing shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]"
            >
                {/* Visual Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:40px_40px]" />
                </div>

                <div className="absolute inset-0 pointer-events-none">
                    {SKILLS.map((skill, index) => (
                        <div
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                // Hidden state start
                                transform: "translate(-50%, -1000px)",
                                padding: "0 40px",
                                backgroundColor: "#154FD1",
                                color: "white",
                                borderRadius: "9999px",
                                fontSize: window.innerWidth < 768 ? "18px" : "22px",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                userSelect: "none",
                                boxShadow: "0 15px 45px rgba(21, 79, 209, 0.25)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: window.innerWidth < 768 ? "48px" : "64px",
                                willChange: "transform",
                                pointerEvents: "auto", // Re-enable for interaction
                            }}
                            className="font-heading hover:scale-105 transition-transform cursor-grab active:cursor-grabbing"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsGravity;
