import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

export default function ParentOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext =>
            !!userContext.user.id //&& userContext.user.type === 'user'
              ? <Component {...componentProps} />
              : (
                <Redirect
                  to={{
                    pathname: userContext.user.idle ? '/login' : '/register',
                    state: { from: componentProps.location },
                  }}
                />
              )
          }
        </UserContext.Consumer>
      )}
    />
  )
}
