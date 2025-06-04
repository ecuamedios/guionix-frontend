"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Space,
  Button,
  Input,
  Select,
  Tag,
  Avatar,
  Typography,
  Progress,
  Statistic,
  List,
  Tabs,
  Modal,
  Form,
  message
} from "antd";
import {
  YoutubeOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  UploadOutlined,
  CalendarOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const mockYouTubeData = {
  trending: [
    {
      id: 1,
      title: "Como Crear GUIONES de DRAMA que ENGANCHEN",
      channel: "FilmMaker Pro",
      views: "2.5M",
      likes: "89K",
      uploadDate: "Hace 3 días",
      duration: "12:45",
      thumbnail: "/api/placeholder/320/180",
      category: "Educación",
      tags: ["guiones", "drama", "escritura"]
    },
    {
      id: 2,
      title: "Los MEJORES DIÁLOGOS del Cine Romántico",
      channel: "Cinema Lovers",
      views: "1.8M",
      likes: "67K",
      uploadDate: "Hace 1 semana",
      duration: "18:30",
      thumbnail: "/api/placeholder/320/180",
      category: "Entretenimiento",
      tags: ["romance", "diálogos", "cine"]
    },
    {
      id: 3,
      title: "THRILLER vs SUSPENSE: Diferencias Clave",
      channel: "Storytelling Academy",
      views: "956K",
      likes: "42K",
      uploadDate: "Hace 4 días",
      duration: "9:15",
      thumbnail: "/api/placeholder/320/180",
      category: "Educación",
      tags: ["thriller", "suspense", "género"]
    }
  ],
  myContent: [
    {
      id: 1,
      title: "Mi Primer Guión Generado con IA",
      status: "published",
      views: "1.2K",
      likes: "89",
      publishDate: "2024-06-01",
      duration: "5:30"
    },
    {
      id: 2,
      title: "Romance en París - Behind the Scenes",
      status: "draft",
      views: "0",
      likes: "0",
      publishDate: "",
      duration: "8:45"
    }
  ],
  analytics: {
    totalViews: 15340,
    totalLikes: 892,
    totalSubscribers: 234,
    averageWatchTime: "6:42"
  }
};

const YouTubePage = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [timeFilter, setTimeFilter] = useState("today");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Educación": "blue",
      "Entretenimiento": "purple",
      "Música": "red",
      "Gaming": "green",
      "Noticias": "orange"
    };
    return colors[category as keyof typeof colors] || "default";
  };

  const getStatusColor = (status: string) => {
    return status === "published" ? "green" : "orange";
  };

  const trendingColumns = [
    {
      title: "Video",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Space>
          <Avatar 
            shape="square"
            size={64}
            src={record.thumbnail}
            icon={<PlayCircleOutlined />}
          />
          <div>
            <div style={{ fontWeight: 500, maxWidth: 300 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.channel} • {record.duration}
            </Text>
            <div style={{ marginTop: 4 }}>
              <Tag color={getCategoryColor(record.category)}>
                {record.category}
              </Tag>
              {record.tags.map((tag: string) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Estadísticas",
      key: "stats",
      render: (record: any) => (
        <Space direction="vertical" size="small">
          <div style={{ fontSize: "12px" }}>
            <EyeOutlined style={{ color: "#666", marginRight: 4 }} />
            {record.views} visualizaciones
          </div>
          <div style={{ fontSize: "12px" }}>
            <LikeOutlined style={{ color: "#f5222d", marginRight: 4 }} />
            {record.likes} me gusta
          </div>
          <div style={{ fontSize: "12px" }}>
            <CalendarOutlined style={{ color: "#666", marginRight: 4 }} />
            {record.uploadDate}
          </div>
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button size="small" icon={<PlayCircleOutlined />}>
            Ver
          </Button>
          <Button size="small" icon={<DownloadOutlined />}>
            Analizar
          </Button>
        </Space>
      ),
    },
  ];

  const myContentColumns = [
    {
      title: "Contenido",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Space>
          <Avatar icon={<YoutubeOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Duración: {record.duration}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status === "published" ? "Publicado" : "Borrador"}
        </Tag>
      ),
    },
    {
      title: "Estadísticas",
      key: "stats",
      render: (record: any) => (
        <Space direction="vertical" size="small">
          <div style={{ fontSize: "12px" }}>
            <EyeOutlined /> {record.views} views
          </div>
          <div style={{ fontSize: "12px" }}>
            <LikeOutlined /> {record.likes} likes
          </div>
        </Space>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (date: string) => date || "Sin publicar",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <YoutubeOutlined style={{ color: "#ff4d4f" }} /> YouTube Studio
            </Title>
            <Text type="secondary">
              Analiza tendencias, sube contenido y gestiona tu canal
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<UploadOutlined />}>
                Subir Video
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setUploadModalVisible(true)}
              >
                Crear desde Guión
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Estadísticas Generales */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Visualizaciones Totales"
              value={mockYouTubeData.analytics.totalViews}
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Me Gusta Totales"
              value={mockYouTubeData.analytics.totalLikes}
              prefix={<LikeOutlined style={{ color: "#f5222d" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Suscriptores"
              value={mockYouTubeData.analytics.totalSubscribers}
              prefix={<YoutubeOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tiempo Promedio"
              value={mockYouTubeData.analytics.averageWatchTime}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Contenido Principal */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <Space>
              <Select
                value={timeFilter}
                onChange={setTimeFilter}
                style={{ width: 120 }}
              >
                <Option value="today">Hoy</Option>
                <Option value="week">Esta semana</Option>
                <Option value="month">Este mes</Option>
                <Option value="year">Este año</Option>
              </Select>
              <Select
                value={categoryFilter}
                onChange={setCategoryFilter}
                style={{ width: 140 }}
              >
                <Option value="all">Todas las categorías</Option>
                <Option value="education">Educación</Option>
                <Option value="entertainment">Entretenimiento</Option>
                <Option value="music">Música</Option>
              </Select>
            </Space>
          }
        >
          <TabPane tab="Tendencias" key="trending">
            <Table
              dataSource={mockYouTubeData.trending}
              columns={trendingColumns}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
              }}
            />
          </TabPane>
          
          <TabPane tab="Mi Contenido" key="mycontent">
            <Table
              dataSource={mockYouTubeData.myContent}
              columns={myContentColumns}
              rowKey="id"
              pagination={false}
            />
          </TabPane>

          <TabPane tab="Análisis" key="analytics">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Rendimiento por Categoría">
                  <List
                    dataSource={[
                      { category: "Educación", percentage: 45, color: "#1890ff" },
                      { category: "Entretenimiento", percentage: 30, color: "#52c41a" },
                      { category: "Tutoriales", percentage: 25, color: "#faad14" }
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <div style={{ width: "100%" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                            <Text>{item.category}</Text>
                            <Text strong>{item.percentage}%</Text>
                          </div>
                          <Progress percent={item.percentage} strokeColor={item.color} />
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Actividad Reciente">
                  <List
                    dataSource={[
                      "Video 'Romance en París' alcanzó 1K visualizaciones",
                      "Nuevo suscriptor: @filmmaker_pro",
                      "Comentario destacado en 'Thriller Nocturno'",
                      "Video añadido a playlist por @drama_lover"
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <Text>{item}</Text>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Modal de Creación */}
      <Modal
        title="Crear Video desde Guión"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Seleccionar Guión">
            <Select placeholder="Elige un guión existente">
              <Option value="romance-paris">Romance en París</Option>
              <Option value="aventura-espacial">Aventura Espacial</Option>
              <Option value="thriller-nocturno">Thriller Nocturno</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label="Título del Video">
            <Input placeholder="Ej: Romance en París - Episodio 1" />
          </Form.Item>
          
          <Form.Item label="Descripción">
            <Input.TextArea 
              rows={4}
              placeholder="Describe tu video para YouTube..."
            />
          </Form.Item>

          <Form.Item label="Etiquetas">
            <Select mode="tags" placeholder="Añade etiquetas relevantes">
              <Option value="romance">romance</Option>
              <Option value="drama">drama</Option>
              <Option value="guión">guión</Option>
            </Select>
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setUploadModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary">
                Generar Video
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default YouTubePage; 