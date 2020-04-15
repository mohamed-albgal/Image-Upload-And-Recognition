import {createContext} from 'react'

export const AuthContext = createContext(null);




/*
AuthContext allows the loggedIn state to be shared amongst components
the context api is called to get a 'context' instance to be accessed by calling useContext hook

the context is used and provides a value to children components of the wrapping component: AuthContext.Provider with a value called prop (the value to share)
the consuming components (children of AuthContext.Provider) will access the shared context value by calling the useContext(AuthContext)
anytime the state changes in the context, the provider's children who consume the state will re-render
*/