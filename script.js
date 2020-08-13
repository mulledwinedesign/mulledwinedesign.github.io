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
  let pointsString = "";
  let dots2BConnected = document.getElementsByClassName("dots");
  for(item of dots2BConnected) {
    let x = item.getBoundingClientRect().left + window.pageXOffset;
    let y = item.getBoundingClientRect().top + window.pageYOffset + item.clientHeight/2;
    points.push([x,y]);
  }
  points.forEach((item, i) => {
    pointsString += "M"+points[i][0]+" "+points[i][1]+"v10h10v-10h-10";
  });
  document.getElementById("flowpath").setAttribute("d",pointsString+"z");
}

updateViewBox();
connectDots();
window.addEventListener("resize", updateViewBox);
window.addEventListener("resize", connectDots);
