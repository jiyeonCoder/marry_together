window.onload = ()=>{
    console.log("loading 되었음!")
    // setTimeout(handleSignup, 10000);
}
    
// setTimeout((handleSignup)=>console.log("timeout"), 5000);
async function handleSignup(){
    const nickname = document.getElementById("nickname").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const date_of_birth = document.getElementById("date_of_birth").value
    const country = document.getElementById("country").value
    const city = document.getElementById("city").value
    console.log(email, password)
    
    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "nickname" : nickname,
            "email": email,
            "password": password,
            "password2": password2,
            "date_of_birth": date_of_birth,
            "country" : country,
            "city" : city,
        })
    })
    // sleep(5000);
    console.log(response)
}


async function handleLogin(){
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/users/login/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
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
    
}


function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}


async function handlePostSubmit(){
    // const image = document.getElementById("image").value
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    console.log(title, content)
    
    const response = await fetch('http://127.0.0.1:8000/posts/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            // "image": image,
            "title": title,
            "content": content
        })
    })
    console.log(response)
}