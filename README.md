# Plotly-Homework
## Belly Button Bio Diversity

### Reading Samples Files:

1.  Read sample.json file and then set the sample names ID for the dropdown menu.
2.  Set first sample name ID as the default for the functions to load default graphs and page. 
3.  Creating fucntion to change the page after different entry is selected. 

### Creating Buildchart function:

1.  Reading sample.json file and selecting ID of sample of Dataset.
2.  Filter data for the first entry of the dataset.
3.  Setting variables for the data required for plotting.
4.  Setting trace and slicing the data for the first 10 data points and setting them in reverse. 
5.  Creating layout and plotting a Bar plot.
6.  Using the same variable create bubble graph for all the Clusters of Bacteria per sample.
7.  Plot Bubble graph. 

### Creating function for Demographic info:

1.  Reading sample.json file and filtering Metadata to get the ID for the selected sample.
2.  Selecting HTML id for the demographic data to be appended to.
3.  Setting data box to empty for the data to be cleared before it could be loaded. 
4.  Itterate all the metadata enteries for each row into the demo box. 

### Creatig Wash Gauge Function :

1.  Read sample.json file and create variable to get the required for wash frequencies of the selected ID.
2.  Set data and layout for the gauge chart.
3. Plot gauge chart.

### Calling functions:

    All the function are called when any ID is selected. 
