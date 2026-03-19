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
        engine.gravity.y = 1.3; // Responsive gravity

        const getDimensions = () => ({
            width: containerRef.current?.offsetWidth || 0,
            height: containerRef.current?.offsetHeight || 0
        });

        let { width, height } = getDimensions();

        // Thicker boundaries to prevent escaping
        const THICKNESS = 1000;
        const INSET = 40; // Inset boundaries to prevent tag clipping

        const ground = Matter.Bodies.rectangle(width / 2, height + THICKNESS / 2 - INSET, width * 3, THICKNESS, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-THICKNESS / 2 + INSET, height / 2, THICKNESS, height * 3, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + THICKNESS / 2 - INSET, height / 2, THICKNESS, height * 3, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -1500, width * 3, THICKNESS, { isStatic: true });

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // Create Skill Bodies
        const skillBodies = SKILLS.map((skill, index) => {
            const textWidth = skill.length * 10 + 50;
            const textHeight = 48;

            const x = (width * 0.2) + (Math.random() * (width * 0.6));
            const y = -200 - (index * 60);

            const body = Matter.Bodies.rectangle(x, y, textWidth, textHeight, {
                restitution: 0.6,
                friction: 0.1,
                chamfer: { radius: textHeight / 2 },
            });

            return { body, id: index };
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

        // Responsive logic
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
            {/* New Title Section */}
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-12 text-center dynamic-text">
                Mis principales enfoques
            </h2>

            <div
                ref={containerRef}
                id="contenedor-gravedad"
                className="w-full h-[60vh] bg-secondary/5 rounded-[3rem] border border-border/10 overflow-hidden relative cursor-grab active:cursor-grabbing"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:32px_32px]" />
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
                                padding: "12px 24px",
                                backgroundColor: "#154FD1", // Blue tags for white background
                                color: "white",
                                borderRadius: "9999px",
                                fontSize: "14px",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                                userSelect: "none",
                                boxShadow: "0 4px 12px rgba(21, 79, 209, 0.15)",
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
            </div>
        </div>
    );
};

export default SkillsGravity;
