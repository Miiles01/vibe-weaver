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
        engine.gravity.y = 1.2;

        // Helper to get dimensions
        const getPadding = () => (window.innerWidth < 768 ? 20 : 40);
        const getTagHeight = () => (window.innerWidth < 768 ? 48 : 64);

        const getDimensions = () => ({
            width: containerRef.current?.offsetWidth || 0,
            height: containerRef.current?.offsetHeight || 0
        });

        let { width, height } = getDimensions();

        const THICKNESS = 1000;
        const PADDING = getPadding();
        const TAG_H = getTagHeight();

        // Inset ground and walls so tags never hit the actual container edge (clipping zone)
        const ground = Matter.Bodies.rectangle(
            width / 2,
            height - (TAG_H / 2) - PADDING + THICKNESS / 2,
            width * 4,
            THICKNESS,
            { isStatic: true }
        );
        const wallLeft = Matter.Bodies.rectangle(
            -THICKNESS / 2 + PADDING,
            height / 2,
            THICKNESS,
            height * 4,
            { isStatic: true }
        );
        const wallRight = Matter.Bodies.rectangle(
            width + THICKNESS / 2 - PADDING,
            height / 2,
            THICKNESS,
            height * 4,
            { isStatic: true }
        );
        const ceiling = Matter.Bodies.rectangle(
            width / 2,
            -2000,
            width * 4,
            THICKNESS,
            { isStatic: true }
        );

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // Create Skill Bodies
        const skillBodies = SKILLS.map((skill, index) => {
            const isMobile = window.innerWidth < 768;
            const textWidth = skill.length * (isMobile ? 12 : 14) + (isMobile ? 40 : 60);
            const textHeight = TAG_H;

            const x = (width * 0.2) + (Math.random() * (width * 0.6));
            const y = -200 - (index * 100);

            const body = Matter.Bodies.rectangle(x, y, textWidth, textHeight, {
                restitution: 0.5,
                friction: 0.1,
                chamfer: { radius: textHeight / 2 }
            });

            return { body, id: index, w: textWidth, h: textHeight };
        });

        Matter.World.add(world, skillBodies.map(b => b.body));

        // Mouse control
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.15,
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        const runner = Matter.Runner.create();
        runnerRef.current = runner;

        // Animation loop (direct DOM)
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

        // Responsive Logic
        const handleResize = () => {
            if (!containerRef.current) return;
            const newDim = getDimensions();
            const newPadding = getPadding();
            const newTagH = getTagHeight();

            Matter.Body.setPosition(ground, {
                x: newDim.width / 2,
                y: newDim.height - (newTagH / 2) - newPadding + THICKNESS / 2
            });
            Matter.Body.setPosition(wallLeft, {
                x: -THICKNESS / 2 + newPadding,
                y: newDim.height / 2
            });
            Matter.Body.setPosition(wallRight, {
                x: newDim.width + THICKNESS / 2 - newPadding,
                y: newDim.height / 2
            });
        };

        window.addEventListener('resize', handleResize);

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
        <div className="mb-40 pt-20">
            <h2 className="text-4xl md:text-5xl font-heading font-medium mb-16 text-center dynamic-text tracking-tight">
                Mis principales enfoques
            </h2>

            <div
                ref={containerRef}
                id="contenedor-gravedad"
                className="w-full h-[60vh] md:h-[70vh] bg-secondary/5 rounded-[4rem] border border-border/10 overflow-hidden relative cursor-grab active:cursor-grabbing shadow-inner"
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:40px_40px]" />
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
                                padding: "0 32px",
                                backgroundColor: "#154FD1",
                                color: "white",
                                borderRadius: "9999px",
                                fontSize: window.innerWidth < 768 ? "16px" : "20px",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                userSelect: "none",
                                boxShadow: "0 10px 30px rgba(21, 79, 209, 0.2)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: window.innerWidth < 768 ? "48px" : "64px",
                                willChange: "transform",
                            }}
                            className="font-heading hover:scale-105 transition-transform"
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
