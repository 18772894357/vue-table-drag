import Vue from 'vue'
import './index.css'

Vue.directive('drag', {
  bind: (el, binding) => {
    let startMove = false
    let startRow
    let endRow
    const getRow = (e, inner = false) => {
      const tableClientTop = el.querySelector('tbody').getBoundingClientRect().top
      const offsetY = e.clientY - tableClientTop
      const trs = el.querySelector('tbody').querySelectorAll('tr')
      let row = 0
      Array.prototype.slice.call(trs).forEach((node, index) => {
        if (!inner) {
          if (offsetY >= node.offsetTop + node.offsetHeight / 2) {
            row = index + 1
          }
        } else {
          if (offsetY >= node.offsetTop) {
            row = index
          }
        }
      })
      return row
    }
    el.onmousedown = (e) => {
      startMove = true
      startRow = getRow(e, 1)
    }
    el.onmousemove = (e) => {
      if (startMove) {
        endRow = getRow(e)
        const trs = el.querySelectorAll('tr')
        const list = Array.prototype.slice.call(trs)
        list.forEach((v, index) => {
          if (index === endRow) {
            v.classList.add('drag-line')
          } else {
            v.classList.remove('drag-line')
          }
        })
      }
    }
    window.onmouseup = () => {
      startMove = false
      binding.value(startRow, endRow)
      const trs = el.querySelectorAll('tr')
      const list = Array.prototype.slice.call(trs)
      list.forEach(v => {
        v.classList.remove('drag-line')
      })
    }
  }
})
