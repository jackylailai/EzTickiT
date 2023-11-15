const EzTickiTbutton = document.querySelector(".left-div")

EzTickiTbutton.addEventListener('click', function() {
    window.location.href="/";
});
console.log("成功引入home.js")
// 處理圖片邏輯
// 抓取瀏覽器視窗的寬度
const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// 將寬度輸出到控制台
console.log('瀏覽器寬度：', windowWidth);


// // 處理list捷運站按鈕
// const leftButton = document.querySelector('.left-button');
// const rightButton = document.getElementById('right-button');
// const stationList = document.querySelector('.list');
// const stationListBar = document.querySelector('.list-bar');
// const searchInput = document.querySelector('.search-form input');
// const searchButton = document.getElementById('search-button');
// let scrollDisance = calculateScrollDistance();
// let currrentINdex=0;

// leftButton.addEventListener('click', function() {
//     // let currentScroll = stationList.scrollLeft;//先抓住list最左邊的點
//     // let movement = scrollDisance;
//     // let targetScroll = currentScroll-movement;//剛開始最左邊-螢幕長度（list2/3）=等等要動的距離
//     console.log("左邊按鈕被點擊")
//     stationListBar.scrollLeft -=windowWidth * 2/3;
//     // stationListBar.scrollTo({
//     //     left:targetScroll,
//     //     behavior:"smooth",
//     // })
// });

// rightButton.addEventListener('click', function() {
//     // let currentScroll = stationList.scrollLeft;//先抓住list最左邊的點
//     // let movement = scrollDisance;
//     // let targetScroll2 = movement;//剛開始最左邊+螢幕長度（list2/3）=等等要動的距離
//     console.log("右邊按鈕被點擊")
//     stationListBar.scrollLeft +=windowWidth * 2/3;
//     // stationList.scrollBy
//     // stationListBar.scrollTo({
//     //     left: targetScroll2,
//     //     behavior: "smooth",
//     // });
// });

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
        console.log(responseData.data)
        console.log(responseData.status);
        if (response.status === 200) {
            document.getElementById('showLoginForm').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
            console.log("成功登入");
            console.log(responseData.data);
            // console.log("message",responseData.message);
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