var loaded = false;
var max = 0;
var data = [];
var graph_color = "black";
var background_color = "gray";
var year_one_color = "aqua";
var year_two_color = "blue";
var market_colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

function onload() {
    console.log("Test");
    data = data_load();
    max = dataMax();
    loaded = true;
    

}

function test() {

    if (!loaded) onload();

    var output = document.getElementById("plaything");
    var w = window.innerWidth - 15;
    var output_string = "";
    var top = 40;
    var bottom = top + 180;
    output.setAttribute("height", "250px");
    output.setAttribute("width", w.toString() +"px");
 
    output_string += "<rect id=\"background\" x=\"0\" y= \"0\" width =\"" + w.toString() +"\" height=\"250\" fill=\"" + background_color + "\" stroke-width=\"0\" />";
    output_string += "<line x1 =\"25\" y1=\"" + top.toString() + "\" x2=\"25\" y2=\"" + bottom.toString() + "\" stroke-width=\"4\" stroke=\"" + graph_color + "\" />"
    output_string += "<line x1 =\"25\" y1=\"" + bottom.toString() + "\" x2=\"" + (w-25).toString() + "\" y2=\"" + bottom.toString() + "\" stroke-width=\"4\" stroke=\"" + graph_color + "\" />"
    output_string += "<line x1 =\"25\" y1=\"" + ((top + bottom) / 2).toString() + "\" x2=\"" + (w-25).toString() + "\" y2=\"" + ((top + bottom) / 2).toString()+ "\" stroke-width=\"1\" stroke=\"" + graph_color + "\" />"
    var group_width = (window.innerWidth - 80) / data.length;
    for (var i = 0; i < data.length; i++) 
    {
        output_string += toGraph(data[i], i, top, max, bottom, group_width)
    }
    output.innerHTML = output_string;

    var market = document.getElementById("market-share");
    market.setAttribute("height", "250px");
    market.setAttribute("width", w.toString() +"px");
    var market_output = "";
    market_output += "<rect id=\"market_back\" x=\"0\" y=\"0\" width=\"" + w.toString() + "\" height=\"250\" fill=\"" + background_color +"\" />"
    market_output += "<line x1 =\"25\" y1=\"" + top.toString() + "\" x2=\"25\" y2=\"" + bottom.toString() + "\" stroke-width=\"4\" stroke=\"" + graph_color + "\" />"
    market_output += "<line x1 =\"25\" y1=\"" + bottom.toString() + "\" x2=\"" + ((w) *.75).toString() + "\" y2=\"" + bottom.toString() + "\" stroke-width=\"4\" stroke=\"" + graph_color + "\" />"
    market_output += "<line x1 =\"25\" y1=\"" + ((top + bottom) / 2).toString() + "\" x2=\"" + ((w) *.75).toString() + "\" y2=\"" + ((top + bottom) / 2).toString()+ "\" stroke-width=\"1\" stroke=\"" + graph_color + "\" />"
    var market_bar_width = (window.innerWidth - 40) / (((data.length) + 2) * 1.5);
    
    for (var i = 0; i < data.length; i++)
    {
        market_output += "<rect x=\"" + ((((w*.75) -25) /(data.length + 2) * (i + 1))).toString()
            + "\" y=\"" + (top + (max - (data[i].year_two * data[i].value)) / max * 180).toString() +
            "\" width=\"" + (((w*.75) -25) /(data.length + 2)).toString() + 
            "\" height=\"" + ((data[i].year_two*data[i].value) / max * 180).toString() + "\" " +
            "stroke-width=\"4\" stroke=\"" 
            + graph_color + "\" fill=\"" + market_colors[(i%7)] + "\" />";
        market_output += "<text fill=\"" + market_colors[i%7] + "\" text-anchor=\"start\" x=\"" + (w*.75 + 5).toString() + "\" stroke=\"black\" stroke-width=\".3\" " +
        "\" y=\"" + (top+30 + i*20).toString() + "\">" + data[i].name + "</text>";
        }
    market.innerHTML = market_output;
}

function toGraph(mode, id, top, max, bottom, width)
{
    var result = "";
    console.log("test_rect");
    result += "<g mouseenter=\"focus(" + id+ ")\">";
    result += "<rect id=\"" + id.toString() + "\" class=\"anim\" x=\"" + ((width * id + width / 6) + 40).toString() + 
        "\" y=\"" + (top + (max - (mode.year_one * mode.value)) / max * 180).toString() + "\" width=\"" + (width /3).toString() + 
        "\" height=\"" + ((mode.year_one * mode.value)/ max * 180).toString() + "\" fill=\"" + year_one_color + "\" stroke-width=\"2\" stroke=\"" + graph_color + "\" />";
    result += "<rect id=\"" + id.toString() + "\" class=\"anim\" x=\"" + ((width * id + width / 6) + 40 + (width /3)).toString() + 
        "\" y=\"" + (top + (max - (mode.year_two * mode.value)) / max * 180).toString() + "\" width=\"" + (width /3).toString() + 
        "\" height=\"" + ((mode.year_two* mode.value) / max * 180).toString() + "\" fill=\"" + year_two_color + "\" stroke-width=\"2\" stroke=\"" + graph_color + "\" />";
    result += "</g>"
    result += "<text font=\"bold\" text-anchor=\"middle\" x=\"" + ((width * id + width / 6) + 40 + (width /3)).toString() + 
        "\" y=\"" + (bottom + 15).toString() + "\">" + mode.name + "</text>";
    

    return result;
}


