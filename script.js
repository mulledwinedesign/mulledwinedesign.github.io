// Intersection Observer
let obj = {['']: {ratio:''}};
let data = [];
function buildThresholdList (numSteps) {
  let thresholds = [];
  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }
  thresholds.push(0);
  return thresholds;
}
function idExistsInData(id) {
  let bool;
  data.forEach(element => {bool = element.hasOwnProperty(id)});
  return bool;
}
const options = {threshold: buildThresholdList(10)};
function callback (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      obj = {[entry.target.id]: {ratio: entry.intersectionRatio}};
      if (data.length === 0) {data.push(obj);}
      else if (idExistsInData(entry.target.id)) {
        for (const ele of data) {
          if (Object.keys(ele)[0] === Object.keys(obj)[0]) {
            Object.values(ele)[0].ratio = Object.values(obj)[0].ratio;
          }
        }
      } else {data.push(obj);}
    }
  });
}
let observer = new IntersectionObserver(callback, options);
document.querySelectorAll('.cs-cloudrone p').forEach(p => { observer.observe(p) });

// svg flow
function getViewportSize() {
  let docEle = (document.compatMode && document.compatMode === "CSS1Compat") ? document.documentElement : document.body;
  let w = docEle.clientWidth;
  let h = docEle.clientHeight;
  // mobile zoomed in?
  if (window.innerWidth && w > window.innerWidth) {
    w = window.innerWidth;
    h = window.innerHeight;
  }
  return {width: w, height: h};
}
function collectNodeCoordinates(nodeClassName) {
  let coord = [];
  let nodes = document.getElementsByClassName(nodeClassName);
  for(item of nodes) {
    let xLeft = item.getBoundingClientRect().left +window.pageXOffset;
    let xRight = item.getBoundingClientRect().right +window.pageXOffset;
    let relativeY = item.getBoundingClientRect().height/2;
    let y = item.getBoundingClientRect().top +window.pageYOffset +relativeY;
    coord.push({xLeft:xLeft,xRight:xRight,relativeY:relativeY,y:y});
  }
  return coord;
}
function drawFlow() {
  // update viewBox size
  document.getElementsByClassName("flow")[0].setAttribute("viewBox","0 0 "+getViewportSize().width+" "+getViewportSize().height);
  // draw flow
  let n = collectNodeCoordinates("flowNode");
  document.getElementById("flowPath").setAttribute("d",
    "M"+n[0].xLeft +" "+n[0].y+
    "C"+n[0].xLeft+" "+(n[0].y+(n[1].y-n[0].y)*1.618)+","
       +(n[1].xRight+(n[0].xLeft-n[1].xRight)*0.618)+" "+n[1].y+","
       +n[1].xRight+" "+n[1].y+
    "M"+n[1].xLeft +" "+n[1].y+"h-20"+
    "C"+n[1].xLeft+" "+(n[1].y+(n[2].y-n[1].y)*0.618/2)+","
       +n[1].xLeft*0.618+" "+(n[1].y+(n[2].y-n[1].y)*0.618)+","
       +n[2].xLeft +" "+n[2].y+
    "M"+n[2].xRight+" "+n[2].y+
    "C"+(n[2].xRight+(n[3].xLeft-n[2].xRight)*0.3)+" "+n[2].y*0.95+","
       +(n[2].xRight+(n[3].xLeft-n[2].xRight)*0.6)+" "+n[2].y*1.01+","
       +n[3].xLeft +" "+n[3].y+
    "M"+n[3].xRight+" "+n[3].y+
    "L"+n[4].xRight+" "+n[4].y+
    "M"+n[4].xLeft +" "+n[4].y+
    "L"+n[5].xLeft +" "+n[5].y+
    "M"+n[5].xRight+" "+n[5].y+
    "L"+n[6].xLeft +" "+n[6].y+
    "M"+n[6].xRight+" "+n[6].y+
    "L"+n[7].xLeft +" "+n[7].y
  );
}
window.addEventListener("load", drawFlow);
window.addEventListener("resize", drawFlow);

// svg recipe line: from 0 to 1
function drawRecipe() {
  // update recipeBox's viewBox size
  let recipeBox = document.getElementsByClassName("recipeBox")[0];
  document.getElementsByClassName("zero2one")[0].setAttribute("viewBox","0 0 "+recipeBox.getBoundingClientRect().width+" "+recipeBox.getBoundingClientRect().height);

  let c = collectNodeCoordinates("recipeNode");
  // draw 0
  let gap = c[0].xLeft-recipeBox.getBoundingClientRect().left;
  let y = c[0].relativeY;
  console.log(c[0].relativeY);
  let r = gap*.1618;
  document.getElementById("zero").setAttribute("cx",c[0].xLeft-gap-r);
  document.getElementById("zero").setAttribute("cy",y);
  document.getElementById("zero").setAttribute("r",r);
  // connect 0to1nodes to draw the line
  document.getElementById("zero2onePath").setAttribute("d",
    "M"+(c[0].xLeft-gap)+" "+y+
    "H"+c[0].xLeft+" "+
    "M"+c[0].xRight+" "+y+
    "H"+c[1].xLeft+" "+
    "M"+c[1].xRight+" "+y+
    "H"+c[2].xLeft+" "+
    "M"+c[2].xRight+" "+y+
    "H"+c[3].xLeft+" "+
    "M"+c[3].xRight+" "+y+
    // "C"+  c[4].xLeft+" "+
    "M"+c[4].xRight+" "+y+
    "h"+gap
  );
  // draw 1
  document.getElementById("one").setAttribute("x1",c[4].xRight+gap);
  document.getElementById("one").setAttribute("y1",y-r);
  document.getElementById("one").setAttribute("x2",c[4].xRight+gap);
  document.getElementById("one").setAttribute("y2",y+r);
}
window.addEventListener("load", drawRecipe);
window.addEventListener("resize", drawRecipe);
