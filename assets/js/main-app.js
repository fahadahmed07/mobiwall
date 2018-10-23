
// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
    // xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkFullName(){
    var fullName = document.getElementById("fullName").value;
    var flag = false;
    if(fullName.length < 8){
        flag = true;
    }
    if(flag){
        document.getElementById("fullNameError").style.display = "block"
    }else{
        document.getElementById("fullNameError").style.display = "none"
    }
}
    // xxxxxxxxxx Email Validation xxxxxxxxxx
function checkEmail(){
    var userEmail = document.getElementById("userEmail")    
    var emailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(emailFormate)){
        flag = false
    }else{
        flag = true
    }
    if(flag){
        document.getElementById("emailError").style.display = "block"
    }else{
        document.getElementById("emailError").style.display = "none"
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkPassword(){
    var userPassword = document.getElementById("userPassword")
    var passwordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/; //"\d" is shorthand for [0-9], lowercase, uppercase & six or more charachter   
    var flag;
    if(userPassword.value.match(passwordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("passwordError").style.display = "block"
    }else{
        document.getElementById("passwordError").style.display = "none"
    }
}
    // xxxxxxxxxx Submitting Form Data xxxxxxxxxx
function signUp(){
    var fullName = document.getElementById("fullName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    
    var emailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var passwordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/; //"\d" is shorthand for [0-9], lowercase, uppercase & six or more charachter   

    var checkEmailValid = userEmail.match(emailFormate);
    var checkPasswordValid = userPassword.match(passwordFormate);
    if(fullName.length < 8){
        return checkFullName();
    }else if(checkEmailValid == null){
        return checkEmail();
    }else if(checkPasswordValid == null){
        return checkPassword();
    }else{
        var userDetail = {
            fullName: fullName,
            userEmail: userEmail,
            userPassword: userPassword, 
        }
        var storeData = localStorage.setItem("userData", JSON.stringify(userDetail));
        swal('Account Successfully Created','Your account has been successfully created. Now you can Login to your account','success'
        ).then((value)=>{
            setTimeout(function(){
                window.location.assign("../index.html");
            }, 2000)
        });
    }
}

// xxxxxxxxxx Working For Log In Form xxxxxxxxxx
function LogIn(){
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    
    var getUserLocalData = localStorage.getItem("userData");
    var convertLocalToObj = JSON.parse(getUserLocalData);
    var userDetail = convertLocalToObj;
    if(getUserLocalData === null){
        swal({
            type: 'error',
            title:'Not Registered',
            text: 'Please create your account first then log in.'
            }).then((value)=>{
                var userEmail = document.getElementById("userEmail").value = "";
                var userPassword = document.getElementById("userPassword").value = "";       
                window.location.assign("./pages/sign-up.html");
        });
    }else{
        if(userEmail === userDetail.userEmail && userPassword === userDetail.userPassword){
            swal({
                type: 'success',
                title:'Successfully Log In',
            }).then((value)=>{
                var userEmail = document.getElementById("userEmail").value = "";
                var userPassword = document.getElementById("userPassword").value = "";
                window.location.assign("./pages/dashboard.html");
            });
        }else{
            swal('Failed to Log In','Enter a correct Email or Password Or If you do not have an account, Click on sign up','error'
            ).then((value)=>{
                var userEmail = document.getElementById("userEmail").value = "";
                var userPassword = document.getElementById("userPassword").value = "";       
            });
        }
    }
}