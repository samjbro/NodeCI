const puppeteer = require('puppeteer')
const userFactory = require('../factories/userFactory')
const sessionFactory = require('../factories/sessionFactory')

class Page {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox']
    })

    const page = await browser.newPage()
    const customPage = new Page(page)

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property]
      }
    })
  }

  constructor(page) {
    this.page = page
  }

  async login() {
    const user = await userFactory()

    const {session, sig} = sessionFactory(user)

    await this.page.setCookie({name: 'session', value: session})
    await this.page.setCookie({name: 'session.sig', value: sig})
    await this.page.goto('http://localhost:3000/blogs')
    await this.page.waitFor('a[href="/auth/logout"]')
  }

  async getContentsOf(selector) {
    return await this.page.$eval(selector, el => el.innerHTML)
  }

  request(method, path, data = {}) {
    const request = {
      method,
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'}
    }
    if (method === 'POST') {
      request.body = JSON.stringify(data)
    }
    return this.page.evaluate((_path, _request) => {
      return fetch(_path, _request).then(res => res.json())
    }, path, request)
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({method, path, data}) => {
        return this.request(method, path, data)
      })
    )
  }
}

module.exports = Page