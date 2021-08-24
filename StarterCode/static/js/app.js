// Reading Json file 

d3.json("../../../StarterCode/samples.json")
    .then((sampledata) => {
        console.log(sampledata);

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

    d3.json("../../../StarterCode/samples.json")
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
            marker: {color: "#4b5539"}
        };

        var data = [trace];
        // Setting layout for Bar chart.
        var layout = {
            title: {
                text:'Top 10 OTU IDS',
                font: {
                  family: 'Courier New, monospace',
                  size: 24,
                  color: "#252a1c"
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
                colorscale: "Earth",
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
                  color: "#252a1c"
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
    d3.json("../../../StarterCode/samples.json").then((sampledata) => {
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

    d3.json("../../../StarterCode/samples.json").then((sampledata) => {
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
                  color: "#252a1c"
                },
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [null, 9], tickwidth: 1, tickcolor: "#fcd58c" },
                    bar: { color: "#cde2a6" },
                    borderwidth: 2,
                    bordercolor: "#64714c",
                steps: [
                  { range: [0, 1], color: "#c7cfb8" },
                  { range: [1, 2], color: "#b6c1a3" },
                  { range: [2, 3], color: "#a6b38e" },
                  { range: [3, 4], color: "#95a478" },
                  { range: [4, 5], color: "#849564" },
                  { range: [5, 6], color: "#718056" },
                  { range: [6, 7], color: "#5e6a47" },
                  { range: [7, 8], color: "#4b5539" },
                  { range: [8, 9], color: "#38402b" }
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
                width: 500,
                height: 450,
                margin: { t:25, r: 25, l: 25, b: 25 },
                paper_bgcolor: "whitesmoke",
                font: { color: "#252a1c", family: "Courier New, monospace" }
            };

          // Plotting gauge chart. 
          Plotly.newPlot('gauge', data, layout);
    })
};
