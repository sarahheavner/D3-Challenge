//create function that will make svg area responsive to window size changes
function makeResponsive() {

    //set variable that selects svg area
    var svgArea = d3.select("body").select("svg");

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    if (!svgArea.empty()) {
        svgArea.remove();
      }

    
    //svg parameters
    var svgWidth = window.innerWidth - 200;
    var svgHeight = window.innerHeight;


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
        .domain([6, d3.max(healthData, d => d.poverty)])
        .range([0, chartWidth]);

        var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([chartHeight, 0]);

        //create axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        //append axes to chart
        chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

        chartGroup.append("g")
        .call(leftAxis);


        //create circles for scatter plot
        var circlesGroup = chartGroup.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "15")
            .attr("fill", "blue")
            .attr("opacity", ".5")
            .attr("class", "circles");

        //add state abbreviations to circles
        var textGroup = chartGroup.selectAll("text")
            .data(healthData)
            .enter()
            .append("text")
            .text(d => (d.abbr))
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("font-size", "10px")
            .style("font-weight", "bold")
            .attr("alignment-baseline", "central")
            .attr("class", "stateAbbr");

            


        //initialize tooltip
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([0, -60])
            .html(function(d) {
                return (`${d.state}<br>Poverty: ${d.poverty}%<br>Lacks Healthcare: ${d.healthcare}%`)
            });

        //create tooltip in chart
        chartGroup.call(toolTip);

        //create event listeners to display and hide the tooltip
        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
        })
        // on mouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);
            });



        //create axes labels
        chartGroup.append("text")
            .attr("transform","rotate(-90)")
            .attr("y", 0 - chartMargin.left)
            .attr("x", 0 - (chartHeight / 2) - 40)
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Lacks Healthcare %");

        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top - 20})`)
            .attr("class", "axisText")
            .text("In Poverty %");
    
    });
}

//call makeResponsize function when browser opens
makeResponsive();

//call makeResponsize function when broswer resized
d3.select(window).on("resize", makeResponsive);
