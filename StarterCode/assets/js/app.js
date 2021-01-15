//define SVG area
var svgWidth = 600;
var svgHeight = 400;

//define chart's margins
var chartMargin = {
    top: 30,
    bottom: 30,
    right: 30,
    left: 30
};

//define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.right - chartMargin.left;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);




//load data from csv file
d3.csv("assets/data/data.csv").then(function(healthData) {

    //print data in console
    console.log(healthData);

    //convert all numerical data from string to integer
    healthData.forEach(function(data) {
        data.id = +data.id;
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
    });

});

