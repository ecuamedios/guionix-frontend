"use client";

import React from "react";
import { Refine } from "@refinedev/core";
import { 
  notificationProvider, 
  Layout, 
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  AuthPage,
  RefineThemes
} from "@refinedev/antd";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import { useSession } from "next-auth/react";
import {
  VideoCameraOutlined,
  DashboardOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  UserOutlined,
  BarChartOutlined,
  YoutubeOutlined,
  RobotOutlined,
  FolderOutlined,
  SkinOutlined,
  SoundOutlined,
  TeamOutlined,
  StarOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import "@refinedev/antd/dist/reset.css";

const { darkAlgorithm, compactAlgorithm } = theme;

interface RefineProviderProps {
  children: React.ReactNode;
}

export const RefineProvider: React.FC<RefineProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  const resources = [
    {
      name: "dashboard",
      list: "/dashboard",
      meta: {
        label: "Dashboard",
        icon: <DashboardOutlined />,
      },
    },
    {
      name: "generator",
      list: "/dashboard/generator",
      meta: {
        label: "Generador IA",
        icon: <RobotOutlined />,
      },
    },
    {
      name: "projects",
      list: "/dashboard/projects",
      create: "/dashboard/projects/create",
      edit: "/dashboard/projects/edit/:id",
      show: "/dashboard/projects/show/:id",
      meta: {
        label: "Mis Proyectos",
        icon: <FolderOutlined />,
      },
    },
    {
      name: "videos",
      list: "/dashboard/videos",
      create: "/dashboard/videos/create",
      edit: "/dashboard/videos/edit/:id",
      show: "/dashboard/videos/show/:id",
      meta: {
        label: "Videos Generados",
        icon: <PlayCircleOutlined />,
      },
    },
    {
      name: "templates",
      list: "/dashboard/templates",
      create: "/dashboard/templates/create",
      edit: "/dashboard/templates/edit/:id",
      show: "/dashboard/templates/show/:id",
      meta: {
        label: "Plantillas",
        icon: <SkinOutlined />,
      },
    },
    {
      name: "voices",
      list: "/dashboard/voices",
      meta: {
        label: "Locuciones",
        icon: <SoundOutlined />,
      },
    },
    {
      name: "analytics",
      list: "/dashboard/analytics",
      meta: {
        label: "Análisis",
        icon: <BarChartOutlined />,
      },
    },
    {
      name: "youtube",
      list: "/dashboard/youtube",
      meta: {
        label: "YouTube",
        icon: <YoutubeOutlined />,
      },
    },
    {
      name: "collaboration",
      list: "/dashboard/collaboration",
      meta: {
        label: "Colaboración",
        icon: <TeamOutlined />,
      },
    },
    {
      name: "settings",
      list: "/dashboard/settings",
      meta: {
        label: "Configuración",
        icon: <SettingOutlined />,
      },
    },
    {
      name: "premium",
      list: "/dashboard/premium",
      meta: {
        label: "Plantillas Pro",
        icon: <StarOutlined />,
      },
    },
    {
      name: "billing",
      list: "/dashboard/billing",
      meta: {
        label: "Facturación",
        icon: <DollarOutlined />,
      },
    },
  ];

  const authProvider = {
    login: async ({ email, password }: any) => {
      return {
        success: true,
        redirectTo: "/dashboard",
      };
    },
    logout: async () => {
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    check: async () => {
      if (session?.user) {
        return {
          authenticated: true,
        };
      }
      
      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Unauthorized",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (session?.user) {
        return {
          id: session.user.email,
          name: session.user.name,
          email: session.user.email,
        };
      }
      return null;
    },
    onError: async (error: any) => {
      console.error(error);
      return { error };
    },
  };

  const CustomTitle = (props: any) => {
    const { collapsed } = props;
    
    return (
      <ThemedTitleV2
        collapsed={collapsed}
        text="GUIONIX"
        icon={
          <VideoCameraOutlined 
            style={{ 
              fontSize: collapsed ? "20px" : "24px",
              color: "#1890ff",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }} 
          />
        }
      />
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: [darkAlgorithm, compactAlgorithm],
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <AntdApp>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
          resources={resources}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: "guionix-dashboard",
          }}
        >
          <ThemedLayoutV2
            Title={CustomTitle}
            Sider={(props) => (
              <ThemedSiderV2 
                {...props}
                render={({ items, collapsed }) => (
                  <div>
                    {items}
                  </div>
                )}
              />
            )}
          >
            {children}
          </ThemedLayoutV2>
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}; 