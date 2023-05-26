$( document ).ready(function() {
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'GET',
        method: 'GET',
        url: "/user",
        headers: {
            "token":mytoken,
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 2000,
    }).always((response) => {
        if(response.statusText == "Unauthorized"){
            document.getElementById("check").style.color = "red";
            document.getElementById("check").innerHTML = "you are not logged in";
            setTimeout (() => {
                document.getElementById("aa").click();
            }, 3000);
        }
        html = `
        <ul>
            <li>
                <label for="id">ID:</label>
                <span id="id">${response.id}</span>
            </li>
            <li>
                <label for="name">Name:</label>
                <span id="name">${response.name}</span>
            </li>
            <li>
                <label for="first-name">First Name:</label>
                <span id="first-name">${response.firstname}</span>
            </li>
            <li>
                <label for="email">Email:</label>
                <span id="email">${response.email}</span>
            </li>
            <li>
                <label for="password">hashed Password:</label>
                <span id="password">${response.password}</span>
            </li>
            <li>
                <label for="created-at">Created At:</label>
                <span id="created-at">${response.created_at}</span>
            </li>
        </ul>
        `
        document.getElementById("infos").innerHTML = html
    })
});

function logout()
{
    document.cookie = 'token=null; path=/;';
    document.getElementById("aa").click();
}