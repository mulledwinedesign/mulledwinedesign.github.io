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
  let points = [];
  let dots2BConnected = document.getElementsByClassName("dots");
  for(item of dots2BConnected) {
    // console.log(item);
    let xLeft = item.getBoundingClientRect().left +window.pageXOffset;
    let xRight = item.getBoundingClientRect().left +window.pageXOffset +item.clientWidth;
    let y = item.getBoundingClientRect().top +window.pageYOffset +item.clientHeight/2;
    points.push({xLeft:xLeft,xRight:xRight,y:y});
  }
  // console.log(points);
  document.getElementById("flowpath").setAttribute("d",
    "M"+points[0].xLeft +" "+points[0].y+
    "L"+points[1].xRight+" "+points[1].y+
    "M"+points[1].xLeft +" "+points[1].y+
    "L"+points[2].xLeft +" "+points[2].y+
    "M"+points[2].xRight+" "+points[2].y+
    "L"+points[3].xLeft +" "+points[3].y+
    "M"+points[3].xRight+" "+points[3].y+
    "L"+points[4].xRight+" "+points[4].y+
    "M"+points[4].xLeft +" "+points[4].y+
    "L"+points[5].xLeft +" "+points[5].y+
    "M"+points[5].xRight+" "+points[5].y+
    "L"+points[6].xLeft +" "+points[6].y+
    "M"+points[6].xRight+" "+points[6].y+
    "L"+points[7].xLeft +" "+points[7].y);
}

updateViewBox();
connectDots();
window.addEventListener("resize", updateViewBox);
window.addEventListener("resize", connectDots);
