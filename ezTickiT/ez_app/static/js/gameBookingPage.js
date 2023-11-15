const EzTickiTbutton = document.querySelector(".left-div")


EzTickiTbutton.addEventListener('click', function() {
    window.location.href="/";
});
console.log("引入js到gmae")
async function checkUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
        
        window.location.href = '/';
        return;
    }
}
const messageContainer = document.getElementById('messageContainer');
const messageElement = document.createElement('div');
//處理登入內容
document.addEventListener("DOMContentLoaded", function() {
document.getElementById('showLoginForm').addEventListener('click', () => {
    document.getElementById('loginModal').style.display = 'flex';
  });
  let signupLink = document.querySelector(".signuptitle");
  let signupForm = document.getElementById("signupModal");
  let loginForm = document.getElementById("loginModal");
  console.log("signuplink",signupLink);
    signupLink.addEventListener("click", function() {
    if (signupForm.style.display === "none" || signupForm.style.display === "") {
        signupForm.style.display = "flex";
        loginForm.style.display = "none";
    } else {
        signupForm.style.display = "none"; 
    }
    });

  document.getElementById('loginButton').addEventListener('click', async () => {
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const modalContent = document.querySelector('.modal-content');
    if (!loginEmail || !loginPassword) {
        alert('請填寫完所有資料。');
        return; 
    }
    const loginData = {
      email: loginEmail,
      password: loginPassword
    };

    try {
      console.log("近來try login show logindata:",loginData)
      const response = await fetch('/api/users/login_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      let data = await response.json();

      if (response.ok) {
        console.log(data)
        const token = data.access_token;
        localStorage.setItem('token', token);
        console.log('登入成功拿token:',token);
        document.getElementById('loginModal').style.display = 'none';
        location.reload(true);
      } else {
        console.error(data.message)
        const errorMessage = data.message || '登入失敗';
        messageElement.textContent = errorMessage;
        messageElement.classList.add('error');
      }
      messageContainer.innerHTML = '';
      messageContainer.appendChild(messageElement);
    //   modalContent.classList.add('expanded');
      messageContainer.style.display = 'block';
    } catch (error) {
      console.error('發生錯誤', error);
    }
  });
});




//處理註冊部分

let loginLink = document.querySelector(".logintitle");
let loginForm = document.getElementById("loginModal");
let signupForm = document.getElementById("signupModal");
console.log("loginlink",loginLink);
console.log("loginform",loginForm);
  loginLink.addEventListener("click", function() {
  if (loginForm.style.display === "none" || loginForm.style.display === "") {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none"; 
  }
  });
document.getElementById('signupButton').addEventListener('click', async () => {
    const messageContainer = document.getElementById('messageContainer2');
    const messageElement = document.createElement('div');
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    if (!name || !email || !password) {
        alert('請填寫完所有資料。');
        return; 
    }

    const signupData = {
      //先改成username辦帳號 之後再改資料庫
        username: name,
        email: email,
        password: password
    };

    try {
        console.log("近來try login show signupData:",signupData)
        const response = await fetch('/api/users/register_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });
        let data = await response.json();
        
        if (response.ok) {
            console.log('註冊成功');
            messageElement.textContent = '註冊成功';
            messageElement.classList.add('success');
        } else {
            console.error(data.message);
            console.log(`${messageElement}messageelement`)
            const errorMessage = data.message || '註冊失敗';
            messageElement.textContent = errorMessage;
            messageElement.classList.add('error');
        }
        messageContainer.innerHTML = '';
        messageContainer.appendChild(messageElement);
        messageContainer.style.display = 'block';
        console.log(`${messageContainer}messagecon`)
    } catch (error) {
        console.error('發生錯誤', error);
    }
});

//處理每次載入頁面 查看token

async function checkTokenValidity() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await fetch('/api/users/auth_user/', {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });
        const responseData = await response.json(); 
        console.log("responsedata.data",responseData.data);
        if (response.status === 200) {
            document.getElementById('showLoginForm').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
            console.log("成功登入");
            console.log(responseData.data);
        } else {
            console.log("token有問題或無效")
        }
      } catch (error) {
        console.error('發生錯誤', error);
      }
    }
  }
    //控制登入xx
  let iconClose = document.querySelector(".icon-close");
  iconClose.addEventListener('click', () => {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
  });
    //控制註冊xx
  let iconClose2 = document.querySelector(".icon-close2");
  iconClose2.addEventListener('click', () => {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
  });
  //登出後刪除token
  let logoutText = document.getElementById('logout');
  let loginText = document.getElementById('showLoginForm');
  logoutText.addEventListener('click', () => {
    // logoutText.style.display = 'none';
    // loginText.style.display = 'block';
    localStorage.removeItem('token');
    location.reload(true);
  });
  window.addEventListener('load', () => {
    checkTokenValidity();
  });

  const loginButton = document.getElementById('showLoginForm');
