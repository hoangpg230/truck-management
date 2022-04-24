const common = {
  setHeightMain: () => {
    const clientHeight = document.querySelector('body').offsetHeight
    const headerHeight = document.querySelector('.header').offsetHeight ?? 0

    const main = document.querySelector('main')
    main.style.height = Number(clientHeight - headerHeight) + 'px'
  },
  jsUcfirst: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  transformArray: (array) => {
    return array.map((e) => ({ ...e, key: e.id }))
  },
}

export default common
