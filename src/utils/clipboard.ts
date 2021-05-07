const clipboard = require('clipboard')
import { message } from 'ant-design-vue'

function clipboardSuccess(text: string) {
  message.success(`复制 ${text} 成功🎉`)
}

function clipboardError(text: string) {
  message.error(`复制 ${text} 失败`)
}
/**
 * @description: 复制数据
 * @param {string} text
 * @param {Event} event
 * @return {*}
 */
export default function handleClipboard(text: string, event: Event) {
  const myboard = new clipboard(event.target, {
    text: () => text
  })
  myboard.on('success', () => {
    clipboardSuccess(text)
    myboard.destroy()
  })
  myboard.on('error', () => {
    clipboardError(text)
    myboard.destroy()
  })
  myboard.onClick(event)
}