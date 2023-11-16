const EzTickiTbutton = document.querySelector(".left-div")

EzTickiTbutton.addEventListener('click', function() {
    window.location.href="/";
});

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
        console.log("來try login show signupData:",signupData)
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
let responseDataData;
async function checkTokenValidity() {
    const token = localStorage.getItem('token');
    console.log("token:::",token);
    if (token) {
      try {
        const response = await fetch('/api/users/auth_user/', {
          method: 'GET',
          headers: {
            'Authorization': token,
            // 'Authorization': `Bearer ${token}`
          }
        });
        const responseData = await response.json(); 
        console.log("responsedata.data",responseData.data);
        console.log("status:",responseData.data.status)
        if (response.status === 200) {
            document.getElementById('showLoginForm').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
            console.log("成功登入");
            console.log(responseData.data);
            responseDataData = responseData.data;
        } else {
            console.error("身份驗證失敗：", responseData.message);
            console.log("token有問題或無效")
        }
      } catch (error) {
        //處理fetch錯誤
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




function updateTicketInfo(area) {
    var ticketAreaElement = document.getElementById('ticket-1area');
    var ticketPriceElement = document.getElementById('ticket-1price');

    switch (area) {
        case "rocka":
            ticketAreaElement.textContent = '搖滾A區';
            ticketPriceElement.textContent = '3000';
            break;
        case "rockb":
            ticketAreaElement.textContent = '搖滾B區';
            ticketPriceElement.textContent = '2000';
            break;
        case "1fcon":
            ticketAreaElement.textContent = '1樓衝撞區';
            ticketPriceElement.textContent = '1800';
            break;
        case "1fheart":
            ticketAreaElement.textContent = '1樓鋼鐵之心區';
            ticketPriceElement.textContent = '1200';
            break;
        case "upa":
            ticketAreaElement.textContent = '觀景台A';
            ticketPriceElement.textContent = '800';
            break;
        case "upb":
            ticketAreaElement.textContent = '觀景台B';
            ticketPriceElement.textContent = '500';
            break;
        default:
            console.log("都不是");
            break;
    }

    let totalPriceElement = document.querySelector('.price');
    let ticketPrice = parseFloat(ticketPriceElement.textContent);
    totalPriceElement.textContent = '$' + ticketPrice; 
}
document.addEventListener('DOMContentLoaded', function () {
    let realArea = splitAreaWord()
    updateTicketInfo(realArea);
});
function splitAreaWord() {
    let url = window.location.href;
    console.log(url);
    let parts = url.split('/');
    console.log(parts); 
    let areaParam = parts[parts.length - 1];
    console.log(areaParam);
    let realAreapart = areaParam.split('?');
    let realArea = realAreapart[0];
    console.log(realArea);
    return realArea;
}
// document.addEventListener('DOMContentLoaded', function() {

//     let payButton = document.querySelector('.paybutton');

//     payButton.addEventListener('click', function() {

//         let url = "/bookingSucc";

//         window.location.href = url;
//     });
// });


const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('event_id');

async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}/`);
        const event = await response.json();

        if (event) {
            document.getElementById('event-name').textContent = "P．LEAGUE＋ " + event.name;
            document.getElementById('event-date').textContent = event.date;
            document.getElementById('event-location').textContent =  event.location;
            document.getElementById('ticket-name').textContent =  event.name;
        }
    } catch (error) {
        console.error("fetch失敗", error);
    }
}

window.addEventListener('load', () => {
    fetchEventDetails(eventId);
});




//按下按鈕後訂票及付款 後端處理分配座位及搶位的演算法


async function createTicket(eventId, realArea, price,responseDataData) {
    const requestBody = {
        user_id : responseDataData.user_id,
        event: eventId,
        seat: realArea,
        price: parseFloat(price),
        quantity: 1,
        status: '已完成',
    };
    console.log("requestBody：",requestBody);
    try {
        const response = await fetch('/api/allocate-seat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (response.status === 201) {
            response.json().then(data => {
                console.log("response", data);
                console.log('Ticket 創建成功');
                alert(`Ticket 創建成功，您的座位${data.row_number}排${data.seat_number}號，目前總共及剩餘座位：${data.total_count}/${data.remaining_count}`);
                console.log('Total Count:', data.total_count);
                console.log('Remaining Count:', data.remaining_count);
                console.log('Row Number:', data.row_number);
                console.log('Seat Number:', data.seat_number);
                let url = "/bookingSucc";
                window.location.href = url;
            });
        } else {
            console.error("response",response);
            console.error('Ticket 創建失敗');
            // alert('Ticket 創建失敗'); 
        }
    } catch (error) {
        console.error('內部error', error);
        alert('內部error: ' + error.message);
    }
}

document.querySelector('.paybutton').addEventListener('click', function() {
    if (responseDataData !== null) {
    let realArea = splitAreaWord();
    let price = getPrice(realArea); 
    createTicket(eventId, realArea, price,responseDataData);
    }
});

function getPrice(area) {
    switch (area) {
        case "rocka":
            return '3000';
        case "rockb":
            return '2000';
        case "1fcon":
            return '1800';
        case "1fheart":
            return '1200';
        case "upa":
            return '800';
        case "upb":
            return '500';
        default:
            console.log("都不是");
            return '0'; 
    }
}