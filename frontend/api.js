const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500'

window.onload = () => {
    console.log("loading 되었음!")
}


async function handleSignup() {
    const nickname = document.getElementById("nickname").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const date_of_birth = document.getElementById("date_of_birth").value
    console.log(email, password)

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "nickname": nickname,
            "email": email,
            "password": password,
            "password2": password2,
            "date_of_birth": date_of_birth,
        })
    })
    console.log(response)
    

    if (response.status == 201) {
        alert('회원가입을 축하합니다!')
        window.location.assign(`${frontend_base_url}/frontend/login.html`)
    }
}


async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    const response_json = await response.json()
    console.log(response_json)

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);

    if (response.status == 200) {
        alert('로그인 되었습니다!')
        window.location.replace(`${frontend_base_url}/frontend/index.html`)
    }

}


function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}


async function handlePostSubmit() {
    const formData = new FormData();
    const image = document.getElementById("image").files[0]
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const token = localStorage.getItem("access")

    formData.append("image", image)
    formData.append("title", title)
    formData.append("content", content)

    const response = await fetch(`${backend_base_url}/posts/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: formData
    })
    console.log(response)
    window.location.href = "index.html";
}


async function handleProfileSubmit(){

    const formData = new FormData();

    const image = document.getElementById("image").files[0]
    const fullname = document.getElementById("fullname").value
    const age = document.getElementById("age").value
    const introduce_me = document.getElementById("introduce_me").value
    const job = document.getElementById("job").value
    const religion = document.getElementById("religion").value
    const my_character = document.getElementById("my_character").value
    const purpose_to_join = document.getElementById("purpose_to_join").value
    const token = localStorage.getItem("access")


    formData.append("image", image)
    formData.append("fullname", fullname)
    formData.append("age", age)
    formData.append("introduce_me", introduce_me)
    formData.append("job", job)
    formData.append("religion", religion)
    formData.append("my_character", my_character)
    formData.append("purpose_to_join", purpose_to_join)


    // const payload = localStorage.getItem("payload");
    // const payload_parse = JSON.parse(payload)
    // console.log(payload_parse.user_id)
    // user_id = payload_parse.user_id

    // const intro = document.getElementById("intro")
    // intro.innerText = payload_parse.email


    const response = await fetch(`http://127.0.0.1:8000/users/myprofile/`, {
        headers:{
            'Authorization': `Bearer ${token}`
        },
        method:'POST',
        body:formData
    })
    console.log(response)
    window.location.href = "index.html";
}

async function getPosts() {
    const token = localStorage.getItem("access")
    console.log(token)
    const response = await fetch(`${backend_base_url}/posts/`, {
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET',
    })
    console.log(response)
    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다.")
    }
}


async function moveToOtherProfile() {

    posts = await getPosts()

    let button = document.getElementById("intro2")
    let nickname = button.innerHTML
    let user_id = 0;

    for (let i = 0; i < posts.length; i++) {
        console.log(posts[i].nickname);
        if (posts[i].nickname == nickname){
            user_id = posts[i].user
        }
    }

    const formData = new FormData();
    const token = localStorage.getItem("access")

    formData.append("user_id", user_id)

    const response = await fetch(`http://127.0.0.1:8000/users/${user_id}/profile/`, {
        headers:{
            'Authorization': `Bearer ${token}`
        },
        method:'GET',
    })

    window.location.href = "otherprofile.html";
}