function triggerButtonClick() {
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    loginButton.dispatchEvent(event);
}
document.getElementById('reservation-top').addEventListener('click', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        triggerButtonClick();
    } else {
        window.location.href = '/booking';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".ticketBlock").addEventListener("click", function(event) {
        const target = event.target.closest(".ticketBlockContent");
        if (!target) return;

        const area = target.getAttribute("data-area");

        switch (area) {
            case "rocka":
                redirectToCustomerInfo("rocka");
                break;
            case "rockb":
                redirectToCustomerInfo("rockb");
                break;
            case "1fcon":
                redirectToCustomerInfo("1fcon");
                break;
            case "1fheart":
                redirectToCustomerInfo("1fheart");
                break;
            case "upa":
                redirectToCustomerInfo("upa");
                break;
            case "upb":
                redirectToCustomerInfo("upb");
                break;
            default:
                console.log("都不是");
                break;
        }
    });

    function redirectToCustomerInfo(area) {
        console.log(area, ":::area");
        const url = `/customerInf/${area}?event_id=${eventId}`;

        window.location.href = url;

    }
});



    // const seatsData = {{seats|safe}};

    // const seatList = document.getElementById("seat-list");

    // seatsData.forEach(seat => {
    //     const seatElement = document.createElement("div");
    //     seatElement.classList.add("ticketBlockContent");
    //     seatElement.dataset.area = seat.area;

    //     const colorBox = document.createElement("div");
    //     colorBox.classList.add("ticket-color-box");
    //     const realBox = document.createElement("div");
    //     realBox.classList.add("realbox");
    //     realBox.id = `idcolor-${seat.id}`;
    //     colorBox.appendChild(realBox);

    //     const ticketArea = document.createElement("div");
    //     ticketArea.classList.add("ticket-area");
    //     ticketArea.textContent = seat.area;

    //     const ticketPrice = document.createElement("div");
    //     ticketPrice.classList.add("ticket-price");
    //     ticketPrice.textContent = seat.price;

    //     const ticketAvailable = document.createElement("div");
    //     ticketAvailable.classList.add("ticket-available");
    //     ticketAvailable.textContent = seat.is_reserved ? "已售出" : "熱賣中";

    //     seatElement.appendChild(colorBox);
    //     seatElement.appendChild(ticketArea);
    //     seatElement.appendChild(ticketPrice);
    //     seatElement.appendChild(ticketAvailable);

    //     seatList.appendChild(seatElement);
    // });


//處理收到頁面eventID渲染在上面
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event_id');

async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/`);
        const event = await response.json();

        if (event) {
            document.getElementById('event-name').textContent = "P．LEAGUE＋ " + event.name;
            document.getElementById('event-date').textContent = "活動時間： " + event.date;
            document.getElementById('event-location').textContent = "活動地點： " + event.location;
        }
    } catch (error) {
        console.error("fetch失敗", error);
    }
}

window.addEventListener('load', () => {
    fetchEventDetails(eventId);
});
