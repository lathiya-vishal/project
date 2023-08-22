import nav from "../components/header.js";

document.getElementById("navbar").innerHTML=nav();

const logindata=(e)=>{
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let emailcheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (! emailcheck.test(email)){
        document.getElementById("e-err").innerHTML = "** Invalid email !!";
    }
    else{
        document.getElementById("e-err").innerHTML = "";
    }

    if (! passwordcheck.test(password)){
        document.getElementById("p-err").innerHTML = "** Invalid Password !!";
    }
    else{
        document.getElementById("p-err").innerHTML = "";
    }

    if(emailcheck.test(email) && passwordcheck.test(password)){

        fetch(`http://localhost:3000/signupdata?email=${email}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);

            if (data.length > 0){
                if(data[0].password == password){
                    alert("login succeefully");
                    setTimeout(()=>{
                        window.location.href="/index.html";
                    }, 1000);
                    localStorage.setItem("loggedIn", true);
                }
                else{
                    document.getElementById("p-err").innerHTML = "** Incorrect Password !!";
                }
            }
            else{
                alert("User Not Found");
                    setTimeout(()=>{
                        window.location.href="/pages/signup.html"
                    }, 1000);
            }
        })
    }

    
}
document.getElementById("form").addEventListener("submit",logindata)