// event listner menu media query and responsivness
document.querySelector(".menu").addEventListener("click",()=>{ 
    document.querySelector(".left").style.left="0%"
})

//close button
document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-120%"

})

//login
function login(){
    document.querySelector(".btn").addEventListener("click",()=>{
        //alert("Hello moto")
        let uname=document.getElementById("nm").value;
                if(uname.length==0){
                    document.getElementById("txtnm").style.color="red";
                    document.getElementById("txtnm").innerHTML="Usename is required"
                }
        
        let pass=document.getElementById("pass").value;
        if(pass.length==0){ 
            document.getElementById("txtpass").style.color="red";
                    document.getElementById("txtpass").innerHTML="Password is required"
        }

        let checkbox=document.getElementById("agree")
        if(!checkbox.checked){
            document.getElementById("confirm").style.color="red"
            document.getElementById("confirm").innerHTML="Please accept the agreement to proceed"
        }
    })
}
login()

function register(){ 
    document.querySelector(".btn").addEventListener("click",()=>{


        //first name
        let fname=document.getElementById("fnm").value;
        if(fname.length==0){
            document.getElementById("txtfnm").style.color="red";
            document.getElementById("txtfnm").innerHTML="fullname is required"
        }

        //Username
        let uname=document.getElementById("nm").value;
                if(uname.length==0){
                    document.getElementById("txtnm").style.color="red";
                    document.getElementById("txtnm").innerHTML="Usename is required"
                }
        
        //Email
        let email1=document.getElementById("em").value;
        const pattern=/^[a-z A-Z 0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(email1.length==0){
            document.getElementById("emtxt").style.color="red"
            document.getElementById("emtxt").innerHTML="email is required"
        }
        else if(pattern.test(email1)==false){
            document.getElementById("emtxt").style.color="red"
            document.getElementById("emtxt").innerHTML="enter the valid email address"

        }

        //phone
        let phone=document.getElementById("phone").value;
        const pattern1=/^[0-9]{10}$/

        if(phone.length==0){
            document.getElementById("phtxt").style.color="red"
            document.getElementById("phtxt").innerHTML="Phone number is required"
        }
        else if(pattern1.test(phone)==false){
            document.getElementById("phtxt").style.color="red"
            document.getElementById("phtxt").innerHTML="enter the valid phone number"
        }
        
        //Password
        let p=document.getElementById("pass").value;
        let pattern12=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@.#$%^&-+=()])[A-Z a-z \d @.#$%^&*]{8,20}$/
        let txt=""

        if(p.length==0){
            txt+="Paasword is required"
        }
        
        else{
        if(p.length >15){
            txt+="Password is too long"+"<br>"
        }
        else if(p.length<8){ 
            txt+="Password is too short"+"<br>"
        }
    }

    if(p.length!=0){
        let p1=/[a-z]/
        let p2=/[A-Z]/
        let p3=/[0-9]/
        let p4=/[@.#$%^&*()]/
        if(p1.test(p)==false){ 
            txt+="Password contain at least 1 lower charecter"+"<br>"
        }
        if(p2.test(p)==false){ 
            txt+="Password contain at least 1 upper charecter"+"<br>"
        }
        if(p3.test(p)==false){ 
            txt+="Password contain at least 1 digit charecter"+"<br>"
        }
        if(p4.test(p)==false){ 
            txt+="Password contain at least 1 special charecter"+"<br>"
        }
    }
        
        document.getElementById("passtxt").style.color="red"
        document.getElementById("passtxt").innerHTML=txt;

        //confirm password
        let cpass=document.getElementById("cpass").value;
        if(cpass!=p){ 
            document.getElementById("cpasstxt").style.color="red"
            document.getElementById("cpasstxt").innerHTML="Password and confirm password must be same"
        }

        //checkbox
        let checkbox=document.getElementById("agree")
        if(!checkbox.checked){
            document.getElementById("confirm").style.color="red"
            document.getElementById("confirm").innerHTML="Please accept the agreement to proceed"
        }
    })
    
}
register()