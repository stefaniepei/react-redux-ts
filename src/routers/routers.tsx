import * as React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

function Routers({
  history,
  routes,
  children,
}) {
  return (
    <BrowserRouter>
      <div>
        {children}
        <Switch>
          {
            routes.map(route => (
              <Route
                key={route.path}
                {...route}
              />
            ))
          }
          <Route component={() => <h1>404-Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Routers
