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

function readMatrix(d1, d2, d3){
	var A = new Matrix(d1, d2);
	var B = new Matrix(d2, d3);
	for(var i = 0; i < d1; i ++){
		for(var j = 0; j < d2; j ++){
			var key = ("a_" + i.toString() + "_" + j.toString());
			var txt = document.getElementById(key).value;
			if(txt == "") txt = "0";
			A.array[i][j] = parseInt(txt);
		}
	}
	for(var i = 0; i < d2; i ++){
		for(var j = 0; j < d3; j ++){
			var key = ("b_" + i.toString() + "_" + j.toString());
			var txt = document.getElementById(key).value;
			if(txt == "") txt = "0";
			B.array[i][j] = parseInt(txt);
		}
	}
	var C = Multiply(A, B);
	C.print(Display("Product:"));
}