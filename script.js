const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

function callback (entries, observer) {
  console.log(observer);
  entries.forEach(entry => {
    if (entry.isIntersecting == true && entry.intersectionRatio > 0.5) {
      console.log("intersection over 50%");
    }
    console.log(entry);
  });
}

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.case-study'));
