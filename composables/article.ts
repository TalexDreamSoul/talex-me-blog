import axios from 'axios'

const GITHUB_URL = 'https://api.github.com/repos/Talexs/talex-blog-me-docs/contents'

const JS_DELIVR_URL = 'https://cdn.jsdelivr.net/gh/Talexs/talex-blog-me-docs'

export async function usePost(path: string) {
  return axios.get(`${GITHUB_URL}/${path}`)
}

export function analyzeTags(tags: string) {
  // Each tag follows this format: [] [] []

  const regex = /\[([^\]]+)\]/g

  return [...tags.matchAll(regex)].map(tag => tag[1])
}

export async function useArticle(path: string, locale = 'zh.md') {
  const { data: res } = await axios.get(`${JS_DELIVR_URL}/${path}${locale ? `${locale}/` : ''}`)

  return parseArticle(res)
}

export async function parseArticle(raw: string) {
  const content = raw

  // decodeURIComponent(atob(res.content).split('').map((c) => {
  //  return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`
  // }).join(''))

  const header = content.match(/---[\s\S]*---/)![0]
  const body = content.replace(header, '')

  const headerContent = header.split('---')[1]
  const headerObj: any = {}

    ;[...headerContent.split('\n')].forEach((line) => {
    const [key, value] = line.split(': ')
    headerObj[key.trim()] = value
  })

  return {
    header: headerObj,
    body,
    tags: analyzeTags(headerObj.tags),
  }
}

export async function useLists(path = '') {
  const { data: res } = await usePost(path)

  const map: { [key: string]: any } = {}

  for (const _this of res) {
    const { name, type }: { name: string; type: string } = _this
    if (type !== 'file') {
      map[name] = _this
      continue
    }

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

/**
 * Use contents localhost
 */
export async function useListsLocal(path = '') {
  if (!path.endsWith('/'))
    path += '/'

  const contents = import.meta.glob('/documents/**', { query: '?raw' })

  const totalPath = `/documents/${path}`

  const leftContents: any[] = Object.entries(contents).filter(key => key[0].startsWith(totalPath)).map((item) => {
    return reactive({ name: item[0].replace(totalPath, ''), value: item[1] })
  })

  const map: { [key: string]: any } = {}

  for (const _this of leftContents) {
    let { name, value } = _this
    const isDirectory = _this.isDirectory = name.includes('/')

    if (isDirectory) {
      name = name.split('/').slice(0, -1).join('/')

      const obj = map[name]
      if (!obj) {
        map[name] = {
          name,
          isDirectory: true,
          children: [value],
        }
      }
      else { obj.children.push(value) }

      continue
    }
    name = name.split('/').slice(-1)[0]

    // 去掉后缀 获取名字 （只去掉最后一个.)
    const _name = name.split('.').slice(0, -1).join('.')

    if ((`${name}`).endsWith('.md')) {
      _this.md = (await value()).default
      _this.article = await parseArticle(_this.md)
      _this.size = _this.article.body.length
    }

    if (!(`${name}`).endsWith('.md'))
      continue

    // const obj = map[_name]
    // if (obj)
    //   console.log('this', obj, map, name)

    // if (obj) {
    //   if ((`${name}`).endsWith('.cpp')) {
    //     obj.cpp = _this
    //   }

    //   else if (obj.name.endsWith('.cpp')) {
    //     // delete obj[_name]
    //     _this.cpp = obj

    //     map[_name] = _this
    //   }
    // }
    // else {
    map[_name] = _this
    // }
  }

  return Object.values(map)
}
