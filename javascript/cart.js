import nav from "../components/header.js";

document.getElementById("navbar").innerHTML=nav();

const cart=(data)=>{
    let sum=0;
    let sumq=0;

    data.map((item)=>{

        sum=sum+(item.qty * item.price);
        sumq=sumq+(item.qty);

        let tr=document.createElement("tr");

        let td1=document.createElement("td")
        td1.style.border="1px solid black"
        let bt=document.createElement("button")

        bt.innerHTML="DELETE"
        bt.style.color="RED"
        bt.style.padding="10px"
        bt.style.margin="20px"
        bt.style.borderRadius="100%"
        
        td1.append(bt)
        bt.addEventListener("click",()=>{
            cartdelete(item.id);
        })

        let td2=document.createElement("td")
        

        let img=document.createElement("img")
        img.src=item.image;
        img.style.width="150px"
        img.style.height="150px"
        img.style.border="1px solid black"
        img.style.padding="15px"

        td2.append(img);
        let td3=document.createElement("td")

        td3.innerHTML=item.title;
        td3.style.border="1px solid black"
        td3.style.padding="15px"

        let td4=document.createElement("td")
        td4.innerHTML=item.price;
        td4.style.border="1px solid black"
        td4.style.padding="15px"

        let td5=document.createElement("td")
        td5.style.border="1px solid black"
        td5.style.padding="15px"

        let btn1=document.createElement("button")
        // btn1.innerHTML="-"
        btn1.addEventListener("click",()=>{
            fetch(`http://localhost:3000/cart/${item.id}?${item.qty}`)
            .then((res)=>res.json)
            .then((data)=>{
                console.log(data);
                if(data.qty>0){
                    data.qty=data.qty-1;
                    fetch(`http://localhost:3000/cart/${data.id},${data.qty}`,{
                        method:"PATCH",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({...data})
                    })
                }
                else if (data.qty < 1){
                    cartdelete(data.id);
                }
                else{
                    // alert("please add to cart")
                }
            })
        })

        let qty=document.createElement("span")
        qty.innerHTML=item.qty;

        let btn2=document.createElement("button")
        // btn2.innerHTML="+";

        td5.append(btn1,qty,btn2);

        btn2.addEventListener("click",()=>{
            fetch(`http://localhost:3000/cart/${item.id}?${item.qty}`)
            .then((res)=>res.json)
            .then((data)=>{
                console.log(data);
                if(data.qty>0){
                    data.qty=data.qty + 1;
                    console.log(data.qty);
                    fetch(`http://localhost:3000/cart/${data.id}?${data.qty}`,{
                        method:"PATCH",
                        headers:{"Content-type":"application/json"},
                        body:JSON.stringify({...data})
                    })
                }
                else{
                    // alert("no item add to cart")
                }
            }) 
        })

        let td6=document.createElement("td")
        td6.innerHTML=item.price*item.qty;
        td6.style.border="1px solid black"
        td6.style.padding="15px"

        tr.append(td1,td2,td3,td4,td5,td6)

        document.getElementById("cartpage").append(tr);


    });

    document.getElementById("qtyt").innerHTML=sumq;
    document.getElementById("sumt").innerHTML=sum;
}

const cartdelete =(id)=>{
    fetch(`http://localhost:3000/cart/${id}`,{
        method : "DELETE"
    })
}

const get=async()=>{
    fetch(`http://localhost:3000/cart`)
    .then((res)=>res.json())
    .then((data)=>{
        cart(data);
    })
}

get();