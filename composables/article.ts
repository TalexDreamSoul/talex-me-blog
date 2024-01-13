import axios from 'axios'

const GITHUB_URL = 'https://api.github.com/repos/Talexs/talex-blog-me-docs/contents'

const JS_DELIVR_URL = 'https://cdn.jsdelivr.net/gh/Talexs/talex-blog-me-docs'

export async function usePost(path: string) {
  return axios.get(`${GITHUB_URL}/${path}`)
}

export function analyseTags(tags: string) {
  // Each tag follows this format: [] [] []

  const regex = /\[([^\]]+)\]/g

  return [...tags.matchAll(regex)].map(tag => tag[1])
}

export async function useArticle(path: string, locale = 'zh.md') {
  const { data: res } = await axios.get(`${JS_DELIVR_URL}/${path}${locale ? `${locale}/` : ''}`)

  const content = res

  // decodeURIComponent(atob(res.content).split('').map((c) => {
  //  return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
  // }).join(''))

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

  const map: { [key: string]: any } = {}

  for (const _this of res) {
    const { name, type }: { name: string; type: string } = _this
    if (type !== 'file')
      continue

    // 去掉后缀 获取名字 （只去掉最后一个.)
    const _name = name.split('.').slice(0, -1).join('.')

    const obj = map[_name]

    if (obj) {
      if ((`${name}`).endsWith('.cpp')) {
        obj.cpp = _this
      }

      else if (obj.name.endsWith('.cpp')) {
        _this.cpp = obj

        map[_name] = _this
      }
    }
    else {
      map[_name] = _this
    }
  }

  return Object.values(map)
}
