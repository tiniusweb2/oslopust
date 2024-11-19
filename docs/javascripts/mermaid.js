document.addEventListener("DOMContentLoaded", function() {
    import("https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs").then(
        (m) => {
            m.default.initialize({ 
                startOnLoad: true,
                theme: 'default',
                securityLevel: 'loose',
                flowchart: {
                    htmlLabels: true,
                    curve: 'basis'
                },
                gantt: {
                    titleTopMargin: 25,
                    barHeight: 20,
                    barGap: 4,
                    topPadding: 50,
                    leftPadding: 75,
                    gridLineStartPadding: 35,
                    fontSize: 11,
                    numberSectionStyles: 4
                }
            });
        }
    );
});
