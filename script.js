let obj = {['']: {ratio:''}};
// console.log(Object.keys(obj)[0]); // ''
// console.log(Object.values(obj)[0]); // {ratio:''}
let data = [];

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

function idExistsInData(id) {
  let bool;
  data.forEach(element => {bool = element.hasOwnProperty(id)});
  return bool;
}

const options = {
  // root: null,
  // rootMargin: '0px 0px -50% 0px',
  threshold: buildThresholdList(10)
}

function callback (entries, observer) {
  // if (甲) { if (乙) {A} else if (丙) {B} else {A} }
  entries.forEach(entry => {
    if (entry.isIntersecting) { // 甲
      // console.log(entry.target.id, entry.intersectionRatio);
      obj = {[entry.target.id]: {ratio: entry.intersectionRatio}}; // current id n ratio
      if (data.length === 0) { // 乙
        data.push(obj); // A
      } else if (idExistsInData(entry.target.id)) { // 丙 id exists
        // B: update ratio only
        for (const ele of data) {
          if (Object.keys(ele)[0] === Object.keys(obj)[0]) {
            Object.values(ele)[0].ratio = Object.values(obj)[0].ratio;
          }
        }
        // console.log(data);
      } else { // for new id, A again. a little WET, but it's ok.
        data.push(obj);
        // console.log(data); // debug tip: array keeps updating until – number shown – it's manually unfolded
      }
    }
  });
} // end of callback

let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('#test-target'));
document.querySelectorAll('.cs-cloudrone p').forEach(p => { observer.observe(p) });
