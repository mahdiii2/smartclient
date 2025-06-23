// Suppose you have an array of plain Javascript hashes,
// representing sales of certain products in certain regions

var chartData = [
    {fuel:"Gas", region: "West",  product: "Cars", sales: 37},
    {fuel:"Gas", region: "North", product: "Cars", sales: 29},
    {fuel:"Gas", region: "East",  product: "Cars", sales: 80},
    {fuel:"Gas", region: "South", product: "Cars", sales: 87},

    {fuel:"Gas", region: "West",  product: "Trucks", sales: 23},
    {fuel:"Gas", region: "North", product: "Trucks", sales: 45},
    {fuel:"Gas", region: "East",  product: "Trucks", sales: 32},
    {fuel:"Gas", region: "South", product: "Trucks", sales: 67},

    {fuel:"Gas", region: "West",  product: "Motorcycles", sales: 12},
    {fuel:"Gas", region: "North", product: "Motorcycles", sales: 4},
    {fuel:"Gas", region: "East",  product: "Motorcycles", sales: 23},
    {fuel:"Gas", region: "South", product: "Motorcycles", sales: 45},

    {fuel:"Electric", region: "West",  product: "Cars", sales: 52},
    {fuel:"Electric", region: "North", product: "Cars", sales: 92},
    {fuel:"Electric", region: "East",  product: "Cars", sales: 40},
    {fuel:"Electric", region: "South", product: "Cars", sales: 12},

    {fuel:"Electric", region: "West",  product: "Trucks", sales: 43},
    {fuel:"Electric", region: "North", product: "Trucks", sales: 25},
    {fuel:"Electric", region: "East",  product: "Trucks", sales: 52},
    {fuel:"Electric", region: "South", product: "Trucks", sales: 7},

    {fuel:"Electric", region: "West",  product: "Motorcycles", sales: 22},
    {fuel:"Electric", region: "North", product: "Motorcycles", sales: 60},
    {fuel:"Electric", region: "East",  product: "Motorcycles", sales: 33},
    {fuel:"Electric", region: "South", product: "Motorcycles", sales: 81}

]

// You could construct a simple chart of that data like this ...

isc.FacetChart.create({
    ID: "simpleChart",
    // You use facets to define the ways in which you would like the chart to
    // break down the data. In this case, our data has two dimensions: region and product.
    facets: [{
        id: "region",    // the key used for this facet in the data above
        title: "Region"  // the user-visible title you want in the chart
    },{
        id: "fuel",
        title: "Fuel"
    },{
        id: "product",
        title: "Product"
    }],
    allowedChartTypes: ["Column", "Bar"],
    data: chartData,        // a reference to our data above
    valueProperty: "sales", // the property in our data that is the numerical value to chart
    chartType: "Bar",
    title: "Sales by Region, Fuel, and Product"  // a title for the chart as a whole
});


// This is a form which you can use to change the chart type

isc.DynamicForm.create({
    ID: "chartSelector",
    items: [{
        name: "chartType",
        title: "Chart Type",
        type: "select",
        valueMap: ["Column", "Bar"],
        defaultValue: "Bar",
        changed : function (form, item, value) {
            simpleChart.setChartType(value)
        }
    }]
});

// Have the chartSelector update itself if the context menu is used to change chartType

chartSelector.observe(simpleChart, "setChartType", "chartSelector.getItem('chartType').setValue(simpleChart.chartType)");

// Overall layout

isc.VLayout.create({
    ID: "simpleChartLayout",
    width: "100%",
    height: "100%",
    membersMargin: 20,
    members: [chartSelector, simpleChart]
});
