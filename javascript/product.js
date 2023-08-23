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
        title.style.color="white"

        let price = document.createElement("h2");
        price.innerHTML = item.price;
        price.style.paddingBottom="10px"
        price.style.color="white"


        let category = document.createElement("h4");
        category.innerHTML = item.category;
        category.style.paddingBottom="10px"
        category.style.color="white"

      
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

        let btn1=document.createElement("button")
        btn1.innerHTML="Buy Now"
        btn1.style.padding="10px 30px"
        btn1.style.borderRadius="10px"
        btn1.style.background="linear-gradient(45deg, rgba(93,98,13,1) 7%, rgba(53,97,53,1) 49%, rgba(13,95,98,1) 95%)"


        let btn2=document.createElement("button")
        btn2.innerHTML="Add to Cart"
        btn2.style.padding="10px 30px"
        btn2.style.borderRadius="10px"
        btn2.style.background="linear-gradient(45deg, rgba(93,98,13,1) 7%, rgba(53,97,53,1) 49%, rgba(13,95,98,1) 95%)"


        let div = document.createElement("div")
        div.style.borderRadius="10px"
        div.style.padding="10px"
        div.style.background="linear-gradient(45deg, rgba(93,98,13,1) 7%, rgba(53,97,53,1) 49%, rgba(13,95,98,1) 95%)"

        
        div.append(img, title, price, category, star, btn1 , btn2);
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

const handlecat=(cat)=>{
    fetch("http://localhost:3000/product")
    .then((res)=>res.json())
    .then((data)=>{
        let fil=data.filter((item)=>item.category==cat);
        // console.log(fil);
        product(fil);
    })
}
document.getElementById("all").addEventListener("click",()=>get());
document.getElementById("men").addEventListener("click",()=>handlecat("men's clothing"));
document.getElementById("women").addEventListener("click",()=>handlecat("women's clothing"));
document.getElementById("electronics").addEventListener("click",()=>handlecat("electronics"));
document.getElementById("Jewelery").addEventListener("click",()=>handlecat("jewelery"));

const search=()=>{
    let ser = document.getElementById("search").value;
    let sort = products.filter((item)=> item.title.toLowerCase().match(ser.toLowerCase()));
    product(sort);
}
document.getElementById("search").addEventListener("click",search);
document.getElementById("search").addEventListener("click",(e)=>{
    if(e.key == "Enter"){
        search()
    }
});
document.getElementById("search").addEventListener("input",()=>{
    search();
});


const get = async()=>{

    fetch(`http://localhost:3000/product`)
    .then((res)=> res.json())
    .then((pro)=>{
        products = pro;
        product(pro);
    })
}
get();

