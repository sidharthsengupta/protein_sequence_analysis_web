/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Javascript for Composition
    Sidharth Sengupta
    CS290 Project
    Contains methods that:
    1. Add onclick functions to the buttons
    2. Removes spaces and line breaks from the sequence text
    3. Displays loader while analysis is performed
    4. Analyzes sequence for amino acid composition and renders a CanvasJS pie graph and table
    Please widen your window to fit this comment block for optimal viewing. 

-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

// When content is loaded, add onclick and oninput functions for buttons and textarea
document.addEventListener("DOMContentLoaded", function() {
    	document.getElementById("cleanButton").onclick = cleanSeq; 
    	document.getElementById("analyzeButton").onclick = displayPage; 
	}
);

// Removes spaces and linebreaks from sequence using string replace function
function cleanSeq()	{
    	// If no text in area, prevent function from performing
   	if(document.getElementById("sequence").value.length == 0)
		return;
    	const seq = document.getElementById("sequence").value.replace(/ |\r|\n|\r\n/g, '');	
    	document.getElementById("sequence").value = seq;
}

// Contains the sequence of events to display loading circle, run analyze funciton, then display elements
function displayPage() 		{

	// If no text in area, prevent function from performing
    	if(document.getElementById("sequence").value.length == 0)
		return;	
	
	// Hide objects and display loader
	document.getElementById("chartContainer").style.visibility = "hidden";
	document.getElementById("tableArea").style.visibility = "hidden";
	document.getElementById("loader").style.visibility = "visible";

	// In order to ensure loader is displayed, need to delay call to analyze so elements can be modified
	// Set delay for fifth of second, and after function change visibilities 
	setTimeout(function(){
		analyzeSeq(); 
		document.getElementById("loader").style.visibility = "hidden";
		document.getElementById("chartContainer").style.visibility = "visible";
		document.getElementById("tableArea").style.visibility = "visible";
		}, 
	200);	
}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    This section contains the associated analyzeSeq function. Ideally, I would have liked to seperate functions
    to make things tidier, but I was having issues with scope so I decided to just put everything in one function.
    Since the coding style is poor, I've tried to include as many comments as possible to describe the methods. 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

