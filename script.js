const options = {
  // root: null,
  rootMargin: '0px 0px 50% 0px',
  // threshold: 0
}

function callback (entries, observer) {
  console.log(observer);

  entries.forEach(entry => {
    console.log(entry);

    if (entry.isIntersecting == true && entry.intersectionRatio >= 0.3) {
      console.log("intersection over 30%");
    }
  });
}

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('#test-target'));
