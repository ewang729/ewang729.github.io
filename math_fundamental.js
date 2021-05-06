class Constant {
    constructor(value){
        this.value = value;
        this.derivative;
    }
    
    print(f){
        f.append(this.value);
    }
    
    diff(wrt){
        this.derivative = new Constant(0);
    }
}

class Variable{
    constructor(coeff, name){
        this.coeff = coeff;
        this.name = name;
        this.derivative;
    }
    
    print(f){
        if(this.coeff !== 1) f.append(this.coeff);
        f.append(this.name);
    }
    
    diff(wrt){
        if(wrt === this.name || wrt === "") this.derivative = new Constant(this.coeff);
        else this.derivative = new Constant(0);
    }
}

class Sum{
    constructor(elements){
        this.elements = elements;
        this.derivative;
    }
    
    print(f){
        f.append("(");
        for(var i = 0; i < this.elements.length; i ++){
            if(i !== 0){
                f.append(" + ");
            }
            this.elements[i].print(f);
        }
        f.append(")");
    }
    
    diff(wrt){
        var dele = [];
        for(var i = 0; i < this.elements.length; i ++){
            this.elements[i].diff(wrt);
            dele.push(this.elements[i].derivative);
        }
        this.derivative = new Sum(dele);
    }
}

class Difference{
    constructor(first, second){
        this.first = first;
        this.second = second;
        this.derivative;
    }
    
    print(f){
        f.append("(");
        this.first.print(f);
        f.append(" - ");
        this.second.print(f);
        f.append(")");
    }
    
    diff(wrt){
        this.first.diff(wrt);
        this.second.diff(wrt);
        this.derivative = new Difference(this.first.derivative, this.second.derivative);
    }
}

class Product{
    constructor(first, second){
        this.first = first;
        this.second = second;
        this.derivative;
    }
    
    print(f){
        f.append("(");
        this.first.print(f);
        f.append(" * ");
        this.second.print(f);
        f.append(")");
    }
    
    diff(wrt){
        this.first.diff(wrt);
        this.second.diff(wrt);
        var partial1 = new Product(this.first.derivative, this.second);
        var partial2 = new Product(this.first, this.second.derivative);
        this.derivative = new Sum([partial1, partial2]);
    }
}

class Quotient{
    constructor(first, second){
        this.first = first;
        this.second = second;
        this.derivative;
    }
    
    print(f){
        f.append("(");
        this.first.print(f);
        f.append(" / ");
        this.second.print(f);
        f.append(")");
    }
    
    diff(wrt){
        this.first.diff(wrt);
        this.second.diff(wrt);
        var partial1 = new Product(this.first.derivative, this.second);
        var partial2 = new Product(this.first, this.second.derivative);
        var partial3 = new Product(this.second, this.second);
        var partial4 = new Difference(partial1, partial2);
        this.derivative = new Quotient(partial4, partial3);
    }
}

class Logarithm{
    constructor(arg){
        this.argument = arg;
	    this.derivative;
    }

    print(f){
        f.append("ln(");
        this.argument.print(f);
        f.append(")");
    }

    diff(wrt){
        this.argument.diff(wrt);
    	var partial1 = new Constant(1);
    	var partial2 = new Quotient(partial1, this.argument);
    	this.derivative = new Product(partial2, this.argument.derivative);
    }
}

class Exponential{
    constructor(first, second){
        this.first = first;
        this.second = second;
        this.derivative;
    }
    
    print(f){
        f.append("(");
        this.first.print(f);
        f.append(" ^ ");
        this.second.print(f);
        f.append(")");
    }
    
    diff(wrt){
        this.first.diff(wrt);
        this.second.diff(wrt);
        var partial1 = new Exponential(this.first, this.second);
        var partial2 = new Quotient(this.second, this.first);
        var partial3 = new Product(this.first.derivative, partial2);
        var partial4 = new Logarithm(this.first);
        var partial5 = new Product(this.second.derivative, partial4);
        var partial6 = new Sum([partial3, partial5]);
        this.derivative = new Product(partial1, partial6);
    }
}

class Trig{
    constructor(arg, type){
        this.argument = arg;
        this.type = type;
        this.derivative;
    }
    
    print(f){
        f.append(this.type);
        f.append("(");
        this.argument.print(f);
        f.append(")");
    }
    
    diff(wrt){
        this.argument.diff(wrt);
        if(this.type === "sin"){
            var partial = new Trig(this.argument, "cos");
            this.derivative = new Product(partial, this.argument.derivative);
        }
        else if(this.type === "cos"){
            var partial1 = new Constant(0);
            var partial2 = new Trig(this.argument, "sin");
            var partial3 = new Difference(partial1, partial2);
            this.derivative = new Product(partial3, this.argument.derivative);
        }
        else if(this.type == "tan"){
            var partial1 = new Trig(this.argument, "cos");
            var partial2 = new Product(partial1, partial1);
            this.derivative = new Quotient(this.argument.derivative, partial2);
        }
    }
}

