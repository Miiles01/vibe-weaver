import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const SKILLS = [
    "Estrategia de Ventas", "Funnels de IA", "Automatización CRM",
    "Lead Generation", "Revenue Ops", "Branding con IA",
    "Creación de Identidad de Marca", "Innovación Creativa",
    "Soluciones de IA", "Agentes Autónomos", "Workflows Zapier/Make",
    "Copywriting", "Prompt Engineering", "Escalamiento GTM", "Vibe Coding"
];

const SkillsGravity = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine>(Matter.Engine.create());
    const [bodies, setBodies] = useState<{ body: Matter.Body; text: string; id: number }[]>([]);

    useEffect(() => {
        if (!sceneRef.current || !containerRef.current) return;

        const engine = engineRef.current;
        const { world } = engine;

        // Configure Gravity
        engine.gravity.y = 0.8;

        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;

        // Boundaries
        const ground = Matter.Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true });

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // Create Skill Bodies
        const newBodies = SKILLS.map((skill, index) => {
            // Approximate width based on text length
            const textWidth = skill.length * 10 + 40;
            const x = Math.random() * (width - textWidth) + textWidth / 2;
            const y = Math.random() * -500; // Start above

            const body = Matter.Bodies.rectangle(x, y, textWidth, 40, {
                restitution: 0.6,
                friction: 0.1,
                chamfer: { radius: 20 }, // Rounded corners
            });

            return { body, text: skill, id: index };
        });

        setBodies(newBodies);
        Matter.World.add(world, newBodies.map(b => b.body));

        // Mouse interaction
        const mouse = Matter.Mouse.create(sceneRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        // Runner
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Animation Loop for React state
        let request: number;
        const update = () => {
            // Force React to re-render to update positions
            setBodies(prev => [...prev]);
            request = requestAnimationFrame(update);
        };
        update();

        return () => {
            cancelAnimationFrame(request);
            Matter.Runner.stop(runner);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id="contenedor-gravedad"
            className="w-full h-[60vh] bg-secondary/30 rounded-3xl border border-border/40 overflow-hidden relative mb-24 cursor-grab active:cursor-grabbing"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
            </div>

            <div ref={sceneRef} className="absolute inset-0">
                {bodies.map((b) => (
                    <div
                        key={b.id}
                        style={{
                            position: "absolute",
                            left: b.body.position.x,
                            top: b.body.position.y,
                            transform: `translate(-50%, -50%) rotate(${b.body.angle}rad)`,
                            padding: "10px 20px",
                            backgroundColor: "#154FD1", // Using brand blue
                            color: "white",
                            borderRadius: "9999px",
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {b.text}
                    </div>
                ))}
            </div>

            {/* Section Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-black/20">Interactúa con mis habilidades</span>
            </div>
        </div >
    );
};

export default SkillsGravity;
