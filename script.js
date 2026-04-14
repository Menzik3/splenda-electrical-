function showProject(project){

const gallery = document.getElementById("project-gallery");

let images = "";

if(project === "rural"){
images = `
<img src="images/rural1.jpg">
<img src="images/rural2.jpg">
<img src="images/rural3.jpg">
`;
}

if(project === "mast"){
images = `
<img src="images/mast1.jpg">
<img src="images/mast2.jpg">
<img src="images/mast3.jpg">
`;
}

if(project === "domestic"){
images = `
<img src="images/domestic1.jpg">
<img src="images/domestic2.jpg">
<img src="images/domestic3.jpg">
`;
}

if(project === "refrigeration"){
images = `
<img src="images/ac1.jpg">
<img src="images/ac2.jpg">
<img src="images/fridge1.jpg">
`;
}

gallery.innerHTML = `<div class="gallery">${images}</div>`;

}

function scrollToSection(sectionId) {

document.getElementById(sectionId).scrollIntoView({
behavior: "smooth"
});

}