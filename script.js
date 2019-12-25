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

// const arr = [
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 }
// ];
// arr.sort((a,b) => a['name'].localeCompare(b['name'])); // sort by name string
// arr.sort((a,b) => a['value']-b['value']); // sort by value number
// data.sort((a,b) => a['id']-b['id']);

// Objects do not allow duplicate key values, old values are overwritten by the new values.
// const obj = { b: "one", a: "two", a: "three" };
// console.log(obj); // returns {b: "one", a: "three"}

// remove duplicates from array of objects
// const arr = [{a:1},{b:2},{a:1}];
// let brr = arr.filter((obj, index) => {
//   // return arr.map(obj['a']);
//   return arr.map(obj => obj['a']).indexOf(obj['a']) === index;
// }); // removes duplicate based on the key 'a'
// console.log(brr);

function callback (entries, observer) {
  // if (甲) { if (乙) {A} else if (丙) {B} else {A} }
  entries.forEach(entry => {
      if (entry.isIntersecting) { // 甲
        if (data === []) { // 乙
          // A
          // obj = {[entry.target.id]: {ratio: entry.intersectionRatio}}; // 1st new target
          // data.push(obj);
        } else if (.hasOwnProperty(entry.target.id)) { // 丙 target exists
            // B: for existing targets, update ratio only
        } else { // A: a little WET, but it's ok.
          // obj = {[entry.target.id]: {ratio: entry.intersectionRatio}}; // new target
          // data.push(obj);
        }
    }
    // console.log(obj[entry.target.id].ratio);
    // obj[entry.target.id].ratio = entry.intersectionRatio;
    // data.set(entry.target.id, {ratio: entry.intersectionRatio});
    // console.log(entry.target.id);
    // console.log(Object.keys(data[0])[0]);
    // console.log(obj);
    // console.log(data);
    // entry.forEach((intersectionRatio, target) => {
    //   ratio = this.intersectionRatio;
    //   id = this.target.id;
    //   //store [...{ratio,id}]
    //   console.log([ratio, id]);
    //
    // });
  });
} // end of callback

// const btn = document.querySelector('button');
// let obj = {};
let obj = {['']: {ratio:''}};
let data = [];
// let data = new Map();
// console.log(Object.keys(obj)[0]); // ''
// console.log(Object.values(obj)[0]); // {ratio:''}

let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('#test-target'));
document.querySelectorAll('.cs-cloudrone p').forEach(p => { observer.observe(p) });

// console.log(observer);

// var kvArray = [{key: 1, value: 10},
//                {key: 2, value: 20},
//                {key: 3, value: 30}];
//
// var reformattedArray = kvArray.map(obj =>{
//    var rObj = {};
//    rObj[obj.key] = obj.value;
//    return rObj;
// });

// data = [{ratio: entry.intersectionRatio, id: observer.target.id}, ...,
//         {ratio: entry.intersectionRatio, id: observer.target.id}];
// reformattedData = data.map(obj => {
//   let rObj = {};
//   data.forEach(
//
//   );
//   return rObj;
// });

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

// entries.sort((a, b) => b[0].localeCompare(a[0]));

// console.log(entries);
// console.log(entry);

// if (entry.isIntersecting) {
//   dataEntry.ratio = entry.intersectionRatio;
//   if (entry.target.id !== dataEntry.id) {
//     dataEntry.id = entry.target.id;
//   } else {
//     data.push(dataEntry);
//   }
//   data.sort((a, b) => a - b); // sort numbers in ascending order
//   data.sort((a, b) => a[0] - b[0]); // sort data by ratio in ascending order

//   console.log(data);
// } else {
//   console.log('out of range');
// }
