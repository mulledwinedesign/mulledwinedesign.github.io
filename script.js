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

const options = {threshold: buildThresholdList(10)}
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

let classNames = ["logo-container",""];
document.getElementsByClassName("dots").forEach(div => {

});

let node = document.getElementsByClassName("dots")[0];
let x = node.getBoundingClientRect().left;
let y = node.getBoundingClientRect().top + node.getBoundingClientRect().height/2;
let points = [{node.className:[x,y]}];
points.forEach(point => {

});

let pointsString = " ";

let path = document.getElementById("flowpath");
path.setAttribute("d","M"+pointsString+"Z");
