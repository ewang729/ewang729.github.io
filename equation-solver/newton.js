function Newton(f, wrt, guess, iter){
	f.diff(wrt);
	var key = [];
	for(var i = 0; i < 26; i ++)
		key.push(0);
	for(var i = 0; i < iter; i ++){
		key[wrt.charCodeAt(0) - 'a'.charCodeAt(0)] = guess;
		var div = (f.derivative).eval(key);
		var diff = (f.eval(key))/div;
		guess -= diff;
	}
	return guess;
}
