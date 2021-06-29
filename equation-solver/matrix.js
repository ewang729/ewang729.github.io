class Matrix{
	constructor(y, x){
		this.rows = y;
		this.columns = x;
		this.array = [];
		for(var i = 0; i < y; i ++){
			this.array.push([]);
			for(var j = 0; j < x; j ++){
				this.array[i].push(0);
			}
		}
	}
	
	print(f){
		for(var i = 0; i < this.rows; i ++){
			for(var j = 0; j < this.columns; j ++){
				f.append(this.array[i][j]);
				f.append(" ");
			}
			f.appendChild(document.createElement("br"));
		}
	}
}

function Multiply(a, b){
	var res = new Matrix(a.rows, b.columns);
	var u = a.rows, v = a.columns, w = b.columns;
	for(var i = 0; i < u; i ++){
		for(var j = 0; j < v; j ++){
			for(var k = 0; k < w; k ++){
				res.array[i][k] += a.array[i][j] * b.array[j][k];
			}
		}
	}
	return res;
}

function Invert(u){//Gauss-Jordan
	var M = u;
	var d = u.rows;
	var inv = new Matrix(d, d);
	for(var i = 0; i < d; i ++){
		inv.array[i][i] = 1;
	}
	for(var i = 0; i < d; i ++){
		for(var j = i + 1; j < d; j ++){
			if(Math.abs(M.array[j][i]) > Math.abs(M.array[i][i])){
				for(var k = i; k < d; k ++){
					var temp = M.array[j][k];
					M.array[j][k] = M.array[i][k];
					M.array[i][k] = temp;
					temp = inv.array[j][k];
					inv.array[j][k] = inv.array[i][k];
					inv.array[i][k] = temp;
				}
			}
		}
		for(var j = i + 1; j < d; j ++){
			var coeff = (M.array[j][i])/(M.array[i][i]);
			for(var k = i; k < d; k ++){
				M.array[j][k] -= coeff * M.array[i][k];
			}
			for(var k = 0; k < d; k ++){
				inv.array[j][k] -= coeff * inv.array[i][k];
			}
		}
	}
	for(var i = 0; i < d; i ++){
		for(var j = i - 1; j >= 0; j --){
			var coeff = (M.array[j][i])/(M.array[i][i]);
			for(var k = i; k < d; k ++){
				M.array[j][k] -= coeff * M.array[i][k];
			}
			for(var k = 0; k < d; k ++){
				inv.array[j][k] -= coeff * inv.array[i][k];
			}
		}
	}
	for(var i = 0; i < d; i ++){
		var coeff = M.array[i][i];
		for(var j = 0; j < d; j ++){
			inv.array[i][j] /= coeff;
		}
	}
	return inv;
}

function readMatrix(d1, d2, d3){
	document.getElementById("output").innerHTML = "";
	var A = new Matrix(d1, d2);
	var B = new Matrix(d2, d3);
	for(var i = 0; i < d1; i ++){
		for(var j = 0; j < d2; j ++){
			var key = ("a_" + i.toString() + "_" + j.toString());
			var txt = document.getElementById(key).value;
			if(txt == "") txt = "0";
			A.array[i][j] = parseFloat(txt);
		}
	}
	for(var i = 0; i < d2; i ++){
		for(var j = 0; j < d3; j ++){
			var key = ("b_" + i.toString() + "_" + j.toString());
			var txt = document.getElementById(key).value;
			if(txt == "") txt = "0";
			B.array[i][j] = parseFloat(txt);
		}
	}
	var C = Multiply(A, B);
	C.print(Display("Product:"));
	if(d1 == d2){
		var I = Invert(A);
		I.print(Display("Inverse of A:"));
	}
}
