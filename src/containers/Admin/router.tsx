import * as React from 'react'
import * as Loadable from 'react-loadable'
import './index.scss'

const loading = ({ isLoading, error }) => {
  return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null
}

const AdminRouters = [
  {
    path: '/',
    component: Loadable({
      loader: () => import('./Index'),
      loading,
    }),
    exact: true,
  },
  {
    path: '/login',
    component: Loadable({
      loader: () => import('./Login'),
      loading,
    }),
    exact: true,
  },
  {
    path: '/index',
    component: Loadable({
      loader: () => import('./Index'),
      loading,
      render(loaded, props) {
        let Component = loaded.default
        return <Component {...props} />
      },
    }),
    exact: true,
  },
]

export default AdminRouters
