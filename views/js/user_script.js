function delacc() {
    let id = document.getElementById("userid").value;
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'DELETE',
        method: 'DELETE',
        url: "/users/" + id,
        headers: {
            "token":mytoken,
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 2000,
    }).always((response) => {
        if(response.token != undefined){
            document.cookie = 'token=' + response.token+'; path=/;';
        }
        if (response.responseJSON != undefined) {
            document.getElementById("check").style.color = "red";
            document.getElementById("check").innerHTML = response.responseJSON.msg;
        } else {
            document.getElementById("check").innerHTML = "successfully deleted";
            document.getElementById("check").style.color = "green";
            setTimeout (() => {
                document.getElementById("aa").click();
            }, 3000);
        }
        setTimeout(() => {
            document.getElementById("check").innerHTML = "";
            document.getElementById("check").style.color = "";
        }, 6000);
    })
}

function modifaccount() {
    let jsondata = `
    {
    "email": "${document.getElementById("email").value}",
    "name": "${document.getElementById("name").value}",
    "firstname": "${document.getElementById("firstname").value}",
    "password": "${document.getElementById("password").value}"
    }`;
    let id = document.getElementById("userid").value;
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'PUT',
        method: 'PUT',
        url: "/users/" + id,
        data: jsondata,
        headers: {
            "token":mytoken,
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 2000,
    }).always((response) => {
        if(response.token != undefined){
            document.cookie = 'token=' + response.token+'; path=/;';
        }
        if (response.responseJSON != undefined) {
            document.getElementById("check").style.color = "red";
            document.getElementById("check").innerHTML = response.responseJSON.msg;
        } else {
            document.getElementById("check").innerHTML = "successfully modified";
            document.getElementById("check").style.color = "green";
            setTimeout (() => {
                document.getElementById("aa").click();
            }, 3000);
        }
        setTimeout(() => {
            document.getElementById("check").innerHTML = "";
            document.getElementById("check").style.color = "";
        }, 6000);
    })
}

function login()
{
    let jsondata = `
    {
        "email": "${document.getElementById("email").value}",
        "password": "${document.getElementById("password").value}"
    }`;
    $.ajax({
        type: 'POST',
        method: 'POST',
        url: "/login",
        data: jsondata,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 20000,
    }).always((response) => {
        if (response.responseJSON != undefined) {
            document.getElementById("check").style.color = "red";
            document.getElementById("check").innerHTML = response.responseJSON.msg;
        } else {
            document.getElementById("check").innerHTML = "successfully logged in";
            document.getElementById("check").style.color = "green";
            setTimeout (() => {
                document.getElementById("aa").click();
            }, 3000);
        }
        
        if(response.token != undefined){
            document.cookie = 'token=' + response.token+'; path=/;';
        }
        setTimeout(() => {
            document.getElementById("check").innerHTML = "";
            document.getElementById("check").style.color = "";
        }, 6000);
    })
}

function register()
{
    let jsondata = `
    {
        "email": "${document.getElementById("email").value}",
        "name": "${document.getElementById("name").value}",
        "firstname": "${document.getElementById("firstname").value}",
        "password": "${document.getElementById("password").value}"
        }`;
    $.ajax({
        type: 'POST',
        method: 'POST',
        url: "/register",
        data: jsondata,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 20000,
    }).always((response) => {
        if (response.responseJSON != undefined) {
            document.getElementById("check").style.color = "red";
            document.getElementById("check").innerHTML = response.responseJSON.msg;
        } else {
            document.getElementById("check").innerHTML = "successfully registered";
            document.getElementById("check").style.color = "green";
            setTimeout (() => {
                document.getElementById("aa").click();
            }, 3000);
        }
        if (response.token != undefined){
            document.cookie = 'token=' + response.token+'; path=/;';
        }
        setTimeout(() => {
            document.getElementById("check").innerHTML = "";
            document.getElementById("check").style.color = "";
        }, 6000);
    })
}

function logout()
{
    document.cookie = 'token=null; path=/;';
    document.getElementById("aa").click();
}