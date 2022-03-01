const wrapper = document.querySelector(".wrapper"),
    toast = wrapper.querySelector(".toast"),
    title = toast.querySelector("span"),
    subTitle = toast.querySelector("p"),
    wifiIcon = toast.querySelector(".icon"),
    closeIcon = toast.querySelector(".close-icon");

//====================================================

window.onload = async () => {
    await isOnline();
};

const isOnline = async () => {
    try {
        const online = await fetch("https://jsonplaceholder.typicode.com/posts");
        return online.status >= 200 && online.status < 300;
    } catch (err) {
      return false; // definitely offline
    }
};

// Instead of using setInterval for calling the function for every certain seconds.
// lets use a self calling timeout function, because the request might take long in the very slow connection,and we'll face another problem (potential request stacking up).

(function checkOnlineStatus() {
    setTimeout(async () => {
        const result = await isOnline();
        //   do this if every thing is okay
        if(result) {
            showGreenMessage();
        } else {
            showGreyMessage();
        }
        checkOnlineStatus(); // self-calling timeout is better than setInterval for this
    }, 3000);
})();


const showGreenMessage = () => {
    toast.classList.remove("offline");
    title.innerText = "You're online!";
    subTitle.innerText = "Connected successfully.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
    closeIcon.onclick = ()=>{ //hide toast notification on close icon click
        wrapper.classList.add("hide");
    }
    setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
        wrapper.classList.add("hide");
    }, 5000);
}

const showGreyMessage = () => {
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "You're offline!";
    subTitle.innerText = "Please, check your connection.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
}