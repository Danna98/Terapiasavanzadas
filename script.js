const data = {
    name: "Terapias Avanzadas (ATMPs)",
    children: [
        {
            name: "Definición y Características",
            children: [
                {name: "Medicamentos basados en genes, tejidos o células"},
                {name: "Tratamientos altamente personalizados"},
                {name: "Potencial para enfermedades intratables"},
                {name: "Fabricación compleja y especializada"}
            ]
        },
        {
            name: "Clasificación",
            children: [
                {
                    name: "Terapia Génica (GTMPs)",
                    children: [
                        {name: "Ácido nucleico recombinante"},
                        {name: "Vectores virales y no virales"},
                        {name: "Ejemplo: Luxturna, Zolgensma"}
                    ]
                },
                {
                    name: "Terapia Celular Somática (CTMPs)",
                    children: [
                        {name: "Células manipuladas"},
                        {name: "Autólogas o alogénicas"},
                        {name: "Ejemplo: Alofisel, Provenge"}
                    ]
                },
                {
                    name: "Ingeniería Tisular (TEPs)",
                    children: [
                        {name: "Células o tejidos modificados"},
                        {name: "Regeneración de tejidos"},
                        {name: "Ejemplo: Holoclar, Spherox"}
                    ]
                },
                {
                    name: "ATMPs Combinados",
                    children: [
                        {name: "Incorporan dispositivos médicos"},
                        {name: "Ejemplo: Matrices con células"}
                    ]
                }
            ]
        },
        {
            name: "Aplicaciones Clínicas",
            children: [
                {name: "Cánceres hematológicos"},
                {name: "Enfermedades genéticas raras"},
                {name: "Trastornos neurodegenerativos"},
                {name: "Enfermedades cardiovasculares"},
                {name: "Lesiones de tejidos y órganos"}
            ]
        },
        {
            name: "Desafíos",
            children: [
                {name: "Altos costos de desarrollo"},
                {name: "Complejidad en fabricación"},
                {name: "Regulaciones específicas"},
                {name: "Seguimiento a largo plazo"},
                {name: "Acceso y equidad"}
            ]
        },
        {
            name: "Aspectos Regulatorios",
            children: [
                {name: "EMA: Regulación 1394/2007"},
                {name: "FDA: CBER, designación RMAT"},
                {name: "PMDA: Aprobación condicional"}
            ]
        },
        {
            name: "Futuro y Tendencias",
            children: [
                {name: "Edición genómica (CRISPR-Cas9)"},
                {name: "Combinación con IA y nanotecnología"},
                {name: "Expansión a nuevas áreas terapéuticas"},
                {name: "Reducción de costos de producción"}
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
    .size([2 * Math.PI, Math.min(width, height) / 2 - 100])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

const root = tree(d3.hierarchy(data));

const link = g.selectAll(".link")
    .data(root.links())
    .join("path")
    .attr("class", "link")
    .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

const node = g.selectAll(".node")
    .data(root.descendants())
    .join("g")
    .attr("class", d => "node" + (d.children ? " node--internal" : " node--leaf"))
    .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
    .attr("data-depth", d => d.depth);

node.append("circle")
    .attr("r", 4);

node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
    .text(d => d.data.name)
    .clone(true).lower()
    .attr("stroke", "white");

const zoom = d3.zoom()
    .scaleExtent([0.5, 5])
    .on("zoom", zoomed);

svg.call(zoom);

function zoomed(event) {
    g.attr("transform", event.transform);
}
