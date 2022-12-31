const body = document.querySelector("body");

let currentDate = new Date();

let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();


if ( body.className === "home") {
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
}

if (body.className === "blog"){


    const postsBlog = document.getElementById("posts-blog");
    const postTemplate = document.getElementById("post-template");
    const fragment = document.createDocumentFragment();

    //const buttonMore01 = document.getElementById("button-more-1");
    


    // buttonMore.forEach(el => {
    //     console.log(el);
    // });

    


    

    const getBlogData = async () => {
        
        const blogData = await fetch("../content/blog/blog.json")
            .then( res => {
                console.log("Respuesta: ", res);
                return res.json();
            })
            .catch( err => {
                console.log("Error: ", err);
            });

        const blogDataJson = await blogData;

        

        renderBlogData(blogDataJson.blog);

    }

    document.addEventListener("DOMContentLoaded", getBlogData());

    const renderBlogData = (blogData) => {
        
        //console.log(blogData);

        // let clonePost = document.importNode(postTemplate, true);

        // let idPostClon = clonePost.children[0].children[0].children[0];
        // let titlePostClon = clonePost.children[1];
        // let datePostClon = clonePost.children[2].children[0];
        // let dateSinceClon = clonePost.children[2].children[1];
        // let paragraphsPostClon = clonePost.children[3];



        blogData.forEach(el => {
            
            let clonePost = document.importNode(postTemplate, true);

            let idPostClon = clonePost.children[0].children[0].children[0];
            let titlePostClon = clonePost.children[1];
            let datePostClon = clonePost.children[2].children[0];
            let dateSinceClon = clonePost.children[2].children[1];
            let paragraphsPostClon = clonePost.children[3];
            let buttonMorePostClon = clonePost.children[4];

            

            // // id-post
            // console.log(clonePost.children[0].children[0].children[0].textContent);            
            // // title-post
            // console.log(clonePost.children[1].textContent);
            // // date-post
            // console.log(clonePost.children[2].children[0].textContent);
            // // date-since
            // console.log(clonePost.children[2].children[1].textContent);
            // // paragraphs-post
            // console.log(clonePost.children[3].textContent);


            el.id < 10 ? idPostClon.textContent = "00" + el.id : 
            el.id < 100 ? idPostClon.textContent = "0" + el.id : 
                         idPostClon.textContent = el.id;

            titlePostClon.textContent = el.title;
            datePostClon.textContent = el.date;
            dateSinceClon.textContent = calculateBetweenDates (el.date);
        
            if(el.paragraphs.length > 1){
                let text = "";

                for (let i = 0; i < el.paragraphs.length; i++) {                    
                    if(i === el.paragraphs.length - 1){
                        text = text + el.paragraphs[i];
                    }else{
                        text = text + el.paragraphs[i] + "<br><br>";
                    }
                }
                    
                paragraphsPostClon.innerHTML = text;
            }else{
                paragraphsPostClon.innerHTML = el.paragraphs;
            };

            clonePost.id = "post" + "-" + el.id;
            buttonMorePostClon.id = buttonMorePostClon.id + "-" + el.id; 
            buttonMorePostClon.classList.add("button-more-text");

            buttonMorePostClon.addEventListener("click", e => collapseUnfoldPost(e));
            

            clonePost.classList.remove("hide");
            fragment.appendChild(clonePost);
            //postTemplate.classList.add("hide");

        });

        postsBlog.appendChild(fragment);

    }

    const calculateBetweenDates = ( datePosted ) => {

        let timePostedText = "";
    
        let dayPosted = datePosted.split("-")[0];
        let monthPosted = datePosted.split("-")[1];
        let yearPosted = datePosted.split("-")[2];

        
        if (currentYear > yearPosted) {
            if ((currentYear - yearPosted) > 1) {
                return `Posteado hace más de ${currentYear-yearPosted} años`;    
            }else{
                return `Posteado hace más de ${currentYear-yearPosted} año`;    
            }
        }
        
        if (currentMonth > monthPosted){
            if ((currentMonth - monthPosted) > 1) {
                return `Posteado hace más de ${currentMonth-monthPosted} meses`;    
            }else{
                return `Posteado hace más de ${currentMonth-monthPosted} mes`;    
            }
        }   

        if (currentDay > dayPosted){
            if ((currentDay - dayPosted) > 1) {
                return `Posteado hace ${currentDay-dayPosted} días`;    
            }else{
                return `Posteado hace ${currentDay-dayPosted} día`;    
            }
        } 

        if (currentDay = dayPosted){
            return `Posteado hoy`;    
        }

    }


    const collapseUnfoldPost = (e) => {

        if (e.target.parentElement.classList.contains("collapsed")) {
            e.target.parentElement.classList.remove("collapsed");
            e.target.textContent = "Ver menos...";
        }else{
            e.target.parentElement.classList.add("collapsed");
            e.target.textContent = "Leer post";
        }
    
    }

}