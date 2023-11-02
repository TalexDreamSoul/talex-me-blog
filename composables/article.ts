import axios from 'axios'

const GITHUB_URL = 'https://api.github.com/repos/Talexs/talex-blog-me-docs/contents'

export async function usePost(path: string) {
  return axios.get(`${GITHUB_URL}/${path}`)
}

export function analyseTags(tags: string) {
  // Each tag follows this format: [] [] []

  const regex = /\[([^\]]+)\]/g

  return [...tags.matchAll(regex)].map(tag => tag[1])
}

export async function useArticle(path: string, locale = 'zh.md') {
  const { data: res } = await usePost(`${path}/${locale}`)

  const content = decodeURIComponent(atob(res.content).split('').map((c) => {
    return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
  }).join(''))

  const header = content.match(/---[\s\S]*---/)![0]
  const body = content.replace(header, '')

  const headerContent = header.split('---')[1]
  const headerObj = {}

    ;[...headerContent.split('\n')].forEach((line) => {
    const [key, value] = line.split(': ')
    headerObj[key.trim()] = value
  })

  return {
    header: headerObj,
    body,
    tags: analyseTags(headerObj.tags),
  }
}

export async function useLists(path = '') {
  const { data: res } = await usePost(path)

  return res
}
