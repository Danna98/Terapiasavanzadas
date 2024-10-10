const data = {
    name: "Terapias Avanzadas (ATMPs)",
    children: [
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
            name: "Características",
            children: [
                {name: "Tratamientos personalizados"},
                {name: "Potencial para enfermedades intratables"},
                {name: "Fabricación compleja y especializada"}
            ]
        },
        {
            name: "Aplicaciones Clínicas",
            children: [
                {name: "Cánceres hematológicos"},
                {name: "Enfermedades genéticas raras"},
                {name: "Trastornos neurodegenerativos"},
                {name: "Enfermedades cardiovasculares"}
            ]
        },
        {
            name: "Desafíos",
            children: [
                {name: "Altos costos de desarrollo"},
                {name: "Complejidad en fabricación"},
                {name: "Regulaciones específicas"},
                {name: "Seguimiento a largo plazo"}
            ]
        },
        {
            name: "Aspectos Regulatorios",
            children: [
                {name: "EMA: Regulación 1394/2007"},
                {name: "FDA: CBER, designación RMAT"},
                {name: "PMDA: Aprobación condicional"}
            ]
        }
    ]
};

const margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 1600 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

const svg = d3.select("#mindmap").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const i = 0,
    duration = 750,
    root;

const treemap = d3.tree().size([height, width]);

root = d3.hierarchy(data, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

update(root);

function update(source) {
    const treeData = treemap(root);
    const nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    nodes.forEach(function(d){ d.y = d.depth * 180});

    const node = svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++i); });

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        });

    nodeEnter.append('rect')
        .attr('class', 'node')
        .attr('width', function(d) { return d.data.name.length * 7; })
        .attr('height', 20)
        .attr('y', -10);

    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.name; });

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")";
        });

    nodeUpdate.select('rect.node')
        .attr('width', function(d) { return d.data.name.length * 7; })
        .attr('height', 20)
        .attr('y', -10);

    const nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    const link = svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

    const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
            const o = {x: source.x0, y: source.y0}
            return diagonal(o, o)
        });

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
            const o = {x: source.x, y: source.y}
            return diagonal(o, o)
        })
        .remove();

    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });

    function diagonal(s, d) {
        return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
    }
}
