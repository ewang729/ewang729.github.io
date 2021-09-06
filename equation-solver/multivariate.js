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
		var J_inv = Invert(J);
		var new_guess = Multiply(J_inv, vec);
		for(var j = 0; j < d; j ++){
			guess[varlist[j].charCodeAt(0) - 'a'.charCodeAt(0)] -= new_guess.array[j][0]; //issue with vars here
		}
		for(var j = 0; j < d; j ++){
			vec.array[j][0] = flist[j].eval(guess);
		}
	}
	return guess;
}

function readEquations(num){
	document.getElementById("output").innerHTML = "";
	var flist = [];
	var all_vars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for(var i = 0; i < num; i ++){
		var key = "eq_" + i.toString();
		var txt = document.getElementById(key).value;
		var polish = shunting_yard(txt);
		flist.push(parse(polish));
		for(var j = 0; j < 26; j ++){
			if(global_vars[j] == 1) all_vars[j] = 1;
		}
	}

	/**over-constrained and underconstrained errors**/
	
	var varlist = [];
	var guess = [];
	for(var i = 0; i < 26; i ++){
		if(all_vars[i] == 1){
			varlist.push(String.fromCharCode(i + 'a'.charCodeAt(0)));
		}
		guess.push(0.7); //try to avoid stationary points
	}
	
	guess = Multivariate_Newton(flist, varlist, guess, 20);
	var ans = "";
	for(var i = 0; i < 26; i ++){
		if(all_vars[i] == 1){
			ans += (String.fromCharCode(i + 'a'.charCodeAt(0)));
			ans += " = " 
			ans += parseFloat(guess[i]);
			ans += "\n";
		}
	}
	document.getElementById("output").append(ans);
}

