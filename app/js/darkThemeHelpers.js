const styleLink = document.getElementById('dark-theme-style')

window.isDark = JSON.parse(localStorage.getItem('isDark'))

function chooseTheme() {
  if (window.isDark) {
    enableDarkTheme()
  } else {
    disableDarkTheme()
  }
}

function enableDarkTheme() {
  styleLink.setAttribute('href', 'css/bootstrap-dark.min.css')
}

function disableDarkTheme() {
  styleLink.setAttribute('href', '')
}

export { chooseTheme, disableDarkTheme, enableDarkTheme, styleLink }
