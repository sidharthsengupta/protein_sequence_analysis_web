/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Javascript for Secondary Structure Prediction
    Sidharth Sengupta
    CS290 Project
    Contains methods that:
    1. Add onclick functions to the buttons
    2. Removes spaces and line breaks from the sequence text
    3. Displays loader while analysis is performed
    4. Analyzes sequence and renders a CanvasJS range bar graph with predicted helical and sheet regions
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
	document.getElementById("loader").style.visibility = "visible";

	// In order to ensure loader is displayed, need to delay call to analyze so elements can be modified
	// Set delay for fifth of second, and after function change visibilities 
	setTimeout(function(){
		analyzeSeq(); 
		document.getElementById("loader").style.visibility = "hidden";
		document.getElementById("chartContainer").style.visibility = "visible";
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

	// Empty arrays that will contain alpha beta region
	var alphaOut = []; 
	var betaOut = [];
	
	// Thought declaring a variable for loop bound would be more logical/faster
	var bound01 = seq.length - 5;
	
/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    This first sectiion is for alpha helices. Uses a while loop to step through the array. This implementation
    was written based on the Chou Fasman algorithm

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	// Was having some issues when getting to end of sequence, so used while loop instead
	var i = 0;
	while(i < bound01)	{
		
		var bound02 = i + 6; 
		var probAa = 0; 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Each time the loop increments, this for loop looks through the first 6 residues. If it finds a favorable
    nucleating segment it triggers the next loop

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

		for(var j = i; j < bound02; j++)	{
			switch(seq[j])	{
				case 'E':
					probAa += 1;
					break;
				case 'M':
					probAa += 1;
					break;
				case 'A':
					probAa += 1;
					break;
				case 'L':
					probAa += 1;
					break;
				case 'K':
					probAa += 1;
					break;
				case 'F':
					probAa += 1;
					break;
				case 'Q':
					probAa += 1;
					break;
				case 'W':
					probAa += 1;
					break;
				case 'I':
					probAa += 1;
					break;
				case 'V':
					probAa += 1;
					break;
				case 'D':
					probAa += 0.5;
					break;
				case 'H':
					probAa += 0.5;
					break
				case 'P':
					probAa -= 5;
			}
		}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

	If triggered, will begin to extend the region found in reverse and forward directions. 
    
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

		if(probAa >= 4)	{
			var proBrev = 3;
			var proBfor = 3;
			var start = i;
			var stop = i + 5; 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

	This is the reverse loop. On each iteration, examines the previous four residues. If favorable, continues. 
	When done, it sets the current start position. 
    
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			for(start; proBrev >= 3; start--)	{
				proBrev = 0;
				var bound03 = 0;
				var k = start - 1;
				
				if(k > 2)	
					bound03 = k - 4;
				else if(k > 1)		
					bound03 = k - 3;
				else 		  
					bound03 = k; 

				for(k; k > bound03; k--)	{
					switch(seq[k])	{
						case 'E':
							proBrev += 1;
							break;
						case 'M':
							proBrev += 1;
							break;
						case 'A':
							proBrev += 1;
							break;
						case 'L':
							proBrev += 1;
							break;
						case 'K':
							proBrev += 1;
							break;
						case 'F':
							proBrev += 1;
							break;
						case 'Q':
							proBrev += 1;
							break;
						case 'W':
							proBrev += 1;
							break;
						case 'I':
							proBrev += 1;
							break;
						case 'V':
							proBrev += 1;
							break;
						case 'P':
							proBrev -= 4; 
					}
				}
			}
			start++; // Increments since loop decremented before test

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

	This is the forward loop. On each iteration, examines the next four residues. If favorable, continues. 
	When done, it sets the current stop position. 
    
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/
			
			for(stop; proBfor >= 3; stop++)	{
				proBfor = 0;
				var bound04 = 0; 
				var l = stop + 1;
				var diff = seq.length - l;
				
				if(diff > 3)	
					bound04 = l + 4;
				else if(diff > 2)
					bound04 = l + 3;
				else 		
					bound04 = l;  

				for(l; l < bound04; l++)	{
					switch(seq[l])	{
						case 'E':
							proBfor += 1;
							break;
						case 'M':
							proBfor += 1;
							break;
						case 'A':
							proBfor += 1;
							break;
						case 'L':
							proBfor += 1;
							break;
						case 'K':
							proBfor += 1;
							break;
						case 'F':
							proBfor += 1;
							break;
						case 'Q':
							proBfor += 1;
							break;
						case 'W':
							proBfor += 1;
							break;
						case 'I':
							proBfor += 1;
							break;
						case 'V':
							proBfor += 1;
							break;
						case 'P':
							proBfor -= 4; 
					}
				}
			}
			stop++;

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Now it examines the current start position. There are specific residues that prefer ends. This extends the 
    region until an unfavorable residue is found or stops the search when a residue that prefers the end is found.

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			var boolTerm = 0; 

			do {
				// If at beginning of sequence
				if(start == -1)	{
     					boolTerm = 0;
         				break;
      				}

				switch(seq[start - 1])	{
					case 'M':
						boolTerm = 1;
						start--;
						break;
					case 'A':
						boolTerm = 1;
						start--;
						break;
					case 'L':
						boolTerm = 1;
						start--;
						break;
					case 'K':
						boolTerm = 1;
						start--;
						break;
					case 'F':
						boolTerm = 1;
						start--;
						break;
					case 'Q':
						boolTerm = 1;
						start--;
						break;
					case 'W':
						boolTerm = 1;
						start--;
						break;
					case 'I':
						boolTerm = 1;
						start--;
						break;
					case 'V':
						boolTerm = 1;
						start--;
						break;
					case 'E':
						boolTerm = -1;
						start--;
						break;
					case 'D':
						boolTerm = -1;
						start--;
						break;
					case 'P':
						boolTerm = -1;
						start--;
						break;
					default:
						boolTerm = 0;
				}	
			} while(boolTerm == 1); 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Now it examines the current stop position. There are specific residues that prefer ends. This extends the 
    region until an unfavorable residue is found or stops the search when a residue that prefers the end is found.

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			do {
				// If at end of sequence
				if(stop == seq.length)	{
     					boolTerm = 0;
         				break;
      				}

				switch(seq[stop + 1])	{
					case 'E':
						boolTerm = 1;
						stop++;
						break;
					case 'M':
						boolTerm = 1;
						stop++;
						break;
					case 'A':
						boolTerm = 1;
						stop++;
						break;
					case 'L':
						boolTerm = 1;
						stop++;
						break;
					case 'F':
						boolTerm = 1;
						stop++;
						break;
					case 'Q':
						boolTerm = 1;
						stop++;
						break;
					case 'W':
						boolTerm = 1;
						stop++;
						break;
					case 'I':
						boolTerm = 1;
						stop++;
						break;
					case 'V':
						boolTerm = 1;
						stop++;
						break;
					case 'K':
						boolTerm = -1;
						stop++;
						break;
					case 'H':
						boolTerm = -1;
						stop++;
						break;
					case 'R':
						boolTerm = -1;
						stop++;
						break;
					default:
						boolTerm = 0;
				}	
			} while(boolTerm == 1); 

			alphaOut.push(start);
			alphaOut.push(stop);
			i = stop + 4;
		}
		i++;
	}

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Beta sheet search. Very similar to helix. 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

	bound01 = seq.length - 4;
	i = 0;
	while(i < bound01)	{

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    Searches for favorable nucleating region. 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

		var bound05 = i + 5; 
		var pBetaA = 0; 
		for(var m = i; m < bound05; m++)	{
			switch(seq[m])	{
				case 'V':
					pBetaA += 1;
					break;
				case 'I':
					pBetaA += 1;
					break;
				case 'Y':
					pBetaA += 1;
					break;
				case 'F':
					pBetaA += 1;
					break;
				case 'L':
					pBetaA += 1;
					break;
				case 'C':
					pBetaA += 1;
					break;
				case 'T':
					pBetaA += 1;
					break;
				case 'Q':
					pBetaA += 1;
					break;
				case 'M':
					pBetaA += 1;
			}
		}

		if(pBetaA >= 3)	{
			var pBetaBRev = 1;
			var pBetaBFor = 1;
			var startB = i;
			var stopB = i + 5; 
	
/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    If found, extends in reverse.
 
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			for(startB; pBetaBRev >= 1; startB--)	{
				pBetaBRev = 0;
				var bound06 = 0;
				var n = startB - 1;
				
				if(n > 2)	
					bound06 = n - 4;
				else if(n > 1)		
					bound06 = n - 3;
				else 		  
					bound06 = n; 

				for(n; n > bound06; n--)	{
					switch(seq[n])	{
						case 'V':
							pBetaBRev += 1.70;
							break;
						case 'I':
							pBetaBRev += 1.60;
							break;
						case 'Y':
							pBetaBRev += 1.47;
							break;
						case 'F':
							pBetaBRev += 1.38;
							break;
						case 'W':
							pBetaBRev += 1.37;
							break;
						case 'L':
							pBetaBRev += 1.30;
							break;
						case 'C':
							pBetaBRev += 1.19;
							break;
						case 'T':
							pBetaBRev += 1.19;
							break;
						case 'Q':
							pBetaBRev += 1.10;
							break;
						case 'M':
							pBetaBRev  += 1.05;
							break;
						case 'R':
							pBetaBRev += 0.93; 
							break;
						case 'N':
							pBetaBRev += 0.89; 
							break;
						case 'H':
							pBetaBRev += 0.87; 
							break;
						case 'A':
							pBetaBRev += 0.83; 
							break;
						case 'S':
							pBetaBRev += 0.75; 
							break;
						case 'G':
							pBetaBRev += 0.75; 
							break;
						case 'K':
							pBetaBRev += 0.74; 
							break;
						case 'P':
							pBetaBRev += 0.55; 
							break;
						case 'D':
							pBetaBRev += 0.54; 
							break;
						case 'E':
							pBetaBRev += 0.37; 
					}
				}

				pBetaBRev /= 4;
			}
			startB++; 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

     And extends forward. 

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			for(stopB; pBetaBFor >= 1; stopB++)	{
				pBetaBFor = 0;
				var bound07 = 0; 
				var o = stopB + 1;
				var diffB = seq.length - o;
				
				if(diffB > 3)	
					bound07 = o + 4;
				else if(diffB > 2)
					bound07 = o + 3;
				else 		
					bound07 = o;  

				for(o; o > bound07; o--)	{
					switch(seq[o])	{
						case 'V':
							pBetaBFor += 1.70;
							break;
						case 'I':
							pBetaBFor += 1.60;
							break;
						case 'Y':
							pBetaBFor += 1.47;
							break;
						case 'F':
							pBetaBFor += 1.38;
							break;
						case 'W':
							pBetaBFor += 1.37;
							break;
						case 'L':
							pBetaBFor += 1.30;
							break;
						case 'C':
							pBetaBFor += 1.19;
							break;
						case 'T':
							pBetaBFor += 1.19;
							break;
						case 'Q':
							pBetaBFor += 1.10;
							break;
						case 'M':
							pBetaBFor  += 1.05;
							break;
						case 'R':
							pBetaBFor += 0.93; 
							break;
						case 'N':
							pBetaBFor += 0.89; 
							break;
						case 'H':
							pBetaBFor += 0.87; 
							break;
						case 'A':
							pBetaBFor += 0.83; 
							break;
						case 'S':
							pBetaBFor += 0.75; 
							break;
						case 'G':
							pBetaBFor += 0.75; 
							break;
						case 'K':
							pBetaBFor += 0.74; 
							break;
						case 'P':
							pBetaBFor += 0.55; 
							break;
						case 'D':
							pBetaBFor += 0.54; 
							break;
						case 'E':
							pBetaBFor += 0.37; 
					}
				}

				pBetaBFor /= 4;
			}
			stopB++; 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    And then finds exact start position

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			var boolTerm2 = 0; 

			do {
				if(startB == -1)	{
     					boolTerm2 = 0;
         				break;
      				}

				switch(seq[startB - 1])	{
					case 'V':
						boolTerm2 = 1;
						startB--;
						break;
					case 'I':
						boolTerm2 = 1;
						startB--;
						break;
					case 'Y':
						boolTerm2 = 1;
						startB--;
						break;
					case 'F':
						boolTerm2 = 1;
						startB--;
						break;
					case 'W':
						boolTerm2 = 1;
						startB--;
						break;
					case 'L':
						boolTerm2 = 1;
						startB--;
						break;
					case 'C':
						boolTerm2 = 1;
						startB--;
						break;
					case 'T':
						boolTerm2 = 1;
						startB--;
						break;
					case 'Q':
						boolTerm2 = 1;
						startB--;
						break;
					case 'M':
						boolTerm2 = 1;
						startB--;
						break;
					default:
						boolTerm2 = 0;
				}	
			} while(boolTerm2 == 1); 

/*-----------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

    And then finds exact stop position

-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

			do {
				if(stopB == seq.length)	{
     					boolTerm2 = 0;
         				break;
      				}

				switch(seq[stopB + 1])	{
					case 'V':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'I':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'Y':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'F':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'W':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'L':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'C':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'T':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'Q':
						boolTerm2 = 1;
						stopB++;
						break;
					case 'M':
						boolTerm2 = 1;
						stopB++;
						break;
					default:
						boolTerm2 = 0;
				}	
			} while(boolTerm2 == 1); 

			betaOut.push(startB);
			betaOut.push(stopB);
			i = stopB + 4;
		}
		i++;
	}

	// Create horizontal range bar chart
	var chart = new CanvasJS.Chart("chartContainer",
	{
		// Allows user to zoom, only on x axis
		zoomEnabled:true,
     		zoomType: "y",
		// Y axis formatting
		axisY: {
			includeZero:true,
			interval: 100,
			viewportMinimum:0,
        		viewportMaximum:seq.length,
			title:"Residue Position",
			titleFontSize:16,
			titleFontFamily:"Helvetica Neue",
			labelFontFamily: "Helvetica Neue",	
		},
		// X axis formatting
		axisX: {
			includeZero: true,
			labelFontFamily: "Helvetica Neue",
			interval: 1,
			labelFormatter: function(e){
				if(e.value == 2)
					return "Alpha Helix";
				else	
					return "Beta Sheet";
			}
		},
		// Formatting when hovering over data
		toolTip: {
			fontFamily: "Helvetica Neue",
			content: "{name} </br> Residues {y[0]} - {y[1]}"
		},
		dataPointWidth: 100,
		// Data object
		data: [
		{
			type: "rangeBar",
			dataPoints: []
		}
		]
	});
	chart.render(); // Create the chart 

	// If the sequence is longer than 250, then sets the viewport to show the first 250 residues
	if(seq.length >= 250)	
		chart.axisY[0].set("viewportMaximum", 250);

	// Add alpha helix regions to chart
	for(var a = 0; a < alphaOut.length; a += 2)	{
		chart.data[0].addTo("dataPoints", 
			{x: 2, y: [alphaOut[a], alphaOut[a+1]], name: "α-Helix", color: "#7a3737"});
	}

	// Add beta sheet regions to chart
	for(var b = 0; b < betaOut.length; b += 2)	{
		chart.data[0].addTo("dataPoints", 
			{x: 1, y: [betaOut[b], betaOut[b+1]], name: "β-Sheet", color: "#b5b6b7"});
	}
}
