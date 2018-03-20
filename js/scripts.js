d3.json("http://www.sfu.ca/~hmaskell/iat335/movies-stats.json",function(error,data){
	if(error){
		console.log(error);	
	}
	else{
		console.log(data);
		d3.select("body").selectAll("p")
			.data(data)
			.enter()
			.append("p")
			.text(function(d){
				if (d.Distributor != ""){
					return d.Title+" - "+d.Distributor;
				}
			}
		);
		callMethods(data);
	}
});

// d3.json("http://www.sfu.ca/~hmaskell/iat335/movies-capitol.json",function(error,data){
// 	if(error){
// 		console.log(error);	
// 	}
// 	else{
// 		console.log(data);
// 		d3.select("body").selectAll("p")
// 			.data(data)
// 			.enter()
// 			.append("p")
// 			.text(function(d){
// 				if (d.US_Gross != ""){
// 					return d.Title+" $"+d.US_Gross;
// 				}
// 			}
// 		);
// 		callMethods(data);
// 	}
// });

function callMethods(dataset){
	var arrayLength = dataset.length;
	var max = findmaximum(dataset, "US_Gross");
	var min = findminimum(dataset, "Release_Date");
	var sum = findsum(dataset, "Worldwide_Gross");
	var avg = findavg(findsum(dataset, "Production_Budget"), dataset.length);
	var count = findcount(dataset, "MPAA_Rating", "R");
	var list = listAll(dataset, "Major_Genre");
	var whichList = findWhich(dataset, "US_Gross", "760167650");

	console.log("The maximum value is is "+max);
	//console.log("The minimum value is "+min);
	//console.log("The sum of Worldwide Gross Income for all movies in the dataset is $"+sum);
	//console.log("The count of all R rated movies in the dataset is "+count);
	//console.log("The average is "+avg);
	//console.log("The list is as follows: "+list);
	console.log("The list of items that match the parameters includes: "+whichList);
}

function findmaximum(data, dimension){
	var max = -1;
	for (var i=0; i<data.length; i++){
		var item = data[i][dimension];
		if (dimension == "Release_Date"){
			item = convertDate(item);
		}
		if ((item != null) && (item != "") && (item >= max)){
			max = item;
			//console.log("The new maximum value is "+max);
		}
	}
	return max;
}

function findminimum(data, dimension){
	var min = 1000000000;
	for (var i=0; i<data.length; i++){
		var item = data[i][dimension];
		//console.log("item = "+item);
		if (dimension == "Release_Date"){
			item = convertDate(item);
			//console.log("converted item = "+item);
		}
		if ((item != null) && (item != "") && (item < min)){
			min = item;
			//console.log("The new minimum value is "+min);
		}
		//console.log("the minimum value within the for loop: "+min);
	}
	//console.log("the final minimum value within the funciton: "+min);
	return min;
}


function findsum(data, dimension){
	var sum = 0;
	for (var i=0; i<data.length; i++){
		var item = data[i][dimension];
		if (item != null){
			sum += item;
		}
	}
	return sum;
}



function findavg(sum, length){
	var avg = "not yet calculated";
	if ((sum != null) && (length != null)){
		var avg = sum/length;
		avg = Math.round( avg * 10 ) / 10;
		/*reference: https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript*/
	}
	return avg;
}

function findcount(data, dimension, value){
	var count = 0;
	for (var i=0; i<data.length; i++){
		var item = data[i][dimension];
		if (dimension == "Release_Date"){
			item = convertDate(item);
		}
		if (item == value){
			count++;
		}
	}
	return count;
} 

function listAll(data, dimension){
	var list = ["null", ""];
	var already_exists = new Boolean(false);
	for (var i=0; i<data.length; i++){
		var item = data[i][dimension];
		if (dimension == "Release_Date"){
			item = convertDate(item);
		}
		already_exists = false;
		for (var j=0; j<list.length; j++){
			//console.log("data[i]dimension = "+data[i][dimension]);
			//console.log("list[j] = "+list[j]);
			if (item == list[j]){
				already_exists = true;
				//console.log("already exists");
			}
		} 
		if (already_exists == false){
			list.push(item);
		}
	}
	//console.log("the final list is: "+list);
	return list;
}

function findWhich(data, dimension, value){
	var list = [""];
	for (var i=0; i<data.length; i++){
		var item = data[i][dimension];
		if (dimension == "Release_Date"){
			item = convertDate(item);
		}
		if (item == value){
			list.push(data[i]["Title"]);
		}
	}
	return list;

}

function convertDate(date){
	var fourDigits = /\d{4}/;  //using regex to check if there are 4 consecutive digits
	var fourDigitYear ="";
	if ((date!=null) && (date[date.length - 3] == "-")){
		//console.log("MM-DD-YY: "+date);
		var twoDigitYear = date.slice(-2);
		if (twoDigitYear>17){
			fourDigitYear = "19"+twoDigitYear;
		}
		else{
			fourDigitYear = "20"+twoDigitYear;
		}
	}
	// if there are four consecutive digits in the date string
	else if (fourDigits.test(date)){ 
		if (date[0].match(/[a-z]/i)){ //checks to see if the first character in the string is a letter
			fourDigitYear = date.split(" ").pop() //isolates everything in string after the space
			//console.log("Month, YYYY: "+date);
		}
		else{
			fourDigitYear = date.slice[0,3];
			//console.log("YYYY, Month: "+date)
		}
	}
	return fourDigitYear;
}

