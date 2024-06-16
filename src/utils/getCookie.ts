const getCookie = (cookieName = 'rememberMe') => {
  const cookieArr = document.cookie.split(';')
  const found = cookieArr.find((cookie) => cookie.includes(cookieName))

  return found?.split('=')[1]
}

export default getCookie
