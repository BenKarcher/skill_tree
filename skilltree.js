var canvas;
var ctx;
var learned;
var sidebar;
const zoom = { x: 0, y: 0, scale: 1 };
function resize() {
    if (window.innerWidth > window.innerHeight) {
        canvas.width = Math.floor(window.innerWidth / 2);
        canvas.height = window.innerHeight;
    } else {
        canvas.height = Math.floor(window.innerHeight / 2);
        canvas.width = window.innerWidth;
    }
}
function setTransform() {
    ctx.setTransform(zoom.scale, 0, 0, zoom.scale, zoom.x + canvas.width / 2, zoom.y + canvas.height / 2);
}
function onMouseUp(e) {
    const x = ((e.offsetX || e.layerX) - canvas.width / 2 - zoom.x) / zoom.scale;
    const y = ((e.offsetY || e.layerY) - canvas.height / 2 - zoom.y) / zoom.scale;

    console.log("up", x, y);
    for (let skill in skills) {
        if (learned[skill] == undefined || learned[skill][0] == -1)
            continue;
        if ((x - skills[skill].x) ** 2 + (y - skills[skill].y) ** 2 < 625) {
            display(skills[skill], learned[skill][0], learned[skill][1]);
        }
    }
}
function display(skill, show, level) {
    sidebar.innerHTML = "";

    let div = document.createElement("div");
    div.classList.add("title")
    div.innerText = 0 < show ? skill.name : "???";
    sidebar.appendChild(div);

    div = document.createElement("div");
    div.classList.add("type")
    div.innerText = 0 < show ? skill.type : "???";
    sidebar.appendChild(div);

    for (let i = 0; i < skill.descriptions.length; i++) {
        div = document.createElement("div");
        div.innerText = i < show ? skill.descriptions[i] : "???";
        div.classList.add(i < level ? "learned" : "unlearned");
        div.classList.add("skill")
        sidebar.appendChild(div);
    }
}
function onScroll(e) {
    e.preventDefault();
    const factor = 1 - e.deltaY * 0.005;
    zoom.scale *= factor;
    zoom.x *= factor;
    zoom.y *= factor;
}
function onMouseMove(e) {
    if (e.buttons) {
        zoom.x += e.movementX;
        zoom.y += e.movementY;
    }
    //console.log("move", e);
}
function circle(x, y, rad, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, rad, 0, 2 * Math.PI, false);
    ctx.fill();
}
function drawSkill(skill, level) {
    if (level == 0) {
        circle(skill.x, skill.y, 25, "rgb(166, 166, 166)");
    } else {
        for (let i = level - 1; i >= 0; i--) {
            circle(skill.x, skill.y, 25 + 3 * i, ["rgb(255, 204, 102)", "rgb(102, 204, 255)", "rgb(255, 0, 0)", "rgb(0, 0, 0)"][i])
        }
    }
    ctx.font = '8pt Calibri';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(skill.name, skill.x, skill.y + 3);
}
function render() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Restore the transform
    setTransform();
    //logic
    ctx.beginPath()
    ctx.lineWidth = 5;
    ctx.fillStyle = "black";
    for (let skill in skills) {
        s1 = skills[skill];
        if (learned[skill] == undefined || learned[skill][0] == -1)
            continue;
        for (prerec of s1.preRecs) {
            s2 = skills[prerec]
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
        }
    }
    ctx.stroke();
    for (let skill in skills) {
        if (learned[skill] == undefined || learned[skill][0] == -1)
            continue;
        drawSkill(skills[skill], learned[skill][1]);
    }
    window.requestAnimationFrame(render);
}
window.onload = function () {
    let text = window.location.search;
    if (text == "?yogi") {
        learned = yogi;
    } else if (text == "?fira") {
        learned = fira;
    } else {
        window.alert("invalid url");
        return;
    }
    canvas = document.getElementById('tree');
    ctx = canvas.getContext('2d');
    sidebar = document.getElementById('sidebar');
    resize();
    window.onresize = resize;
    canvas.addEventListener("wheel", onScroll, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
    render();

};