function alphanumeric(c){
    if(c >= '0' && c <= '9') return true;
    if(c >= 'a' && c <= 'z') return true;
    return false;
}

function shunting_yard(s) {
	var stck = [];
	var prec = [];
	while(prec.length < 300) prec.push(0);
	prec['^'] = 3;
	prec['*'] = 2;
	prec['/'] = 2;
	prec['+'] = 1;
	prec['-'] = 1;
	prec[':'] = 10;
	prec['&'] = 10; prec['%'] = 10; prec['#'] = 10;
	var polish = "";
	for (var i = 0; i < s.length; i++) {
		if (s[i] === ' ') continue;
		if(i < s.length - 1&& s[i] === 'l' && s[i+1] === 'n'){
		    stck.push(':');
		    i++;
		}
		else if(i < s.length - 2 && s[i] === 's' && s[i+1] === 'i' && s[i+2] === 'n'){
		    stck.push('&');
		    i+=2;
		}
		else if(i < s.length - 2 && s[i] === 'c' && s[i+1] === 'o' && s[i+2] === 's'){
		    stck.push('%');
		    i+=2;
		}
		else if(i < s.length - 2 && s[i] === 't' && s[i+1] === 'a' && s[i+2] === 'n'){
		    stck.push('#');
		    i+=2;
		}
		else if (alphanumeric(s[i])) {
			while (alphanumeric(s[i])) {
				polish += s[i];
				i++;
			}
			i--;
			polish += " ";
		}
		//binary and unary functions here
		else if (s[i] == '(') {
			stck.push('(');
		}
		else if (s[i] == ')') {
			while (stck.length > 0 && stck[stck.length - 1] != '(') {
				var c = stck[stck.length - 1];
				polish += c;
				polish += " ";
				stck.pop();
				//function logic
			}
			stck.pop();
		}
		else {
			while (stck.length > 0 && stck[stck.length - 1] != '(') {
				if (prec[stck[stck.length - 1]] < prec[s[i]] || (stck[stck.length - 1] == '^' && s[i] == '^'))//possible strict
					break;
				polish += stck[stck.length - 1];
				var curr = stck[stck.length - 1];
				polish += " ";
				stck.pop();
			}
			stck.push(s[i]);
		}
	}
	while (stck.length > 0) {
		polish += stck[stck.length - 1];
		polish += " ";
		stck.pop();
	}
	return polish;
}

function parse(s) {
    var stck = [];
    for (var i = 0; i < s.length; i++) {
    	if (s[i] === ' ') {
    		continue;
    	}
    	if (alphanumeric(s[i])){
    		if (s[i] >= 'a' && s[i] <= 'z') {
    			var v1 = new Variable(1, s[i]);
    			stck.push(v1);
    			continue;
    		}
    		var numerical = 0;
    		while (s[i] >= '0' && s[i] <= '9' && i < s.length) {
    			numerical *= 10;
    			numerical += (s[i] - '0');
    			i++;
    		}
    		if (i < s.length && s[i] >= 'a' && s[i] <= 'z') {
    		    var v2 = new Variable(numerical, s[i]);
    			stck.push(v2);
    			i++;
    		}
    		else {
    			var c = new Constant(numerical);
    			stck.push(c);
    		}
    	}
    	else {
    		var u = stck.pop();
    		if (s[i] == ':'){
    		    var lg = new Logarithm(u);
    		    stck.push(lg);
    		}
    		else if (s[i] === '&'){
    		    var sn = new Trig(u, "sin");
    		    stck.push(sn);
    		}
    		else if(s[i] === '%'){
    		    var cs = new Trig(u, "cos");
    		    stck.push(cs);
    		}
    		else if(s[i] === '#'){
    		    var tn = new Trig(u, "tan");
    		    stck.push(tn);
    		}
    		else {
    			var v = stck.pop();
    			if (s[i] === '+') {
    			    var sum = new Sum([v, u]);
    				stck.push(sum);
    			}
    			else if (s[i] === '-') {
    			    var difference = new Difference(v, u);
    				stck.push(difference);
    			}
    			else if (s[i] === '*') {
    			    var prod = new Product(v, u);
    				stck.push(prod);
    			}
    			else if (s[i] === '/') {
    			    var q = new Quotient(v, u);
    				stck.push(q);
    			}
    			else if (s[i] === '^') {
    			    var exp = new Exponential(v, u);
    				stck.push(exp);
    			}
    		}
    	}
    }
    return stck[stck.length - 1];
}