//set svg params
var svgWidth = 960;
var svgHeight = 500;


//define chart's margins
var chartMargin = {
    top: 75,
    bottom: 75,
    right: 50,
    left: 50
};

//define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//select id=scatter, append SVG area to it, and set the dimensions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


//append a group area, shift svg area by left and top margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

    
// set initial axis params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";


// function used for updating x and y-scale var upon click on axis label
function xScale(healthData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthData, d => d[chosenXAxis]),
         d3.max(healthData, d => d[chosenXAxis])
      ])
      .range([0, chartWidth]);
  
    return xLinearScale;
}

function yScale(healthData, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d[chosenYAxis]),
           d3.max(healthData, d => d[chosenYAxis])
        ])
        .range([0, chartHeight]);
    
    return yLinearScale;
}

// function used for updating x and y-Axis var upon click on axis label
function renderXAxis(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
} 

function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
}

// function used for updating circles group with a transition to new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
}

// function to update text within circles
function renderStateText(circlesAbbrGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesAbbrGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]));
  
    return circlesAbbrGroup;
} 

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    var xlabel;
    var ylabel;

    //conditionals for x axis
    if (chosenXAxis === "poverty") {
        xlabel = "Poverty (%): ";
    }
    else if (chosenXAxis === "age") {
        xlabel = "Age (Median): ";
    }
    else {
        xlabel = "Household Income (Median): ";
    }

    //conditionals for y axis
    if (chosenYAxis === "healthcare") {
        ylabel = "Lacks Healthcare (%):";
    }
    else if (chosenYAxis === "smokes") {
        ylabel = "Smokes (%):";
    }
    else {
        ylabel = "Obesity (%):";
    }

    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.state}<br>${xlabel} ${d[chosenXAxis]}<br>${ylabel} ${d[chosenYAxis]}`);
    });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    return circlesGroup;
}

//load data from csv file
d3.csv("assets/data/data.csv").then(function(healthData) {

    //print data in console
    console.log(healthData);

    //convert all numerical data in csv file from string to integer
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
        data.smokes = +data.smokes;
        });
    





});
  
