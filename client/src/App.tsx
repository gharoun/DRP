import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";
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
  AgentProfile,
  Agents,
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
        console.log(profileObj);
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
          console.log("data", data);
          if (response.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid: data._id,
              })
            );
            console.log("zebi", localStorage);
          } else {
            return Promise.reject();
          }
        }

        localStorage.setItem("token", `${credential}`);

        return Promise.resolve();
      }
      if (email) {
        console.log(email);
        const endpoint = `http://localhost:8080/api/v1/users/user/${email}`;
        axios
          .get(endpoint)
          .then((response) => {
            const data = response.data;
            if (data.email === email) {
              console.log("response", data);
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...data,
                  userid: data._id,
                })
              );
              localStorage.setItem("token", `${email}`);
              console.log("local storage", localStorage);
            } else {
              console.log("response", data);
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
        console.log(params);
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
        console.log("data", data);
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
          console.log(localStorage);
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
        console.log("userdfsdmlkf", user);
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
              name: "agents",
              list: Agents,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            },
            {
              name: "Reviews",
              list: Home,
              icon: <StarOutlineRounded />,
            },
            {
              name: "messages",
              list: Home,
              icon: <ChatBubbleOutline />,
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
