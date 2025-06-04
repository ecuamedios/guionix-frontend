"use client";

import React from "react";
import { 
  Card, 
  Col, 
  Row, 
  Statistic, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Typography, 
  Progress,
  List,
  Avatar,
  Divider,
  Badge,
  Timeline
} from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  DownloadOutlined,
  TrophyOutlined,
  RocketOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { useNavigation } from "@refinedev/core";
import { PageHeader } from "@refinedev/antd";

const { Title, Text } = Typography;

const Dashboard = () => {
  const { push } = useNavigation();

  // Datos simulados
  const stats = {
    scriptsGenerated: 247,
    timeSaved: 156,
    activeProjects: 12,
    videosExported: 89
  };

  const recentProjects = [
    {
      id: 1,
      title: "Romance en París",
      genre: "Romance",
      status: "completed",
      createdAt: "2024-06-03",
      duration: "8:45"
    },
    {
      id: 2,
      title: "Aventura Espacial",
      genre: "Sci-Fi",
      status: "in_progress",
      createdAt: "2024-06-02",
      duration: "12:30"
    },
    {
      id: 3,
      title: "Comedia Familiar",
      genre: "Comedia",
      status: "draft",
      createdAt: "2024-06-01",
      duration: "6:20"
    },
    {
      id: 4,
      title: "Thriller Nocturno",
      genre: "Thriller",
      status: "review",
      createdAt: "2024-05-31",
      duration: "15:15"
    },
    {
      id: 5,
      title: "Drama Histórico",
      genre: "Drama",
      status: "completed",
      createdAt: "2024-05-30",
      duration: "18:45"
    }
  ];

  const getStatusTag = (status: string) => {
    const statusMap = {
      completed: { color: "green", text: "Completado" },
      in_progress: { color: "blue", text: "En Progreso" },
      draft: { color: "default", text: "Borrador" },
      review: { color: "orange", text: "Revisión" }
    };
    return statusMap[status as keyof typeof statusMap] || { color: "default", text: status };
  };

  const getGenreColor = (genre: string) => {
    const genreColors = {
      Romance: "pink",
      "Sci-Fi": "purple",
      Comedia: "yellow",
      Thriller: "red",
      Drama: "blue"
    };
    return genreColors[genre as keyof typeof genreColors] || "default";
  };

  const columns = [
    {
      title: "Proyecto",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Space>
          <Avatar icon={<FileTextOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              ID: #{record.id}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Género",
      dataIndex: "genre",
      key: "genre",
      render: (genre: string) => (
        <Tag color={getGenreColor(genre)}>{genre}</Tag>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const { color, text } = getStatusTag(status);
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Duración",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: any) => (
        <Space size="small">
          <Button size="small" icon={<EditOutlined />} type="text" />
          <Button size="small" icon={<EyeOutlined />} type="text" />
          <Button size="small" icon={<DeleteOutlined />} type="text" danger />
        </Space>
      ),
    },
  ];

  const activityData = [
    {
      title: 'Guión "Romance en París" generado exitosamente',
      description: "Hace 2 horas",
      icon: <ThunderboltOutlined style={{ color: "#52c41a" }} />,
    },
    {
      title: 'Video exportado: "Aventura Espacial"',
      description: "Hace 4 horas",
      icon: <PlayCircleOutlined style={{ color: "#1890ff" }} />,
    },
    {
      title: 'Plantilla "Comedia Familiar" actualizada',
      description: "Hace 1 día",
      icon: <EditOutlined style={{ color: "#fa8c16" }} />,
    },
    {
      title: "¡Meta mensual alcanzada! 50+ guiones generados",
      description: "Hace 2 días",
      icon: <TrophyOutlined style={{ color: "#eb2f96" }} />,
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header de Bienvenida */}
      <Card
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          marginBottom: "24px",
          border: "none",
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "white", margin: 0 }}>
              ¡Bienvenido de vuelta! 🎬
            </Title>
            <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px" }}>
              Tienes {recentProjects.filter(p => p.status === "in_progress").length} proyectos en progreso
            </Text>
          </Col>
          <Col>
            <Button 
              type="primary" 
              size="large" 
              icon={<RocketOutlined />}
              style={{ backgroundColor: "white", borderColor: "white", color: "#764ba2" }}
              onClick={() => push("/dashboard/generator")}
            >
              Nuevo Guión
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Métricas Principales */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Guiones Generados"
              value={stats.scriptsGenerated}
              prefix={<FileTextOutlined style={{ color: "#722ed1" }} />}
              suffix={
                <div style={{ fontSize: "12px", color: "#52c41a" }}>
                  +12 este mes
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Horas Ahorradas"
              value={`${stats.timeSaved}h`}
              prefix={<ClockCircleOutlined style={{ color: "#eb2f96" }} />}
              suffix={
                <div style={{ fontSize: "12px", color: "#52c41a" }}>
                  +28h esta semana
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Proyectos Activos"
              value={stats.activeProjects}
              prefix={<ThunderboltOutlined style={{ color: "#fa8c16" }} />}
              suffix={
                <div style={{ fontSize: "12px", color: "#52c41a" }}>
                  3 nuevos hoy
                </div>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Videos Exportados"
              value={stats.videosExported}
              prefix={<DownloadOutlined style={{ color: "#1890ff" }} />}
              suffix={
                <div style={{ fontSize: "12px", color: "#52c41a" }}>
                  +15 esta semana
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Contenido Principal */}
      <Row gutter={[16, 16]}>
        {/* Proyectos Recientes */}
        <Col xs={24} lg={16}>
          <Card
            title="Proyectos Recientes"
            extra={
              <Button 
                type="link" 
                icon={<EyeOutlined />}
                onClick={() => push("/dashboard/projects")}
              >
                Ver todos
              </Button>
            }
          >
            <Table
              dataSource={recentProjects}
              columns={columns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Panel Lateral */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Rendimiento IA */}
            <Card title="Rendimiento IA" size="small">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Velocidad de Generación</Text>
                    <Text strong>92%</Text>
                  </div>
                  <Progress percent={92} strokeColor="#52c41a" size="small" />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Precisión del Contenido</Text>
                    <Text strong>88%</Text>
                  </div>
                  <Progress percent={88} strokeColor="#1890ff" size="small" />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Satisfacción del Usuario</Text>
                    <Text strong>95%</Text>
                  </div>
                  <Progress percent={95} strokeColor="#eb2f96" size="small" />
                </div>
              </Space>
            </Card>

            {/* Actividad Reciente */}
            <Card title="Actividad Reciente" size="small">
              <List
                dataSource={activityData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={<Text style={{ fontSize: "14px" }}>{item.title}</Text>}
                      description={<Text type="secondary" style={{ fontSize: "12px" }}>{item.description}</Text>}
                    />
                  </List.Item>
                )}
                size="small"
              />
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 