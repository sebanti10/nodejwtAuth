function timeSince() 
{
	var now = new Date();
  
 	if(d.type === "abc")
	{
  		console.log("hi");
		var diff = Math.floor((now.getTime() - d.value) / 1000);
  		if(diff > 3)
    	{
			d.value = now.getTime();
			console.log("updated");
			console.log(d.type+" "+Math.floor(d.value/1000));
    	}
		else
		{
			console.log("ok");		
			console.log(d.type+" "+Math.floor(d.value/1000));
		}
	}
  	else if(Object.keys(d).length === 0)
	{
  		d.type  = "abc";
    	d.value = now.getTime();
    	console.log("set");
    	console.log(d.type+" "+Math.floor(d.value/1000));
  	}
}


let d = {};
console.log("before sleep");
timeSince()
console.log("after sleep");
setTimeout(timeSince, 5000);