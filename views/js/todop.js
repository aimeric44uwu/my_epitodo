$( document ).ready(function() {
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'GET',
        method: 'GET',
        url: "/user/todos",
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
                document.getElementById("bb").click();
            }, 3000);
        } else {
        var index = 0;
        var html = ``;
        while (response[index] != undefined){
            let options = `
            <option class="not_started" value="not started">not started</option>
            <option class="todo" value="todo">todo</option>
            <option class="in_progress" value="in progress">in progress</option>
            <option class="done" value="done">done</option>`;
            if (response[index].status == "not started")
                options = `
                <option class="not_started" value="not started" selected="selected">not started</option>
                <option class="todo" value="todo">todo</option>
                <option class="in_progress" value="in progress">in progress</option>
                <option class="done" value="done">done</option>`;
            if (response[index].status == "todo")
                    options = `
                    <option class="not_started" value="not started">not started</option>
                    <option class="todo" value="todo" selected="selected">todo</option>
                    <option class="in_progress" value="in progress">in progress</option>
                    <option class="done" value="done">done</option>`;
            if (response[index].status == "in progress")
                    options = `
                    <option class="not_started" value="not started">not started</option>
                    <option class="todo" value="todo">todo</option>
                    <option class="in_progress" value="in progress" selected="selected">in progress</option>
                    <option class="done" value="done">done</option>`;
            if (response[index].status == "done")
                    options = `
                    <option class="not_started" value="not started">not started</option>
                    <option class="todo" value="todo">todo</option>
                    <option class="in_progress" value="in progress">in progress</option>
                    <option class="done" value="done" selected="selected">done</option>`;
            html += `
            <tr>
                <td style="background-color: transparent; border: none;">
                    <button style="margin-top: -10px" type="button" onclick="modifytodos(${response[index].id})">modify</button>
                </td>
                <td><input type="text" id="title_${response[index].id}" name="title" value="${response[index].title}"></td>
                <td><input type="text" id="description_${response[index].id}" name="description" value="${response[index].description}"></td>
                <td><input type="date" id="creation_date_${response[index].id}" value="${response[index].created_at.slice(0, -14)}"></td>
                <td><input type="date" id="due_date_${response[index].id}" value="${response[index].due_time.slice(0, -14)}"></td>
                <td>
                    <select id="todo_status_${response[index].id}" class="${response[index].status.replace(/ /g, "_")}" onchange="update_select_color(${response[index].id})">
                        ${options}
                    </select>
                </td>
                <td><input type="text" id="user_id_${response[index].id}" name="user_id" value="${response[index].user_id}" style="width: 40px"></td>
                <td style="background-color: transparent; border: none;">
                    <button style="margin-top: -10px; margin-bottom: -10px" type="button" onclick="deletetodos(${response[index].id})">delete</button>
                </td>
            </tr>
        `
        index++;
        };
        html += `
        <tr>
        <td style="background-color: transparent; border: none;"></td>
        <td><input style="border: 1px solid #000;" type="text" id="title_new_todo" name="title" value=""></td>
        <td><input style="border: 1px solid #000;" type="text" id="description_new_todo" name="description" value=""></td>
        <td><input type="date" id="creation_date_new_todo" value=""></td>
        <td><input type="date" id="due_date_new_todo" value=""></td>
        <td>
            <select style="border: 1px solid #000;" class="todo" id="todo_status_new_todo" onchange="update_select_color('new_todo')">
                <option class="not_started" value="not started">not started</option>
                <option class="todo" value="todo" selected="selected">todo</option>
                <option class="in_progress" value="in progress">in progress</option>
                <option class="done" value="done">done</option>
            </select>
        </td>
        <td><input type="text" id="user_id_new_todo" name="user_id" value="" style="width: 40px;border: 1px solid #000;"></td>
        <td style="background-color: transparent; border: none;">
            <button type="button" onclick="addatodo()">add todos</button>
        </td>
    </tr>
        `
        document.getElementById("todo_list").innerHTML = html
    }
    })
});

function update_select_color(id) {
    let select = document.getElementById(`todo_status_${id}`);
    let selected = select.options[select.selectedIndex].value;
    select.className = selected.replace(/ /g, "_");
}

function modifytodos(id) {
    let jsondata = `{
        "title": "${document.getElementById(`title_${id}`).value}",
        "description": "${document.getElementById(`description_${id}`).value}",
        "due_time": "${document.getElementById(`due_date_${id}`).value}",
        "user_id": "${document.getElementById(`user_id_${id}`).value}",
        "status": "${document.getElementById(`todo_status_${id}`).selectedOptions[0].value}"
    }`;
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'PUT',
        method: 'PUT',
        url: "/todos/"+id,
        data: jsondata,
        headers: {
            "token":mytoken,
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 2000,
    }).always((response) => {
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

function deletetodos(id) {
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'DELETE',
        method: 'DELETE',
        url: "/todos/"+id,
        headers: {
            "token":mytoken,
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 2000,
    }).always((response) => {
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

function addatodo() {
    let jsondata = `{
        "title": "${document.getElementById(`title_new_todo`).value}",
        "description": "${document.getElementById(`description_new_todo`).value}",
        "due_time": "${document.getElementById(`due_date_new_todo`).value}",
        "user_id": "${document.getElementById(`user_id_new_todo`).value}",
        "status": "${document.getElementById(`todo_status_new_todo`).selectedOptions[0].value}"
    }`;
    mytoken = document.cookie
    mytoken = mytoken.substring(6)
    $.ajax({
        type: 'POST',
        method: 'POST',
        url: "/todos",
        data: jsondata,
        headers: {
            "token":mytoken,
        },
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 2000,
    }).always((response) => {
        if (response.responseJSON != undefined) {
            document.getElementById("check").style.color = "red";
            document.getElementById("check").innerHTML = response.responseJSON.msg;
        } else {
            document.getElementById("check").innerHTML = "successfully added";
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