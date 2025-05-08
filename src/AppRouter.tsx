import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from './types/Routes'; 
import SecuredRoute from './utils/SecuredRoute';
import Error404 from './page/error404';

import UserContext, { User } from './utils/UserContext';
import { USER_URL } from './types/Variables';
import Header from './page/header';
import SideBar from './page/sideBar';
import SideBarUser from './page/sideBarUser';

function AppRouter(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('user');
    const token = urlParams.get('token');

    if (userId && token) {
      fetch(USER_URL+`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUser({
            id: data.id,
            roles: data.roles.map((role: { code: string }) => role.code),
          });
          localStorage.setItem("user",JSON.stringify(data))
          localStorage.setItem("token",token)
          localStorage.setItem("idUser",userId)
          setLoading(false);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    } else {
      setLoading(false);
    }
  }, []);

return (
  <UserContext.Provider value={[user, setUser]}>
    <BrowserRouter>
      {loading ? (
        <>
        <Header></Header>
        <div className='App'>...</div>
        </>
      ) : (
        <>
          <Header />
          {user?.roles.includes('INVENTAIRE_GESTIONNAIRE') ? <SideBar /> : <SideBarUser />}
          <Routes>
            {Object.values(ROUTES).map((route) => (
              <Route
                key={route.url}
                path={route.url}
                element={
                  <SecuredRoute
                    authorizedRoles={route.allowedRoles}
                    notAuthorizedRoles={route.notAllowedRoles}
                  >
                    <route.component />
                  </SecuredRoute>
                }
              />
            ))}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  </UserContext.Provider>
);
}

export default AppRouter;
