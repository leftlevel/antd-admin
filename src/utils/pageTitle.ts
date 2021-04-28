import { title, titleReverse, titleSeparator } from '@/utils/setting'

export default function getPageTitle(pageTitle: string) {
  let newTitle: Array<string> = []
  if (pageTitle) {
    newTitle.push(pageTitle)
  }
  if (title) {
    newTitle.push(title)
  }
  if (titleReverse) {
    newTitle = newTitle.reverse()
  }
  return newTitle.join(titleSeparator)
}