// @flow
import axios from 'axios'
import Cookies from 'js-cookie'

const auth = {
  login: (username: string, password: string) =>
    axios({
      url: '/api/login/',
      method: 'post',
      data: { username, password },
      headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
    }),
}

const user = {
  get: () =>
    axios({
      url: '/api/user/',
      method: 'get',
    }),
}

const api = {
  auth,
  user,
  link: {
    search: (query: any) =>
      axios({
        url: '/api/search/?query=' + encodeURIComponent(query),
        method: 'get',
      }),
    fetch: () =>
      axios({
        url: '/api/link/',
        method: 'get',
      }),
    add: (link: any) =>
      axios({
        url: '/api/link/',
        method: 'post',
        data: link,
        headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
      }),
    delete: (link: any) =>
      axios({
        url: `/api/link/${link.id}/`,
        method: 'delete',
        data: {},
        headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
      }),
    edit: (link: any) =>
      axios({
        url: `/api/link/${link.id}/`,
        method: 'put',
        data: link,
        headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
      }),
  },
  bookmark: {
    add: (link: any) =>
      axios({
        url: `/api/bookmark/${link.id}/`,
        method: 'post',
        data: {},
        headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
      }),
    delete: (link: any) =>
      axios({
        url: `/api/bookmark/${link.id}/`,
        method: 'delete',
        data: {},
        headers: { 'X-CSRFToken': Cookies.get('csrftoken') },
      }),
  },
}

export default api
