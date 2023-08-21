import nav from "../components/header.js";

document.getElementById("navbar").innerHTML=nav();

let products=[];

const product =(data)=>{

    document.getElementById("productpage").innerHTML="";

    data.map((item)=>{

        let img = document.createElement("img");
        img.src = item.image;
        img.style.borderRadius="10px"
        img.style.paddingBottom="10px"

        let title = document.createElement("h2");
        title.innerHTML = item.title;
        title.style.paddingBottom="10px"

        let price = document.createElement("h3");
        price.innerHTML = item.price;
        price.style.paddingBottom="10px"

        let category = document.createElement("h4");
        category.innerHTML = item.category;
        category.style.paddingBottom="10px"
      
        let star = document.createElement("p");
        if (item.rating.rate > 4){
            star.innerHTML = "*****";
            star.style.color = "green";
        }
        else if ( item.rating.rate > 2 && item.rating.rate <= 3){
            star.innerHTML = "***";
            star.style.color = "orange";
        }
        else{
            star.innerHTML = "*";
            star.style.color = "red";
        }
        star.style.paddingBottom="10px"
        star.style.fontSize="50px"

        let div = document.createElement("div")
        div.style.borderRadius="10px"
        div.style.padding="10px"
        div.style.background="linear-gradient(45deg, rgba(93,98,13,1) 7%, rgba(53,97,53,1) 49%, rgba(13,95,98,1) 95%)"

        
        div.append(img, title, price, category, star);
        document.getElementById("productpage").append(div);
    })
};

const handellth =()=>{
    let lth = products.sort((a,b)=> a.price-b.price);
    console.log(lth)
    product(lth);
}
const handelhtl =()=>{
    let htl = products.sort((a,b)=> b.price-a.price);
    console.log(htl)
    product(htl);
}
document.getElementById("lth").addEventListener("click", handellth);
document.getElementById("htl").addEventListener("click", handelhtl);

const get = async()=>{

    fetch(`http://localhost:3000/product`)
    .then((res)=> res.json())
    .then((pro)=>{
        products = pro;
        product(pro);
    })
}
get();

