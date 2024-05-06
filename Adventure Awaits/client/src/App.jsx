
import {useState, createContext} from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import HeaderPages from './components/HeaderPages';
import { setContext } from '@apollo/client/link/context';

export const AuthService = createContext();

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function RenderHeader() {
  let currentArea = useLocation();
  console.log(currentArea.pathname);

  if (currentArea.pathname === '/trips') {
    return (
      <HeaderPages
        title="Trips Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
    );
  }
  else if (currentArea.pathname === '/restaurants') {
    return (
      <HeaderPages
        title="Restaurants Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
    );
  }
  else if (currentArea.pathname === '/hotels') {
    return (
      <HeaderPages
        title="Hotels Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
    );
  }
  else if (currentArea.pathname === '/login') {
    return (
      <HeaderPages
        title="Login Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
    );
  }
  else if (currentArea.pathname === '/signup') {
    return (
      <HeaderPages
        title="Signup Page"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
    );
  }
  else {
    return (
      <HeaderPages
        title="Travel Checklist"
        color="#ADD8E6"
        font="Arial"
        fontSize="18"
        marginTop="15px"
        imgSrc="/images/globe.jpg"
      />
    );
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthService.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <RenderHeader />
        <Outlet />
      </AuthService.Provider>
    </ApolloProvider>
  );
}

export default App;


// import {useState, createContext, useLocation} from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import HeaderPages from './components/HeaderPages';
// import { setContext } from '@apollo/client/link/context';


// export const AuthService = createContext();

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   function RenderHeader() {
//     let currentArea = useLocation();
//     console.log(currentArea.pathname);

//     if (currentArea.pathname === '/trips') {
//       return <HeaderPages
//           title="Trips Page"
//           color="#ADD8E6"
//           font="Arial"
//           fontSize="18"
//           marginTop="15px"
//           imgSrc="/images/globe.jpg"
//           />
//     }
//     else if (currentArea.pathname === '/restaurants') {
//       return <HeaderPages
//           title="Restaurants Page"
//           color="#ADD8E6"
//           font="Arial"
//           fontSize="18"
//           marginTop="15px"
//           imgSrc="/images/globe.jpg"
//           />
//     }
//     else if (currentArea.pathname === '/hotels') {
//       return <HeaderPages
//           title="Hotels Page"
//           color="#ADD8E6"
//           font="Arial"
//           fontSize="18"
//           marginTop="15px"
//           imgSrc="/images/globe.jpg"
//           />
//     }
//     else if (currentArea.pathname === '/login') {
//       return <HeaderPages
//           title="Login Page"
//           color="#ADD8E6"
//           font="Arial"
//           fontSize="18"
//           marginTop="15px"
//           imgSrc="/images/globe.jpg"
//           />
//     }
//     else if (currentArea.pathname === '/signup') {
//       return <HeaderPages
//           title="Signup Page"
//           color="#ADD8E6"
//           font="Arial"
//           fontSize="18"
//           marginTop="15px"
//           imgSrc="/images/globe.jpg"
//           />
//     }
//     else {
//       return <HeaderPages
//           title="Home Page"
//           color="#ADD8E6"
//           font="Arial"
//           fontSize="18"
//           marginTop="15px"
//           imgSrc="/images/globe.jpg"
//           />
//     }
//   }

//   return (
//     <ApolloProvider client={client}>
//       <AuthService.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//         <RenderHeader />
//         <Outlet />
//       </AuthService.Provider>
//     </ApolloProvider>
//   );
// }

// export default App;