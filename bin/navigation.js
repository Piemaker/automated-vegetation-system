const root = document.documentElement;
const scrollUpButton = document.getElementById("scroll-up-button");
const nav = document.getElementById("nav");
const menuButton = document.getElementById("menu");
const modal = document.getElementById("modal");
const closeButton = document.getElementById("close");
// function to bring button up to the top
const scrollUp = () => {
  root.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
scrollUpButton.addEventListener("click", scrollUp);
//shows button after 20% of scroll height
const handleScroll = () => {
  var scrollTotal = root.scrollHeight - root.clientHeight;
  console.log(scrollTotal, root.scrollTop);
  if (root.scrollTop / scrollTotal >= 0.2) {
    scrollUpButton.classList.add("show-scroll-button");
  } else {
    scrollUpButton.classList.remove("show-scroll-button");
  }
};

let previousScrollValue = root.scrollTop; //store value of previous scroll height then compare it with current scroll height to determine upward or downward movement
//makes button disappear when scrolling updwards and appear when scrolling beyond 20% of scroll height
const handelPosNegScroll = () => {
  var scrollTotal = root.scrollHeight - root.clientHeight;

  if (
    root.scrollTop > previousScrollValue &&
    root.scrollTop / scrollTotal >= 0.2
  ) {
    scrollUpButton.classList.add("show-scroll-button");
    nav.classList.add("hide-nav");
  } else {
    scrollUpButton.classList.remove("show-scroll-button");
    nav.classList.remove("hide-nav");
  }
  previousScrollValue = root.scrollTop;
};
document.addEventListener("scroll", handelPosNegScroll);
function handleClick() {
  if (modal.style.left != "0vw") {
    modal.style.left = "0vw";
    modal.style.background = "hsla(272, 13%, 6%, 0.5)";
  } else {
    modal.style.left = "-100vw";
    modal.style.background = "none";
  }
}
modal.addEventListener("click", (event) => {
  if (event.target == modal && modal.style.left == "0vw") {
    modal.style.left = "-100vw";
    modal.style.background = "none";
  }
});
closeButton.addEventListener("click", handleClick);
menu.addEventListener("click", handleClick);
