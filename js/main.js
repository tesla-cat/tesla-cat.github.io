document.querySelectorAll('a').forEach(a => {
  if (a.hostname && a.hostname !== location.hostname) {
    a.setAttribute('target', '_blank')
  }
})