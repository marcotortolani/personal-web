const body = document.querySelector("body");

console.log("inicio");

const rrssIcons = document.querySelectorAll(".icon");


rrssIcons.forEach(el => {
    //console.log("asigna eventos: ", el);

    el.addEventListener("mouseover", e =>{
        //console.log(e);
        el.parentElement.parentElement.children[1].classList.remove("hide");
        el.parentElement.parentElement.children[1].classList.add("show-tag");

        setTimeout(() => {  
            el.parentElement.parentElement.children[1].classList.remove("show-tag");
            el.parentElement.parentElement.children[1].classList.add("hide-tag");

            setTimeout(() => {
                el.parentElement.parentElement.children[1].classList.remove("hide-tag");
                el.parentElement.parentElement.children[1].classList.add("hide");
            }, 500);

        }, 1500);
    })
});