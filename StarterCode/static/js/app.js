// Reading Json file 

d3.json("samples.json")
.then((sampledata) => {
    // console.log(sampledata)
    var dropdown = d3.select("#selDataset")
    sampledata.names.forEach((sampleID) => {
    dropdown.append("option").text(sampleID).property("value",sampleID)    
    })
    buildChart(sampledata.names[0])
})

function optionChanged(selected){
    // console.log(selected)
    buildChart(selected)
}

function buildChart(selected) {

    d3.json("samples.json")
    .then((sampledata) => {
    var filterData = sampledata.samples.filter(obj => obj.id == selected)
    console.log(filterData)
    // console.log(sampledata)
    var ids = sampledata.samples[0].otu_ids;
    // console.log(ids)
    var sampleValues = sampledata.samples[0].sample_values;
    // console.log(sampleValues)
    var labels = sampledata.samples[0].otu_labels;
    // console.log(labels)
    var OTU_id = sampledata.samples[0].otu_ids;
    // console.log(OTU_id)
    var data = [{
        x : sampleValues.slice(0,10).reverse(),
        y : OTU_id.map(s => "OTU " +s).slice(0,10).reverse(),
        text : labels.slice(0,10).reverse(),
        type : "bar",
        orientation : "h"
    }]
    var layout = {
        title: `Top 10 OTU IDS`,
        
      };
  
      Plotly.newPlot("bar", data, layout);
      var filterMetaData = sampledata.metadata.filter(obj => obj.id == selected)
      console.log(filterMetaData)
})
}


