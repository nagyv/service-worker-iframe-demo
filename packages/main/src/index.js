import { Workbox } from 'workbox-window'

const wrapper = document.getElementById('wrapper')
const button = document.getElementById('loadFrame')
button.addEventListener('click', () => {
  const iframe = document.createElement('iframe')
  iframe.src = '/child/index.html'
  wrapper.appendChild(iframe)
})

let isUpdating = 0
let hasNewVersion = false

const mainSW = startWorker('/service_worker.js')
const childWW = startWorker('/child/service_worker.js')

function startWorker (swFile, options) {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox(swFile, options)

    wb.addEventListener('installed', (event) => {
      console.log('installed', swFile)
      if (isUpdating) {
        isUpdating -= 1
      }
    })
    wb.addEventListener('waiting', (event) => {
      console.log('waiting', swFile)
      hasNewVersion = true
    })

    wb.register()
      .then((registration) => {
        console.log('registration', registration)
        if (registration.installing) {
          isUpdating += 1
        }
      })
    return wb
  }
  return null
}