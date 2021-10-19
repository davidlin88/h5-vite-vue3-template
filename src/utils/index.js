const id = () => {
  return Number(String(Math.random()).slice(3))
}
const deepClone = v => {
  return JSON.parse(JSON.stringify(v))
}

const clipboard = navigator.clipboard
const hextoString = function (hex) {
  let arr = hex.split('')
  let out = ''
  for (let i = 0; i < arr.length / 2; i++) {
    let tmp = '0x' + arr[i * 2] + arr[i * 2 + 1]
    let charValue = String.fromCharCode(tmp)
    out += charValue
  }
  return out
}

const setDocumentTitle = title => {
  if (title === undefined || window.document.title === title) {
    return
  }
  document.title = title

  // TODO: okpay app内不生效
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    const hackIframe = document.createElement('iframe')
    hackIframe.style.display = 'none'
    hackIframe.src = '/fixIosTitle.html?r=' + Math.random()
    document.body.appendChild(hackIframe)
    setTimeout(_ => {
      document.body.removeChild(hackIframe)
    }, 300)
  }
}

const countdownStart = (restTimeStamp, intervalCb, { maxUnit = 'day' }) => {
  let restTime = restTimeStamp
  const interval = setInterval(_ => {
    if (restTime <= 0) {
      clearInterval(interval)
      restTime = 0
    } else {
      restTime -= 1
    }

    /**
     * 获取时间戳的时间差
     * @param {Number} delta 时间差，单位秒
     * @param {Boolean} hourOrDay 返回的最大单位是小时还是天
     */
    function _getStampTimeDifference(delta, maxUnit = 'day') {
      let days = 0
      let hours = 0
      function _formatNumber(n) {
        const s = n.toString()
        return s[1] ? s : '0' + s
      }
      const isHourMaxUnit = maxUnit === 'hour'
      const isDayMaxUnit = maxUnit === 'day'

      if (isHourMaxUnit) {
        hours = parseInt(delta / (60 * 60), 10)
      } else if (isDayMaxUnit) {
        hours = parseInt((delta / (60 * 60)) % 24, 10)
        days = parseInt(delta / (60 * 60) / 24, 10)
      }

      const minutes = parseInt((delta % (60 * 60)) / 60, 10)
      const seconds = parseInt((delta % (60 * 60)) % 60, 10)
      let time = [hours, minutes, seconds]
      time = time.map(_formatNumber)
      const result = {
        days,
        hours: time[0],
        minutes: time[1],
        seconds: time[2],
      }

      return result
    }

    intervalCb(_getStampTimeDifference(restTime, maxUnit), interval)
  }, 1000)
  return interval
}

export default {
  countdownStart,
  hextoString,
  setDocumentTitle,
  async setClipboard(data) {
    if (clipboard) {
      return clipboard.writeText(data)
    } else {
      return Promise.reject(Error('当前环境不支持'))
    }
  },
  img(width, height) {
    return `https://picsum.photos/${width}/${height || width}`
  },
  arr: (n, v) => {
    const r = []
    for (let i = 0; i < n; i++) {
      if (v instanceof Object) {
        r.push({
          ...v,
          id: id(),
        })
      } else {
        r.push(v)
      }
    }
    return r
  },
  deepClone,
  getFileSrc(fileName = '') {
    return fileName ? import.meta.globEager('../assets/*.*')[`../assets/${fileName}`].default : ''
  },
  id,
}
