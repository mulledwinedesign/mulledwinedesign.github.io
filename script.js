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

// svg flow line
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

function updateViewBox() {
  document.getElementsByClassName("flow")[0].setAttribute("viewBox","0 0 "+getViewportSize().width+" "+getViewportSize().height);
}

function connectDots() {
  let d = [];
  let dots2BConnected = document.getElementsByClassName("dots");
  for(item of dots2BConnected) {
    let xLeft = item.getBoundingClientRect().left +window.pageXOffset;
    let xRight = item.getBoundingClientRect().left +window.pageXOffset +item.clientWidth;
    let y = item.getBoundingClientRect().top +window.pageYOffset +item.clientHeight/2;
    d.push({xLeft:xLeft,xRight:xRight,y:y});
  }
  // console.log(d);
  document.getElementById("flowpath").setAttribute("d",
    "M"+d[0].xLeft +" "+d[0].y+
    "C"+d[0].xLeft+" "+(d[0].y+(d[1].y-d[0].y)*1.618)+","
       +(d[1].xRight+(d[0].xLeft-d[1].xRight)*0.618)+" "+d[1].y+","
       +d[1].xRight+" "+d[1].y+
    "M"+d[1].xLeft +" "+d[1].y+"h-20"+
    "C"+d[1].xLeft+" "+(d[1].y+(d[2].y-d[1].y)*0.618/2)+","
       +d[1].xLeft*0.618+" "+(d[1].y+(d[2].y-d[1].y)*0.618)+","
       +d[2].xLeft +" "+d[2].y+
    "M"+d[2].xRight+" "+d[2].y+
    "C"+(d[2].xRight+(d[3].xLeft-d[2].xRight)*0.3)+" "+d[2].y*0.95+","
       +(d[2].xRight+(d[3].xLeft-d[2].xRight)*0.6)+" "+d[2].y*1.01+","
       +d[3].xLeft +" "+d[3].y+
    "M"+d[3].xRight+" "+d[3].y+
    "L"+d[4].xRight+" "+d[4].y+
    "M"+d[4].xLeft +" "+d[4].y+
    "L"+d[5].xLeft +" "+d[5].y+
    "M"+d[5].xRight+" "+d[5].y+
    "L"+d[6].xLeft +" "+d[6].y+
    "M"+d[6].xRight+" "+d[6].y+
    "L"+d[7].xLeft +" "+d[7].y
  );
}

updateViewBox();
window.addEventListener("load", connectDots);
window.addEventListener("resize", updateViewBox);
window.addEventListener("resize", connectDots);

// svg recipe line: from 0 to 1
function draw0to1() {
  // get recipeBox size

  // update recipeBox viewBox
  document.getElementsByClassName("0to1")[0].setAttribute("viewBox","0 0 "+recipeBox.width+" "+recipeBox.height);

  // collect 0to1dots coordinates
  let d = [];
  let dots2BConnected = document.getElementsByClassName("0to1dots");
  for(item of dots2BConnected) {
    let xLeft = item.getBoundingClientRect().left +window.pageXOffset;
    let xRight = item.getBoundingClientRect().left +window.pageXOffset +item.clientWidth;
    let y = item.getBoundingClientRect().top +window.pageYOffset +item.clientHeight/2;
    d.push({xLeft:xLeft,xRight:xRight,y:y});
  }

  // connect 0to1dots to draw the line
  document.getElementById("0").setAttribute("cx",);
  document.getElementById("0").setAttribute("cy",);
  document.getElementById("0").setAttribute("r",);
  document.getElementById("0to1path").setAttribute("d",
    "M"+(d[0].xLeft-(gap))+" "+d[0].y+
    "H"+d[0].xLeft+" "+
    "M"+d[0].xRight+" "+d[0].y+
    "H"+d[1].xLeft+" "+
    "M"+d[1].xRight+" "+d[0].y+
    "H"+d[2].xLeft+" "+
    "M"+d[2].xRight+" "+d[0].y+
    "H"+d[3].xLeft+" "+
    "M"+d[3].xRight+" "+d[0].y+
    // "C"+  d[4].xLeft+" "+
    "M"+d[4].xRight+" "+d[0].y+
    "h"+(gap)
  );
  document.getElementById("1").setAttribute("x1",);
  document.getElementById("1").setAttribute("y1",);
  document.getElementById("1").setAttribute("x2",);
  document.getElementById("1").setAttribute("y2",);
}
window.addEventListener("load", draw0to1);
window.addEventListener("resize", draw0to1);
