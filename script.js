function buildThresholdList (numSteps) {
  let thresholds = [];

  for (let i=1.0; i<=numSteps; i++) {
    let ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0); // [0.01, 0.02, ..., 1, 0]
  // thresholds.push(0.000001); // [0.01, 0.02, ..., 1, 0.000001]

  return thresholds;
}

const options = {
  // root: null,
  // rootMargin: '0px 0px -50% 0px',
  threshold: buildThresholdList(100)
}

function callback (entries, observer) {
  // console.log(observer);

  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      data[0].push(entry.intersectionRatio); // store all visible ratios to be compared
      data[1].push(entry.target.id); // corresponding target id names
    } else {
      console.log("out of range");
    }
  });

  // ratios.sort((a, b) => a - b); // sort numbers in ascending order
  console.log(data);

  // ratios.forEach(ratio => {
  //   if (ratio === 1) {
  //     // if multiple targets are 100% visible, choose the topmost one
  //     btn.onclick = function() {
  //
  //       // change content to display entry.target in min view:
  //       // shift vp to left/right, or
  //       // currentlyReading.innerHTML = entry.target;
  //       // document.getElementById(entry.target).innerHTML = ;
  //     }
  //   }
  // });
  //
} // end of callback

const btn = document.querySelector('button');
let data = new Array();
data[0] = new Array();
data[1] = new Array();

let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('#test-target'));
document.querySelectorAll('.cs-cloudrone p').forEach(p => { observer.observe(p) });
