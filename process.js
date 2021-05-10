function Display (message){
    var o = document.getElementById("output");
    var f = document.createElement("p");
    f.setAttribute("class", "output_title");
    o.appendChild(f);
    f.append(message);
    f = document.createElement("p");
    f.setAttribute("class", "output_box");
    o.appendChild(f);
    return f;
}

function Submission (form) {
    document.getElementById("output").innerHTML = "";
    var e = form.experimental.value;
    var respect = form.respect_to.value;
    var sh = shunting_yard(e);
    var str = "Your input";
    if(respect !== "")
        str += ", with respect to ";
    str += respect;
    str += ":";
    var ptr = parse(sh);
    ptr.print(Display(str));
    ptr.diff(respect);
    Display("In reverse Polish:").append(sh);
    ptr.derivative.print(Display("Derivative:"));
}

function Roots (form) {
	document.getElementById("output").innerHTML = "";
	var func = form.func.value;
	var sh = shunting_yard(func);
	var ptr = parse(sh);
	ptr.print(Display("Your input"));
	var x = Newton(ptr, form.wrt.value, parseInt(form.guess.value), 30);
	var str = "Root, near ";
	str += form.guess.value;
	Display(str).append(x);
}