function analyzeSeq()	{
	
	// Get sequence and declare constant to avoid possibility of altering text during loops
	const seq = document.getElementById("sequence").value;
	
	// Create pie chart 
	var chart = new CanvasJS.Chart("chartContainer",
	{	
		// Formatting when hovering over data
		toolTip:{
 		 	fontFamily: "Helvetica Neue",
			content: "#percent %",
 		},
		// Data object
		data: [
		{	indexLabelFontFamily: "Helvetica Neue",
			fillOpacity: 0.8,
			type: "pie",
			dataPoints: []
		}
		]
	});
	chart.render(); // Create the graph

	//Initial counts for each amino acid 
	var alaCount = 0;
	var cysCount = 0;
	var aspCount = 0;
	var gluCount = 0;
	var pheCount = 0;
	var glyCount = 0;
	var hisCount = 0;
	var ileCount = 0;
	var lysCount = 0;
	var leuCount = 0;
	var metCount = 0;
	var asnCount = 0;
	var proCount = 0;
	var glnCount = 0;
	var argCount = 0;
	var serCount = 0;
	var thrCount = 0;
	var valCount = 0;
	var trpCount = 0;
	var tyrCount = 0;
	var unkCount = 0;
	
	// Initial counts for each class of amino acid 
	var polarCount = 0;
	var hphobCount = 0;
	var posCount = 0;
	var negCount = 0; 

	// Total molecular weight and isoelectric sum
	var mwTotal = 0;
	var piTotal = 0;

	// Loop through the sequence and 
	// 1. Increment relative individual counts
	// 2. Increment relative class counts
	// 3. Add to molecular weight total
	// 4. Add to isoelectric total
	for(var i = 0; i < seq.length; i++)	{
		switch(seq[i])	{
			case 'A':
				alaCount++;
				hphobCount++;
				mwTotal += 71.08;
				piTotal += 6.00;
				break;
			case 'C':
				cysCount++;
				polarCount++;
				mwTotal += 103.15;
				piTotal += 5.07;
				break;
			case 'D':
				aspCount++;
				negCount++;
				mwTotal += 115.09;
				piTotal += 2.77;
				break;
			case 'E':
				gluCount++;
				negCount++;
				mwTotal += 129.12;
				piTotal += 3.22;
				break;
			case 'F':
				pheCount++;
				hphobCount++;
				mwTotal += 147.18;
				piTotal += 5.48;
				break;
			case 'G':
				glyCount++;
				hphobCount++;
				mwTotal += 57.05;
				piTotal += 5.97;
				break;
			case 'H':
				hisCount++;
				posCount++;
				mwTotal += 137.14;
				piTotal += 7.59;
				break;
			case 'I':
				ileCount++;
				hphobCount++;
				mwTotal += 113.16;
				piTotal += 6.02;
				break;
			case 'K':
				lysCount++;
				posCount++;
				mwTotal += 128.18;
				piTotal += 9.74;
				break;
			case 'L':
				leuCount++;
				hphobCount++;
				mwTotal += 113.16;
				piTotal += 5.98;
				break;
			case 'M':
				metCount++;
				hphobCount++;
				mwTotal += 131.20;
				piTotal += 5.74;
				break;
			case 'N':
				asnCount++;
				polarCount++;
				mwTotal += 114.11;
				piTotal += 5.41;
				break;
			case 'P':
				proCount++;
				polarCount++;
				mwTotal += 97.12;
				piTotal += 6.30;
				break;
			case 'Q':
				glnCount++;
				polarCount++;
				mwTotal += 128.13;
				piTotal += 5.65;
				break;
			case 'R':
				argCount++;
				posCount++;
				mwTotal += 156.19;
				piTotal += 10.76;
				break;
			case 'S':
				serCount++;
				polarCount++;
				mwTotal += 87.08;
				piTotal += 5.68;
				break;
			case 'T':
				thrCount++;
				polarCount++;
				mwTotal += 101.11;
				piTotal += 5.60;
				break;
			case 'V':
				valCount++;
				hphobCount++;
				mwTotal += 99.13;
				piTotal += 5.96;
				break;
			case 'W':
				trpCount++;
				hphobCount++;
				mwTotal += 186.22;
				piTotal += 5.89;
				break;

			case 'Y':
				tyrCount++;
				polarCount++;
				mwTotal += 163.18;
				piTotal += 5.66;
				break;
			default:
				unkCount++;
				mwTotal += 100;
				piTotal += 7.00;
		}
	}
	
	// Add the classes counts to the pie chart's data object as well as custom colors and labels
	// The chart has to be rendered before you can call the addTo function
	// The chart automatically determines percentages 
	chart.data[0].addTo("dataPoints", {y: hphobCount, indexLabel: "Hydrophobic", color:"#d1d3d6"}); 
	chart.data[0].addTo("dataPoints", {y: polarCount, indexLabel: "Polar Neutral", color:"#97b2d8"}); 
	chart.data[0].addTo("dataPoints", {y: negCount, indexLabel: "Acidic", color:"#41719b"}); 
	chart.data[0].addTo("dataPoints", {y: posCount, indexLabel: "Basic", color:"#0f395e"});

	// Cut off the ends of the estimated MW and PI floating point vals. 
	// MW is divided by 1000 to get kDa value
	var intMW = Math.round(mwTotal);
	var quoMW = Math.floor(mwTotal/1000);
	var remMW = Math.round(mwTotal % 1000);
	var intPI = Math.round(piTotal);
	var quoPI = Math.floor(piTotal/seq.length);
	var remPI = Math.round(piTotal % seq.length);

	
	// Initalize table to nothing so if user clicks button again removes old table
	document.getElementById("table1").innerHTML = "";

	// Make the table, and elements, add content
	var table = document.getElementById("table1");
	var header = table.createTHead();
	var row = header.insertRow(0);    
	var cell = row.insertCell(0);
	cell = row.insertCell(1);
	cell.innerHTML = "<b>Number of Residues</b>";
	// Need a declared body section in order to use some bootstrap styling features
	var body = document.createElement("tbody");
	row = body.insertRow(0);
		cell = row.insertCell(0);
		cell.innerHTML = "Alanine";
		cell = row.insertCell(1);
		cell.innerHTML = alaCount; 
	row = body.insertRow(1);
		cell = row.insertCell(0);
		cell.innerHTML = "Cysteine";
		cell = row.insertCell(1);
		cell.innerHTML = cysCount; 
	row = body.insertRow(2);
		cell = row.insertCell(0);
		cell.innerHTML = "Aspartic Acid";
		cell = row.insertCell(1);
		cell.innerHTML = aspCount; 
	row = body.insertRow(3);
		cell = row.insertCell(0);
		cell.innerHTML = "Glutamic Acid";
		cell = row.insertCell(1);
		cell.innerHTML = alaCount; 
	row = body.insertRow(4);
		cell = row.insertCell(0);
		cell.innerHTML = "Phenylalanine";
		cell = row.insertCell(1);
		cell.innerHTML = pheCount; 
	row = body.insertRow(5);
		cell = row.insertCell(0);
		cell.innerHTML = "Glycine";
		cell = row.insertCell(1);
		cell.innerHTML = glyCount; 
	row = body.insertRow(6);
		cell = row.insertCell(0);
		cell.innerHTML = "Histidine";
		cell = row.insertCell(1);
		cell.innerHTML = hisCount; 
	row = body.insertRow(7);
		cell = row.insertCell(0);
		cell.innerHTML = "Isoleucine";
		cell = row.insertCell(1);
		cell.innerHTML = ileCount; 
	row = body.insertRow(8);
		cell = row.insertCell(0);
		cell.innerHTML = "Lysine";
		cell = row.insertCell(1);
		cell.innerHTML = lysCount; 
	row = body.insertRow(9);
		cell = row.insertCell(0);
		cell.innerHTML = "Leucine";
		cell = row.insertCell(1);
		cell.innerHTML = leuCount; 
	row = body.insertRow(10);
		cell = row.insertCell(0);
		cell.innerHTML = "Methionine";
		cell = row.insertCell(1);
		cell.innerHTML = metCount; 
	row = body.insertRow(11);
		cell = row.insertCell(0);
		cell.innerHTML = "Asparagine";
		cell = row.insertCell(1);
		cell.innerHTML = asnCount; 
	row = body.insertRow(12);
		cell = row.insertCell(0);
		cell.innerHTML = "Proline";
		cell = row.insertCell(1);
		cell.innerHTML = proCount; 
	row = body.insertRow(13);
		cell = row.insertCell(0);
		cell.innerHTML = "Glutamine";
		cell = row.insertCell(1);
		cell.innerHTML = glnCount; 
	row = body.insertRow(14);
		cell = row.insertCell(0);
		cell.innerHTML = "Arginine";
		cell = row.insertCell(1);
		cell.innerHTML = argCount; 
	row = body.insertRow(15);
		cell = row.insertCell(0);
		cell.innerHTML = "Serine";
		cell = row.insertCell(1);
		cell.innerHTML = serCount; 
	row = body.insertRow(16);
		cell = row.insertCell(0);
		cell.innerHTML = "Threonine";
		cell = row.insertCell(1);
		cell.innerHTML = thrCount; 
	row = body.insertRow(17);
		cell = row.insertCell(0);
		cell.innerHTML = "Valine";
		cell = row.insertCell(1);
		cell.innerHTML = valCount; 
	row = body.insertRow(18);
		cell = row.insertCell(0);
		cell.innerHTML = "Tryptophan";
		cell = row.insertCell(1);
		cell.innerHTML = trpCount; 
	row = body.insertRow(19);
		cell = row.insertCell(0);
		cell.innerHTML = "Tyrosine";
		cell = row.insertCell(1);
		cell.innerHTML = tyrCount; 
	row = body.insertRow(20);
		cell = row.insertCell(0);
		cell.innerHTML = "Unknown";
		cell = row.insertCell(1);
		cell.innerHTML = unkCount; 
	row = body.insertRow(21);
		cell = row.insertCell(0);
		cell.innerHTML = "Total";
		cell = row.insertCell(1);
		cell.innerHTML = seq.length; 
	row = body.insertRow(22);
		cell = row.insertCell(0);
		cell = row.insertCell(1);
	row = body.insertRow(23);
		cell = row.insertCell(0);
		cell.innerHTML = "Estimated Molecular Weight";
		cell = row.insertCell(1);
		cell.innerHTML = quoMW + "." + remMW + " kDa"; 
	row = body.insertRow(24);
		cell = row.insertCell(0);
		cell.innerHTML = "Estimated Isoelectric Point";
		cell = row.insertCell(1);
		cell.innerHTML = quoPI + "." + remPI; 
	
	//Add body to table, table to document
	table.appendChild(body);
	document.getElementById("tableArea").appendChild(table);
}
