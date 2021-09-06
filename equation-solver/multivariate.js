function Jacobian(flist, varlist, key){
	var d = varlist.length;
	var J = new Matrix(d, d);
	for(var i = 0; i < d; i ++){
		for(var j = 0; j < d; j ++){
			flist[i].diff(varlist[j]);
			J.array[i][j] = (flist[i].derivative).eval(key);
		}
	}
	return J;
}

function Multivariate_Newton(flist, varlist, guess, iter){
	var d = varlist.length;
	var vec = new Matrix(d, 1);
	for(var i = 0; i < d; i ++)
		vec.array[i][0] = flist[i].eval(guess);
	for(var i = 0; i < iter; i ++){
		var J = Jacobian(flist, varlist, guess);
		var J_inv = Invert(Jacobian);
		var new_guess = Multiply(J_inv, vec);
		for(var j = 0; j < d; j ++){
			guess[j] -= new_guess.array[j][0];
		}
		for(var j = 0; j < d; j ++){
			vec.array[i][0] = flist[i].eval(guess);
		}
	}
	return guess;
}

