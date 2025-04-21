var modalInfo = {
  1: {
    title: "TinDog Website",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 11.3 | HTML, CSS, Bootstrap",
    link: "11.3-TinDog-Project/index.html",
    github: "#"
  },
  2: {
    title: "Dicee Game",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 17.124 | HTML, CSS, JavaScript",
    link: "17.124-Dicee-Game/index.html",
    github: "#"
  },
  3: {
    title: "Interactive Drum Kit",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 18.146 | HTML, CSS, JavaScript",
    link: "18.146-Drum-Kit/index.html",
    github: "#"
  },
  4: {
    title: "Simon Memory Game",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 20.160 | HTML, CSS, JavaScript",
    link: "20.160-Simon-Game/index.html",
    github: "#"
  },
  5: {
    title: "Band Name Generator",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 25.213 | Node.js, Express.js, EJS",
    link: "25.213-Band-Generator",
    github: "https://github.com/kelseywhytock/kelseywhytock.github.io/tree/main/25.213-Band-Generator"
  },
  6: {
    title: "Capstone - Blog Web App",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 26.215 | Node.js, Express.js, EJS",
    link: "26.215-Capstone-BlogApp",
    github: "https://github.com/kelseywhytock/kelseywhytock.github.io/tree/main/26.215-Capstone-BlogApp"
  },
  7: {
    title: "API Authorization Exercise",
    info: "Udemy – The Complete Full-Stack Web Development Bootcamp – Project 28.229 | Node.js, Express.js, EJS",
    link: "28.229-API-Authentication",
    github: "https://github.com/kelseywhytock/kelseywhytock.github.io/tree/main/28.229-API-Authentication"
  }
};

// Get the modal
var modal = document.getElementById('preview');

// button that opens the modal
var btn = document.getElementsByClassName("button");

// <span> that closes the modal
var span = document.getElementsByClassName("close")[0];

// open modal
for(let i = 0; i < btn.length; i++){
  btn[i].addEventListener("click", function() {
    var project = btn[i].parentElement;
    openModal(project);
  })
};

function openModal(project){
  var id = project.id;
  var title = project.title;
  var img = project.getElementsByTagName("img")[0].src;
  fillOut(id, img);
  modal.style.display = "block";
  document.getElementsByClassName("modal-content")[0].classList.add("scale");
}

function fillOut(id, img){
  document.getElementById("title").innerHTML = modalInfo[id].title;
  document.getElementById("info").innerHTML = modalInfo[id].info;
  document.getElementById("img").src = img;
  document.getElementById("live").onclick = function(){
    window.open(modalInfo[id].link,'_blank');
  }
  document.getElementById("github").onclick = function(){
    window.open(modalInfo[id].github,'_blank');
  }
}

// close the modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}