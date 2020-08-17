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
  let p = [];
  let dots2BConnected = document.getElementsByClassName("dots");
  for(item of dots2BConnected) {
    let xLeft = item.getBoundingClientRect().left +window.pageXOffset;
    let xRight = item.getBoundingClientRect().left +window.pageXOffset +item.clientWidth;
    let y = item.getBoundingClientRect().top +window.pageYOffset +item.clientHeight/2;
    p.push({xLeft:xLeft,xRight:xRight,y:y});
  }
  // console.log(p);
  document.getElementById("flowpath").setAttribute("d",
    "M"+p[0].xLeft +" "+p[0].y+
    "C"+p[0].xLeft+" "+(p[0].y+(p[1].y-p[0].y)*1.618)+","
       +(p[1].xRight+(p[0].xLeft-p[1].xRight)*0.618)+" "+p[1].y+","
       +p[1].xRight+" "+p[1].y+
    "M"+p[1].xLeft +" "+p[1].y+
    "C"+p[1].xLeft+" "+(p[1].y+(p[2].y-p[1].y)*0.618/2)+","
       +p[1].xLeft*0.618+" "+(p[1].y+(p[2].y-p[1].y)*0.618)+","
       +p[2].xLeft +" "+p[2].y+
    "M"+p[2].xRight+" "+p[2].y+
    "C"+(p[2].xRight+(p[3].xLeft-p[2].xRight)*0.3)+" "+p[2].y*0.95+","
       +(p[2].xRight+(p[3].xLeft-p[2].xRight)*0.6)+" "+p[2].y*1.01+","
       +p[3].xLeft +" "+p[3].y+
    "M"+p[3].xRight+" "+p[3].y+
    "L"+p[4].xRight+" "+p[4].y+
    "M"+p[4].xLeft +" "+p[4].y+
    "L"+p[5].xLeft +" "+p[5].y+
    "M"+p[5].xRight+" "+p[5].y+
    "L"+p[6].xLeft +" "+p[6].y+
    "M"+p[6].xRight+" "+p[6].y+
    "L"+p[7].xLeft +" "+p[7].y);
}

updateViewBox();
window.addEventListener("load", connectDots);
window.addEventListener("resize", updateViewBox);
window.addEventListener("resize", connectDots);
