// Reading Json file 

d3.json("samples.json")
    .then((sampledata) => {
        // console.log(sampledata)

        // Selecting HTML ID for dropdown variable.
        var dropdown = d3.select("#selDataset")
        // console.log(dropdown)

        // Selcting ID from the names of the sample data.
        // Setting loop for each ID to be appended in to dropdown. 
        sampledata.names.forEach((sampleID) => {
        dropdown.append("option").text(sampleID).property("value",sampleID)

    });
    // Selecting first ID from the names of sample data.
    var selected = sampledata.names[0]
    // Building default charts when page loads.
    buildChart(selected)
    demoData(selected)
    washGauge(selected)
});

// Function to make graphs and set data when different ID is selected. 
function optionChanged(selected){
    // console.log(selected)
    buildChart(selected)
    demoData(selected)
    washGauge(selected)
};

// Function to make bar chart and bubble chart.
function buildChart(selected) {

    d3.json("samples.json")
    .then((sampledata) => {
        // Setting variable for the sample ID.
        var filterData = sampledata.samples.filter(obj => obj.id == selected)
        // console.log(filterData)

        var result = filterData[0]
        // Getting sample values in data to be plotted into bar chart.
        var sampleValues = result.sample_values;
        
        // Getting otu labels for bar chart.
        var labels = result.otu_labels;

        // Getting OUT ids.
        var OTU_id = result.otu_ids;

        // Setting trace for Bar chart.
        var trace = {
            // Slicing the data to get the top 10 observations and 
            // setting  them in reverse.
            x : sampleValues.slice(0,10).reverse(),
            y : OTU_id.map(s => "OTU " +s).slice(0,10).reverse(),
            text : labels.slice(0,10).reverse(),
            type : "bar",
            orientation : "h",
            marker: {color: "#d65100"}
        };

        var data = [trace];
        // Setting layout for Bar chart.
        var layout = {
            title: {
                text:'Top 10 OTU IDS',
                font: {
                  family: 'Courier New, monospace',
                  size: 24,
                  color: "#d65100"
                },    
            height: 500,
            },
            paper_bgcolor: 'rgba(245,246,249,1)',
            plot_bgcolor: 'rgba(245,246,249,1)',
            margin: {l: 140}
        };  

        // Plottig bar chart.
        Plotly.newPlot("bar", data, layout);

        // Setting trace for bubble chart.
        var trace1 = {
            x : OTU_id,
            y : sampleValues,
            mode : "markers",
            marker: {
                size: sampleValues,
                color: OTU_id,
                colorscale: "YlOrRd",
                type: "heatmap"
            },
            text: labels 
        };

        var data1 = [trace1];

        // Setting layout for bubble chart.
        var layout1 = {
            title: {
                text:'Clusters Of Bacteria Per Sample',
                font: {
                  family: 'Courier New, monospace',
                  size: 24,
                  color: "#d65100"
                },
              },  
            xaxis: { title: "OTU ID"},
            hovermode: "closest",
            height: 600,
            width: 1300
        };
        
        // Plotting bubble chart.
        Plotly.newPlot("bubble", data1, layout1);  

    });
};
 

// Creating function for Demographic data.
function demoData(selected) {

    // Getting metadata ID from sample data.
    d3.json("samples.json").then((sampledata) => {
        console.log(sampledata);
        var metaData = sampledata.metadata.filter(sampleMetaData => sampleMetaData.id == selected);

        // Getting first value of the Metadata.
        var metaDataDemo = metaData[0];

        // Selecting HTML ID for demographic data to be inserted.
        var demo = d3.select("#sample-metadata");

        // Clear Demographic panel before reloading.
        demo.html("");

        // Appending demographic data to demo box.
        Object.entries(metaDataDemo).forEach(([key, value]) => {
            demo.append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
        
    });
};    


// Creating function for Wash Gauge.
function washGauge(selected) {

    d3.json("samples.json").then((sampledata) => {
        var metaData = sampledata.metadata.filter(sampleMetaData => sampleMetaData.id == selected);
        
        // Getting first value in metadata.
        var metaDataWash = metaData[0];
        
        // Getting first wash frequency value in matadata.
        var washFreq = metaDataWash.wfreq;

        // Setting data for gauge bar
        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washFreq,
              title: {
                text:'Belly Button Washing Frequency<br>Scrubs Per Week',
                font: {
                  family: 'Courier New, monospace',
                  size: 24,
                  color: "#d65100"
                },
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "#fcd58c" },
                    bar: { color: "#f9df8f" },
                    borderwidth: 2,
                    bordercolor: "#f64f19",
                steps: [
                  { range: [0, 1], color: "#ffb689" },
                  { range: [1, 2], color: "#ffa066" },
                  { range: [2, 3], color: "#ff8a42" },
                  { range: [3, 4], color: "#ff741e" },
                  { range: [4, 5], color: "#f95f00" },
                  { range: [5, 6], color: "#d65100" },
                  { range: [6, 7], color: "#b24400" },
                  { range: [7, 8], color: "#8e3600" },
                  { range: [8, 9], color: "#6b2800" }
                ],
                threshold: {
                  line: { color: "#f4bd17", width: 4 },
                  thickness: 0.75,
                  value: 9
                }
              }
            }
          ];
          
          // Setting layout for Gauge chart.
          var layout = {
                width: 450,
                height: 450,
                margin: { t:25, r: 25, l: 25, b: 25 },
                paper_bgcolor: "whitesmoke",
                font: { color: "#cc4e00", family: "Arial" }
            };

          // Plotting gauge chart. 
          Plotly.newPlot('gauge', data, layout);
    })
};
