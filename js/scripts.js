//var json = readFile("file://../data/top-rated-movies-01.json");
var data=[0,3,8,2,60,1,2,2];
var arrayLength = data.length;

/*var arrayLength = data.length;*/

var max = maximum(data);
var min = minimum(data);
var sum = sum(data);
var avg = avg(sum, arrayLength);
var count = count(data, "2");


var dataset;
d3.json("http://www.sfu.ca/~hmaskell/iat335/top-rated-movies-01.json",function(error,data){
	if(error){
		console.log(error);	
	}else{
		console.log(data);
		dataset= data;
	}
});


console.log("The final maximum value is "+max);
console.log("The minimum value is "+min);
console.log("The sum of all data values is "+sum);
console.log("The count of '2' is "+count);
console.log("The average value is "+avg);


d3.json("http://www.sfu.ca/~hmaskell/iat335/top-rated-movies-01.json", function(json){
	console.log(json);
});



//reference: https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
/*function readFile(filename){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
*/

function maximum(data){
	var max = -1;
	for (var i=0; i<arrayLength; i++){
		if (data[i] >= max){
			max = data[i];
			//console.log("The new maximum value is "+max);
		}
	}
	return max;
}

function minimum(data){
	var min = 10000;
	for (var i=0; i<arrayLength; i++){
		if (data[i] <= min){
			min = data[i];
			//console.log("The new minimum value is "+min);
		}
	}
	return min;
}


function sum(data){
	var sum = 0;
	for (var i=0; i<arrayLength; i++){
		sum += data[i];
	}
	return sum;
}



function avg(sum, length){
	var avg = sum/length;
	return avg;
}

function count(data, value){
	var count = 0;
	for (var i=0; i<arrayLength; i++){
		if (data[i] == value){
			count++;
		}
	}
	return count;
} 
