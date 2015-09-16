/**
 * Created by bpender on 9/14/2015.
 */

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(30);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-25, 0])
    .html(function(d) {
        return "<strong>Item: </strong> <span>" + d.name + "</span><br>" +
               "<strong>Total Votes: </strong> <span>" + d.votes + "</span><br>";
    });

svg.call(tip);

d3.csv("data/data.csv", function(error, data) {
    if (error) throw error;

    x.domain(data.map(function(d) { return d.id; }));
    y.domain([0, d3.max(data, function(d) { return d.votes; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 30)
        .attr('dx', ".71em")
        .attr('y', 15)
        .style("text-anchor", "end")
        .text("Item Number");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "right")
        .text("Votes");

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function(d, i) { return d.soldInStore === 'true' ? 'sold-in-store' : 'not-sold-in-store' })
        .attr("x", function(d) { return x(d.id); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.votes); })
        .attr("height", function(d) { return height - y(d.votes); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var legend = svg.selectAll('.legend')
        .data(['Sold in Store', 'Not Sold in Store'])
        .enter().append('g')
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("class", function(d, i) { return i % 2 === 0 ? 'sold-in-store': 'not-sold-in-store'});

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

});


//if(d.soldInStore) {
//    return color[0];
//} else {
//    return color[1];
//}









