function Submission (form) {
    var o = document.getElementById("output");
    var f = document.createElement("p");
    f.setAttribute("class", "output_title");
    o.innerHTML = "";
    o.appendChild(f);
    var e = form.experimental.value;
    var respect = form.respect_to.value;
    var sh = shunting_yard(e);
    f.append("Your input");
    if(respect !== "")
        f.append(", with respect to ");
    f.append(respect);
    f.append(":");
    var ptr = parse(sh);
    f = document.createElement("p");
    f.setAttribute("class", "output_box");
    o.appendChild(f);
    ptr.print(f);
    ptr.diff(respect);
    f.append(document.createElement("br"))
    f = document.createElement("p");
    f.setAttribute("class", "output_title");
    o.appendChild(f);
    f.append("In reverse Polish: ");
    f = document.createElement("p");
    f.setAttribute("class", "output_box");
    o.appendChild(f);
    f.append(sh);
    f = document.createElement("p");
    f.setAttribute("class", "output_title");
    o.appendChild(f);
    f.append("Derivative: ");
    f = document.createElement("p");
    f.setAttribute("class", "output_box");
    o.appendChild(f);
    ptr.derivative.print(f);
    document.getElementById("reset_button").click();
}