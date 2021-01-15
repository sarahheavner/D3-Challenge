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

//select id=scatter, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);


// Append a group area, shift svg area by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)


//load data from csv file
d3.csv("assets/data/data.csv").then(function(healthData) {

    //print data in console
    console.log(healthData);

    //convert all numerical data in csv file from string to integer
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

    //create scale functions
    var xLinearScale = d3.scaleLinear()
    .domain([20, d3.max(healthData, d => d.poverty)])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare)])
    .range([chartHeight, 0]);

    //create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append axes to chart
    

});

