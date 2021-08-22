// Reading Json file 

d3.json("samples.json")
    .then((sampledata) => {
        // console.log(sampledata)
        var dropdown = d3.select("#selDataset")
        // console.log(dropdown)
        sampledata.names.forEach((sampleID) => {
        dropdown.append("option").text(sampleID).property("value",sampleID)    
    });
    
});

function optionChanged(selected){
    // console.log(selected)
    buildChart(selected)
}

function buildChart(selected) {

    d3.json("samples.json")
    .then((sampledata) => {
      
        var filterData = sampledata.samples.filter(obj => obj.id == selected)
        // console.log(filterData)
        var ids = sampledata.samples[0].otu_ids;
        // console.log(ids)
        var sampleValues = sampledata.samples[0].sample_values;
        // console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels;
        // console.log(labels)
        var OTU_id = sampledata.samples[0].otu_ids;
        // console.log(OTU_id)
        var trace = {
            x : sampleValues.slice(0,10).reverse(),
            y : OTU_id.map(s => "OTU " +s).slice(0,10).reverse(),
            text : labels.slice(0,10).reverse(),
            type : "bar",
            orientation : "h",
            marker: {color: "Red"}
        };

        var data = [trace];

        var layout = {
            title: "Top 10 OTU IDS",
            margin: { t: 35, l: 160},
            height: 600,
        };
    
        Plotly.newPlot("bar", data, layout);

        var trace1 = {
            x : sampleValues,
            y : OTU_id,
            mode : "markers",
            marker: {
                size: sampleValues,
                color: sampleValues,
                opacity: [1, 0.8, 0.6, 0.4],
                colorscale: "Portland"
            },
            text: labels 
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Clusters Of Bacteria Per Sample",
            xaxis: { title: "OTU ID"},
            height: 700,
            width: 1300
        };
    
        Plotly.newPlot("bubble", data1, layout1);  
        

        //   var filterMetaData = sampledata.metadata.filter(obj => obj.id == selected)
        //   console.log(filterMetaData)


    });
};
 
buildChart();

function demoData(sample) {

    d3.json("samples.json").then((sampledata) => {
        var metaData = sampledata.metaData
        .filter(sampleMetaData => sampleMetaData.id == sample);

        var metaDataDemo = metaData[0];

        var demo = d3.select("sample=metadata");

        // Clear Demographic panel before reloading.
        demo.html("");

        Object.entries(metaDataDemo).forEach(([key, value]) => {
            demo.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
        
    });
};    

demoData();

function washGauge(sample) {

    d3.json("samples.json").then((sampledata) => {
        var metaData = sampledata.metaData
        .filter(sampleMetaData => sampleMetaData.id == sample);

        var metaDataWash = metaData[0];
        
        var washFreq = metaDataWash.wfreq;

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washFreq,
              title: { text: "Belly Button Washing Frequency Per Week" },
              type: "indicator",
              mode: "gauge+number+delta",
              delta: { reference: 380 },
              gauge: {
                axis: { range: [null, 9] },
                steps: [
                  { range: [0, 4], color: "Red" },
                  { range: [4, 5], color: "Orange" },
                  { range: [5, 9], color: "Green" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

          Plotly.newPlot('gauge', data, layout);
    })
};

washGauge();