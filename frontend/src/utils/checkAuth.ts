function checkAuth(): boolean {

    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    return cookies.some(cookie => cookie.startsWith('token='));
}

export default checkAuth;
