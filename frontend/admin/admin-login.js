//admin login component
const adminLoginHTML = () => {
    return `
    <section class="admin-login-section">
        <form class="admin-login-form">
            <input name="username" placeholder="username" type="text">
            <input name="password" placeholder="password" type="text">
            <button class="primary-btn">Login</button>
        </form>
    </section>
    `;
};

const toastMessageHTML = () => {
    return `
    <div class="toast-message-container">
        <p>Incorrect username or password!</p>
    </div>
    `
};


const init = () => {
    document.getElementById('root').insertAdjacentHTML("beforeend", adminLoginHTML());


    document.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault()
        if(document.querySelector('.toast-message-container')){
            document.querySelector('.toast-message-container').remove();
        }

        const dataToSend = new FormData(document.querySelector('form'));
        fetch('/admin/login', {
            method: 'POST',
            body: dataToSend
        }).then(async data => {
            if(data.status === 200){
                // const res = await data.json();
                window.location.assign('/admin')
            } else {
                document.querySelector('form').insertAdjacentHTML("afterbegin", toastMessageHTML());
                document.querySelector('.toast-message-container').classList.add('toast-fade-in');
                setTimeout(() => {
                    document.querySelector('.toast-message-container').classList.add('toast-fade-out');
                }, 3000);
            }
        }).catch(error => {
            console.log(error);
        })
    });
};


window.addEventListener('load', init);