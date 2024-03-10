x = { a: 3, b: 5 };

ff = o => {
	console.log(o.c);
}

f = o => {
	o.c = 4;
	ff(o);
}

f(x);