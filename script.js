const data = {
    name: "Terapias Avanzadas (ATMPs)",
    children: [
        {
            name: "Definición",
            children: [
                {name: "Medicamentos basados en genes, tejidos o células"},
                {name: "Uso humano"},
                {name: "Tratamientos innovadores"}
            ]
        },
        {
            name: "Clasificación",
            children: [
                {
                    name: "Terapia Génica",
                    children: [
                        {name: "Ácido nucleico recombinante"},
                        {name: "Regular, reparar, reemplazar o eliminar secuencia genética"},
                        {name: "Imagen: terapia_genica.jpg"}
                    ]
                },
                {
                    name: "Células Somáticas",
                    children: [
                        {name: "Células o tejidos manipulados"},
                        {name: "Alterar características biológicas"},
                        {name: "Imagen: celulas_somaticas.jpg"}
                    ]
                },
                {
                    name: "Ingeniería Tisular",
                    children: [
                        {name: "Células o tejidos modificados"},
                        {name: "Reparar, regenerar o reemplazar tejido"},
                        {name: "Imagen: ingenieria_tisular.jpg"}
                    ]
                },
                {
                    name: "ATMPs Combinados",
                    children: [
                        {name: "Incorporan dispositivos médicos"},
                        {name: "Parte integral del medicamento"}
                    ]
                }
            ]
        },
        {
            name: "Importancia y Potencial",
            children: [
                {name: "Tratamientos personalizados"},
                {name: "Potencial curativo"},
                {name: "Enfermedades complejas y raras"},
                {name: "Medicina regenerativa"}
            ]
        },
        {
            name: "Desafíos",
            children: [
                {name: "Altos costos de desarrollo"},
                {name: "Fabricación compleja"},
                {name: "Regulaciones específicas"},
                {name: "Seguridad a largo plazo"},
                {name: "Acceso y equidad"}
            ]
        },
        {
            name: "Áreas Terapéuticas",
            children: [
                {name: "Cáncer (hematológico y tumores sólidos)"},
                {name: "Enfermedades genéticas raras"},
                {name: "Trastornos neurodegenerativos"},
                {name: "Enfermedades autoinmunes"},
                {name: "Cardiovascular"}
            ]
        },
        {
            name: "Productos Aprobados",
            children: [
                {
                    name: "Kymriah (Terapia CAR-T)",
                    children: [
                        {name: "Leucemia linfoblástica aguda"},
                        {name: "Linfoma difuso de células B grandes"}
                    ]
                },
                {
                    name: "Luxturna (Terapia génica)",
                    children: [
                        {name: "Distrofia retiniana hereditaria"}
                    ]
                },
                {
                    name: "Zolgensma (Terapia génica)",
                    children: [
                        {name: "Atrofia muscular espinal"}
                    ]
                },
                {
                    name: "Alofisel (Terapia celular)",
                    children: [
                        {name: "Fístulas perianales complejas"}
                    ]
                }
            ]
        },
        {
            name: "Aspectos Regulatorios",
            children: [
                {
                    name: "EMA (Europa)",
                    children: [
                        {name: "Regulación 1394/2007"},
                        {name: "Comité de Terapias Avanzadas (CAT)"}
                    ]
                },
                {
                    name: "FDA (EE.UU.)",
                    children: [
                        {name: "Centro de Evaluación e Investigación Biológica (CBER)"},
                        {name: "Designación de Terapia Regenerativa Avanzada (RMAT)"}
                    ]
                },
                {
                    name: "PMDA (Japón)",
                    children: [
                        {name: "Ley de Productos Farmacéuticos y Dispositivos Médicos"},
                        {name: "Aprobación condicional y por tiempo limitado"}
                    ]
                }
            ]
        },
        {
            name: "Futuro y Tendencias",
            children: [
                {name: "Edición genómica (CRISPR-Cas9)"},
                {name: "Medicina personalizada"},
                {name: "Reducción de costos"},
                {name: "Expansión a nuevas áreas terapéuticas"},
                {name: "Combinación con otras tecnologías (IA, nanotecnología)"}
            ]
        }
    ]
};

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select("#mindmap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

const tree = d3.tree()
    .size([2 * Math.PI, Math.min(width, height) / 2 - 100]);

const root = tree(d3.hierarchy(data));

const link = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
    .classed("main-node", d => d.depth === 0);

node.append("circle")
    .attr("r", 5);

node.append("text")
    .attr("dy", ".31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
    .text(d => d.data.name)
    .clone(true).lower()
    .attr("stroke", "white");

// Zoom functionality
const zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .on("zoom", zoomed);

svg.call(zoom);

function zoomed(event) {
    g.attr("transform", event.transform);
}
