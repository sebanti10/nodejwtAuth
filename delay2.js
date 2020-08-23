let d={};
function get()
{
	return "sk123";
}

function fun2()
{
	if(Object.keys(d).length===0)
	{
		d.key=get();
		d.ts=Date.now();
		console.log(d.key+" "+Math.floor(d.ts/1000))
	}
	else
	{
		let curr=Date.now();
		if((curr-d.ts)>10000)
		{
			d.ts=curr;
		}
		console.log(d.key+" "+Math.floor(d.ts/1000))
	}
}

console.log("Before sleep")
fun2();
console.log("After sleep")
setTimeout(fun2,11000);