import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import { AccountCircleOutlined, VillaOutlined } from "@mui/icons-material";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";

import { parseJwt } from "utils/parse-jwt";

import {
  UpdatePassword,
  Register,
  ForgotPassword,
  AllProperties,
  CreateProperty,
  Home,
  Login,
  MyProfile,
  PropertyDetails,
  EditProperty,
} from "./pages";
import events from "pages/events";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential, email, password }) => {
      if (credential) {
        const profileObj = credential ? parseJwt(credential) : null;
        //save user to MongoDB
        if (profileObj) {
          const response = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          });
          const data = await response.json();
          if (response.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid: data._id,
              })
            );
          } else {
            return Promise.reject();
          }
        }

        localStorage.setItem("token", `${credential}`);

        return Promise.resolve();
      }
      if (email) {
        const endpoint = `http://localhost:8080/api/v1/users/user/${email}`;
        axios
          .get(endpoint)
          .then((response) => {
            const data = response.data;
            if (data.email === email) {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...data,
                  userid: data._id,
                })
              );
              localStorage.setItem("token", `${email}`);
            } else {
              return Promise.reject();
            }
          })
          .catch((error) => {
            console.error(error);
          });
        return Promise.resolve("/");
      }
      return Promise.reject();
    },
    register: async (params) => {
      if (params) {
        const response = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: params.firstName + " " + params.lastName,
            email: params.email,
            avatar:
              "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...params,
              avatar:
                "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }

      localStorage.setItem("token", `${params}`);

      return Promise.resolve();
    },

    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
      return Promise.reject();
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "properties",
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "events",
              list: events,

              icon: <VillaOutlined />,
            },

            {
              name: "my-profile",
              options: { label: "My Profile" },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/forgot-password",
                element: <ForgotPassword />,
              },
              {
                path: "/register",
                element: <Register />,
              },
              {
                path: "/update-password",
                element: <UpdatePassword />,
              },
            ],
          }}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
