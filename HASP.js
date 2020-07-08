/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Javascript for Hydrophobic Analysis and Sorting Prediction
    Sidharth Sengupta
    CS290 Project
    Contains methods that:
    1. Add onclick functions to the buttons
    2. Removes spaces and line breaks from the sequence text
    3. Displays loader while analysis is performed
    4. Analyzes sequence and renders a CanvasJS spline area graph with hydrophobcitiy scores and prints below 
       any predicted sorting signals
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
	document.getElementById("Sorting").style.visibility = "hidden";
	document.getElementById("loader").style.visibility = "visible";

	// In order to ensure loader is displayed, need to delay call to analyze so elements can be modified
	// Set delay for fifth of second, and after function change visibilities 
	setTimeout(function(){
		analyzeSeq(); 
		document.getElementById("loader").style.visibility = "hidden";
		document.getElementById("chartContainer").style.visibility = "visible";
		document.getElementById("Sorting").style.visibility = "visible";
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
	
	// Create spline area chart 
	var chart = new CanvasJS.Chart("chartContainer",
	{	
		// Allows user to zoom, only on x axis
		zoomEnabled: true,
     		zoomType: "x",
		// Y axis formatting
		axisY: {
			includeZero: true,
			gridThickness: 0,
			tickThickness: 0,
			// Removes any label. Individual scores are not important, only relative to 0
			labelFormatter: function ( e ) {
               		return "";}      
		},
		// X axis formatting
		axisX: {
			includeZero: true,
			titleFontSize: 16,
			interval: 100,
			title: "Residue Position",
			gridThickness: 1,
			// Sets initial region displayed
			viewportMinimum: 0,
			viewportMaximum: seq.length,
			titleFontFamily: "Helvetica Neue",
			labelFontFamily: "Helvetica Neue",
		},
		// Formatting when hovering over data
		toolTip: {
			fontFamily: "Helvetica Neue",
			content: "Residue {x}: {name}",
		},
		// Data object
		data: [
		{
			type: "splineArea",
			color: "#699972",
			dataPoints: []
		}
		]
	});
	chart.render(); // Create the chart

	// If the sequence is longer than 250, then sets the viewport to show the first 250 residues
	if(seq.length >= 250)	
		chart.axisX[0].set("viewportMaximum", 250);

	// Thought declaring a variable for loop bound would be more logical/faster
	var bound01 = seq.length; 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    This for loop will loop through the sequence, add the relative hydrophobicity score will be added to plot
    along with the 1-letter code for the acid and the position so it can be displayed when hovered over. This 
    function is by far the slowest analyze function, I believe because I have to call the addTo function during
    each iteration. In hindsight I might have been able to create an array of data entry objects and then set
    the chart data to that array, but I couldn't find material for it in the CanvasJS reference.
     
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	for(var pos = 0; pos < bound01; pos++)	{
		switch(seq[pos])	{
			case 'I':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 4.5, name: seq[pos]}); 
				break;
			case 'V':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 4.2, name: seq[pos]}); 
				break;
			case 'L':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 3.8, name: seq[pos]}); 
				break;
			case 'F':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 2.8, name: seq[pos]}); 
				break;
			case 'C':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 2.5, name: seq[pos]}); 
				break;
			case 'M':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 1.9, name: seq[pos]}); 
				break;
			case 'A':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 1.8, name: seq[pos]}); 
				break;
			case 'G':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -0.4, name: seq[pos]}); 
				break;
			case 'T':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -0.7, name: seq[pos]}); 
				break;
			case 'S':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -0.8, name: seq[pos]}); 
				break;
			case 'W':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -0.9, name: seq[pos]}); 
				break;
			case 'Y':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -1.3 , name: seq[pos]}); 
				break;
			case 'P':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -1.6, name: seq[pos]}); 
				break;
			case 'H':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -3.2, name: seq[pos]}); 
				break;
			case 'E':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -3.5, name: seq[pos]}); 
				break;
			case 'Q':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -3.5, name: seq[pos]}); 
				break;
			case 'D':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -3.5, name: seq[pos]}); 
				break;
			case 'N':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -3.5, name: seq[pos]}); 
				break;
			case 'K':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -3.9, name: seq[pos]}); 
				break;

			case 'R':
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: -4.5, name: seq[pos]}); 
				break;
			default:
				chart.data[0].addTo("dataPoints",
					{x: (pos + 1), y: 0, name: "Unknown"}); 
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   These next sections will try to find sorting signals. 
   The first is the nuclear localization signal. There are different versions of known NLS signals. I chose one
   in my Cell Bio textbook that is well-known, the monopartite K-K/R-X-K/R sequence. Essentially a cluster of
   basic residues. There can be more than one and can occur anywhere along the protein. So I search the entire 
   array for a lysine. If I encounter one, I check the next four acids to see if they match using nested 
   if statements. If all are true, then I push the start and stop positions onto an array and change the found NLS 
   signal bool value to true, and position the search ahead of the area I just recorded.

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	var i = 0; 
	var bound02 = seq.length - 4;
	var NLSreg = [];
	var NLSbool = 0;

	for(i; i < bound02; i++)	{
		if(seq[i] == 'K')	{
			if(seq[i+1] == 'K' || seq[i + 1])	{
				if(seq[i+3] == 'K' || seq[i+3] == 'R')	{
					NLSbool = 1;
					NLSreg.push(i + 1);
					NLSreg.push(i + 5);
					i += 5; 
				}
			}
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   The second is the nuclear export signal. Usually these signals have some spaced out Leucine residues, but 
   can also contain other hydrophobic resiudes. Therefore, I loop through the array until I encounter a Leucine,
   then loop through the next 10 elements. If I encounter three leucines (including the original one that triggered
   the search) and one other hydrophobic residue. I push the location onto an array, set bool
   value, and position search ahead of the recorded element. 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	var NESreg = [];
	var NESbool = 0;
	var bound03 = seq.length - 10;
	i = 0;
	
	for(i; i < bound03; i++)	{
		if(seq[i] == 'L')	{
			var NESfactor = 0;
			var bound04 = i + 10;
			for(var j = i; j < bound04; j++)	{
				switch(seq[j])	{
					case 'L': 
						NESfactor += 4;
						break;
					case 'G': 
						NESfactor += 0.5;
						break;
					case 'A': 
						NESfactor += 0.5;
						break;
					case 'V': 
						NESfactor += 0.5;
						break;
					case 'I': 
						NESfactor += 0.5;
						break;
					case 'P': 
						NESfactor += 0.5;
						break;
					case 'F': 
						NESfactor += 0.5;
						break;
					case 'M': 
						NESfactor += 0.5;
						break;
					case 'W': 
						NESfactor += 0.5;
				}
			}
			if(NESfactor >= 12.5)	{
				NESbool = 1; 
				NESreg.push(i+1);
				NESreg.push(i+10);
				i += 15;
			}
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   The third is the mitochondrial import signal. This signal is usually a cluster of positive and/or hydrophobic
   residues at the N terminal (beginning). I search for the first element and if one is found any further loops 
   will break. I search for a lysine or arginine, and if found triggers a search through the next 20 elements. If 
   70% of them are hydrophobic or positive, I record the position on an array, set the bool value to true, and 
   reposition the search (but any further iterations will break). 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	var MISreg = [];
	var MISbool = 0;
	i = 0;  

	for(i; i < 51; i++)	{
		if(MISbool == 1)
			break;
		if(seq[i] == 'K' || seq[i] == 'R')	{
			var MISfactor = 0;
			var bound05 = i + 20;
			for(var k = i; k < bound05; k++)	{
				switch(seq[k])	{
					case 'L': 
						MISfactor += 1;
						break;
					case 'G': 
						MISfactor += 1;
						break;
					case 'A': 
						MISfactor += 1;
						break;
					case 'V': 
						MISfactor += 1;
						break;
					case 'I': 
						MISfactor += 1;
						break;
					case 'P': 
						MISfactor += 1;
						break;
					case 'W': 
						MISfactor += 1;
						break;
					case 'M': 
						MISfactor += 1;
						break;
					case 'W': 
						MISfactor += 1;
						break;
					case 'H': 
						MISfactor += 1;
						break;
					case 'K': 
						MISfactor += 1;
						break;
					case 'R': 
						MISfactor += 1;
				}
			}
			if(MISfactor >= 14)	{
				MISbool = 1; 
				MISreg.push(i+1);
				MISreg.push(i+20);
				i += 20;
			}
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   The fourth is the ER import signal. This signal is usually a cluster of hydrophobic residues at the N terminal.
   I search the first 25 resiudes. As soon as I've encountered 10 residues along any length of the 25 elements, I 
   push the region onto an array and set the bool to true (which prevents breaks any further loop iterations).

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	var ERIreg = [];
	var ERIbool = 0;
	i = 0;
	var ERIfactor = 0;
	for(i; i < 25; i++)	{

		if(ERIbool == 1)
			break;
		
		switch(seq[i])	{
			case 'L': 
				ERIfactor  += 1;
				break;
			case 'G': 
				ERIfactor  += 1;
				break;
			case 'A': 
				ERIfactor  += 1;
				break;
			case 'V': 
				ERIfactor  += 1;
				break;
			case 'I': 
				ERIfactor  += 1;
				break;
			case 'P': 
				ERIfactor  += 1;
				break;
			case 'W': 
				ERIfactor  += 1;
				break;
			case 'M': 
				ERIfactor  += 1;
				break;
			case 'W': 
				ERIfactor  += 1;
			}

										
		if(ERIfactor >= 10)	{
				ERIbool = 1; 
				ERIreg.push(1);
				ERIreg.push(i+1);
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   The fifth is the ER retention signal. I use a consensus K-D-E-L sequence which is typically at the C-terminal
   (end). I search the last 8 elements for the first KDEL sequence I encounter using nested if statements. If 
   found, push the location to the array, set bool, and reposition counter. 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	var bound06 = seq.length - 9;
	var ERRreg = [];
	var ERRbool = 0;
	i = seq.length - 1; 

	for(i; i > bound06; i--)	{
		if(seq[i] == 'L')	{
			if(seq[i-1] == 'E')	{
				if(seq[i-2] == 'D')	{
					if(seq[i-3] == 'K')	{
						ERRbool = 1;
						ERRreg.push(i - 2);
						ERRreg.push(i + 1);
						i -= 4; 
					}
				}
			}
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   The sixth is the peroxisome targeting signal. I use a consensus PTS1 signal: S-K-L. Same as ER retention,
   but I only search the last 6 residues.

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	var bound07 = seq.length - 7;
	var PTSreg = [];
	var PTSbool = 0;
	i = seq.length - 1; 

	for(i; i > bound07; i--)	{
		if(seq[i] == 'L')	{
			if(seq[i-1] == 'K')	{
				if(seq[i-2] == 'S')	{
					PTSbool = 1;
					PTSreg.push(i - 1);
					PTSreg.push(i + 1);
					i -= 3; 
					
				}
			}
		}
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

   The rest is for printing the regions

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	document.getElementById("Sorting").innerHTML = "<br><h3>Potential Sorting Signals: </h3>";
	
	// Check to see if any were found
	var sortingBool = NLSbool + NESbool + MISbool + ERIbool + ERRbool + PTSbool; 
	
	// If they were
	if(sortingBool != 0) {
	// Print any
	if(NLSbool != 0)	{
		document.getElementById("Sorting").innerHTML += "<br><b>Nuclear Localization Signal: </b>";
		for(i = 0; i < NLSreg.length; i +=2)	{
			document.getElementById("Sorting").innerHTML += NLSreg[i] + " - " + NLSreg[i+1];
			if((NLSreg.length - i) > 3)	
				document.getElementById("Sorting").innerHTML += ", ";
		}
	}
	
	if(NESbool != 0)	{
		document.getElementById("Sorting").innerHTML += "<br><b>Nuclear Export Signal: </b>";
		for(i = 0; i < NESreg.length; i +=2)	{
			document.getElementById("Sorting").innerHTML += NESreg[i] + " - " + NESreg[i+1];
			if((NESreg.length - i) > 3)	
				document.getElementById("Sorting").innerHTML += ", ";
		}
	}
	
	if(MISbool != 0)	{
		document.getElementById("Sorting").innerHTML += "<br><b>Mitochondrial Import Signal: </b>";
		for(i = 0; i < MISreg.length; i +=2)	{
			document.getElementById("Sorting").innerHTML += MISreg[i] + " - " + MISreg[i+1];
			if((MISreg.length - i) > 3)	
				document.getElementById("Sorting").innerHTML += ", ";
		}
	}
	
	if(ERIbool != 0)	{
		document.getElementById("Sorting").innerHTML += "<br><b>ER Import/Secretion Signal: </b>";
		for(i = 0; i < ERIreg.length; i +=2)	{
			document.getElementById("Sorting").innerHTML += ERIreg[i] + " - " + ERIreg[i+1];
			if((ERIreg.length - i) > 3)	
				document.getElementById("Sorting").innerHTML += ", ";
		}
	}
	
	if(ERRbool != 0)	{
		document.getElementById("Sorting").innerHTML += "<br><b>ER Return/Retention Signal: </b>";
		for(i = 0; i < ERRreg.length; i +=2)	{
			document.getElementById("Sorting").innerHTML += ERRreg[i] + " - " + ERRreg[i+1];
			if((ERRreg.length - i) > 3)	
				document.getElementById("Sorting").innerHTML += ", ";
		}
	}
	
	if(PTSbool != 0)	{
		document.getElementById("Sorting").innerHTML += "<br><b>Peroxisome Targeting Signal: </b>";
		for(i = 0; i < PTSreg.length; i +=2)	{
			document.getElementById("Sorting").innerHTML += PTSreg[i] + " - " + PTSreg[i+1];
			if((PTSreg.length - i) > 3)	
				document.getElementById("Sorting").innerHTML += ", ";
		}
	}
	}
	// Else print none found
	else
		document.getElementById("Sorting").innerHTMl += "No regions found"; 
}
