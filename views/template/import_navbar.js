$( document ).ready(async function() {
    document.body.style.marginTop = "100px";
    var navbar_html_file;
    if (window.location.href.replace(/[^//]/g, "").length == 3) {
        navbar_html_file = await fetch("./template/navbar.html");
    } else {
        navbar_html_file = await fetch("../template/navbar.html");
    }
    
    document.body.innerHTML += `
    <div id="navbar_emplacement"></div>`
    const navbar_html = await navbar_html_file.text();
    document.getElementById("navbar_emplacement").innerHTML = navbar_html;
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
        html = ""
        if(response.statusText == "Unauthorized"){
          html += `
          <li style="margin-left: -450px"><button onclick="location.href='/login'">Login</button></li>
          <li><button onclick="location.href='/register'">Register</button></li>
          `
        } else {
          document.getElementById("navbar").style.marginBottom = "10px";
          document.getElementById("navbar").style.marginTop = "30px";
          html += `
          <li style="margin-left: -525px;margin-right: 25px">Hi <b>${response.name}</b></li>
          <li class="dropdown">
            <a>Menu</a>
            <div class="dropdown-menu">
                <a href="/userp">my profile</a>
                <a href="/userp/todos">my todos</a>
                <a href="/upuser">modify account</a>
                <a href="/deluser">delete an account</a>
            </div>
            <div class="container_icon">
                <div class="drop_down_menu_icon"></div>
                <div class="drop_down_menu_icon"></div>
                <div class="drop_down_menu_icon"></div>
            </div>
          </li>
          <li style="margin-left: 50px;"><button onclick="logout()" style="margin: 0px">Logout</button></li>
        `
        }
 
        document.getElementById("navbar").innerHTML = html
    })
});