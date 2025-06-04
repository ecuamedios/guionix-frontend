"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Select,
  DatePicker,
  Space,
  Button,
  Typography,
  Progress,
  Tag,
  Divider,
  List,
  Avatar
} from "antd";
import {
  BarChartOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  ClockCircleOutlined,
  UserOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  RiseOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const mockAnalytics = {
  overview: {
    totalViews: 125430,
    totalLikes: 8934,
    totalShares: 1234,
    totalDownloads: 567,
    viewsGrowth: 12.5,
    likesGrowth: 8.3,
    sharesGrowth: -2.1,
    downloadsGrowth: 15.7
  },
  topContent: [
    {
      id: 1,
      title: "Romance en París - Episodio Final",
      type: "Video",
      views: 45230,
      likes: 2145,
      shares: 456,
      duration: "8:45",
      date: "2024-06-03"
    },
    {
      id: 2,
      title: "Thriller Nocturno - Trailer",
      type: "Video", 
      views: 38920,
      likes: 1876,
      shares: 234,
      duration: "2:15",
      date: "2024-05-31"
    },
    {
      id: 3,
      title: "Plantilla Romance Urbano",
      type: "Plantilla",
      views: 12340,
      likes: 567,
      shares: 89,
      duration: "N/A",
      date: "2024-06-01"
    }
  ],
  demographics: {
    ageGroups: [
      { range: "18-24", percentage: 25, color: "#1890ff" },
      { range: "25-34", percentage: 35, color: "#52c41a" },
      { range: "35-44", percentage: 22, color: "#faad14" },
      { range: "45-54", percentage: 12, color: "#f5222d" },
      { range: "55+", percentage: 6, color: "#722ed1" }
    ],
    countries: [
      { country: "España", percentage: 40, flag: "🇪🇸" },
      { country: "México", percentage: 25, flag: "🇲🇽" },
      { country: "Argentina", percentage: 15, flag: "🇦🇷" },
      { country: "Colombia", percentage: 10, flag: "🇨🇴" },
      { country: "Otros", percentage: 10, flag: "🌍" }
    ]
  },
  recentActivity: [
    {
      action: "Video generado",
      content: "Romance en París - Episodio Final",
      user: "María González",
      time: "Hace 2 horas",
      icon: <PlayCircleOutlined style={{ color: "#1890ff" }} />
    },
    {
      action: "Plantilla creada",
      content: "Comedia Familiar Moderna",
      user: "Carlos Ruiz",
      time: "Hace 4 horas",
      icon: <FileTextOutlined style={{ color: "#52c41a" }} />
    },
    {
      action: "Guión completado",
      content: "Thriller Psicológico",
      user: "Ana López",
      time: "Hace 6 horas",
      icon: <FileTextOutlined style={{ color: "#faad14" }} />
    }
  ]
};

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [contentType, setContentType] = useState("all");

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "#52c41a" : "#f5222d";
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? "↗" : "↘";
  };

  const topContentColumns = [
    {
      title: "Contenido",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Space>
          <Avatar 
            icon={record.type === "Video" ? <PlayCircleOutlined /> : <FileTextOutlined />}
            style={{ 
              backgroundColor: record.type === "Video" ? "#1890ff" : "#52c41a" 
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.type} • {record.duration}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Visualizaciones",
      dataIndex: "views",
      key: "views",
      render: (views: number) => (
        <div>
          <div style={{ fontWeight: 500 }}>{views.toLocaleString()}</div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            <EyeOutlined /> views
          </Text>
        </div>
      ),
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: "Engagement",
      key: "engagement",
      render: (record: any) => (
        <Space direction="vertical" size="small">
          <div style={{ fontSize: "12px" }}>
            <LikeOutlined style={{ color: "#f5222d", marginRight: 4 }} />
            {record.likes.toLocaleString()}
          </div>
          <div style={{ fontSize: "12px" }}>
            <ShareAltOutlined style={{ color: "#1890ff", marginRight: 4 }} />
            {record.shares.toLocaleString()}
          </div>
        </Space>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <Text type="secondary">{date}</Text>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <BarChartOutlined /> Análisis y Estadísticas
            </Title>
            <Text type="secondary">
              Insights detallados sobre el rendimiento de tu contenido
            </Text>
          </Col>
          <Col>
            <Space>
              <Select
                value={timeRange}
                onChange={setTimeRange}
                style={{ width: 120 }}
              >
                <Option value="24h">Última 24h</Option>
                <Option value="7d">Últimos 7 días</Option>
                <Option value="30d">Últimos 30 días</Option>
                <Option value="90d">Últimos 90 días</Option>
              </Select>
              <RangePicker />
              <Button icon={<DownloadOutlined />}>Exportar</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Métricas Principales */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Visualizaciones"
              value={mockAnalytics.overview.totalViews}
              prefix={<EyeOutlined />}
              suffix={
                <span style={{ color: getGrowthColor(mockAnalytics.overview.viewsGrowth) }}>
                  {getGrowthIcon(mockAnalytics.overview.viewsGrowth)} {Math.abs(mockAnalytics.overview.viewsGrowth)}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Me Gusta"
              value={mockAnalytics.overview.totalLikes}
              prefix={<LikeOutlined style={{ color: "#f5222d" }} />}
              suffix={
                <span style={{ color: getGrowthColor(mockAnalytics.overview.likesGrowth) }}>
                  {getGrowthIcon(mockAnalytics.overview.likesGrowth)} {Math.abs(mockAnalytics.overview.likesGrowth)}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Compartidos"
              value={mockAnalytics.overview.totalShares}
              prefix={<ShareAltOutlined style={{ color: "#1890ff" }} />}
              suffix={
                <span style={{ color: getGrowthColor(mockAnalytics.overview.sharesGrowth) }}>
                  {getGrowthIcon(mockAnalytics.overview.sharesGrowth)} {Math.abs(mockAnalytics.overview.sharesGrowth)}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Descargas"
              value={mockAnalytics.overview.totalDownloads}
              prefix={<DownloadOutlined style={{ color: "#52c41a" }} />}
              suffix={
                <span style={{ color: getGrowthColor(mockAnalytics.overview.downloadsGrowth) }}>
                  {getGrowthIcon(mockAnalytics.overview.downloadsGrowth)} {Math.abs(mockAnalytics.overview.downloadsGrowth)}%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        {/* Contenido Top */}
        <Col span={16}>
          <Card 
            title="Contenido con Mejor Rendimiento"
            extra={
              <Select
                value={contentType}
                onChange={setContentType}
                style={{ width: 120 }}
              >
                <Option value="all">Todo</Option>
                <Option value="video">Videos</Option>
                <Option value="template">Plantillas</Option>
              </Select>
            }
            style={{ marginBottom: "24px" }}
          >
            <Table
              dataSource={mockAnalytics.topContent}
              columns={topContentColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>

          {/* Demografia */}
          <Card title="Demografía de Audiencia">
            <Row gutter={24}>
              <Col span={12}>
                <Title level={4}>Grupos de Edad</Title>
                {mockAnalytics.demographics.ageGroups.map((group, index) => (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text>{group.range} años</Text>
                      <Text strong>{group.percentage}%</Text>
                    </div>
                    <Progress 
                      percent={group.percentage} 
                      strokeColor={group.color}
                      showInfo={false}
                    />
                  </div>
                ))}
              </Col>
              <Col span={12}>
                <Title level={4}>Países Principales</Title>
                {mockAnalytics.demographics.countries.map((country, index) => (
                  <div key={index} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <Text>{country.flag} {country.country}</Text>
                      <Text strong>{country.percentage}%</Text>
                    </div>
                    <Progress 
                      percent={country.percentage} 
                      strokeColor="#1890ff"
                      showInfo={false}
                    />
                  </div>
                ))}
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Panel Lateral */}
        <Col span={8}>
          <Card title="Actividad Reciente" style={{ marginBottom: "24px" }}>
            <List
              dataSource={mockAnalytics.recentActivity}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={
                      <div>
                        <Text strong>{item.action}</Text>
                        <Text type="secondary" style={{ fontSize: "12px", marginLeft: 8 }}>
                          {item.time}
                        </Text>
                      </div>
                    }
                    description={
                      <div>
                        <div style={{ fontWeight: 500 }}>{item.content}</div>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          por {item.user}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
              size="small"
            />
          </Card>

          <Card title="Resumen de Rendimiento">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text>Tasa de Engagement</Text>
                  <Text strong>7.2%</Text>
                </div>
                <Progress percent={72} strokeColor="#52c41a" />
              </div>
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text>Retención de Audiencia</Text>
                  <Text strong>68%</Text>
                </div>
                <Progress percent={68} strokeColor="#1890ff" />
              </div>
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text>Tiempo Promedio de Visualización</Text>
                  <Text strong>5:32</Text>
                </div>
                <Progress percent={85} strokeColor="#fa8c16" />
              </div>

              <Divider />

              <div style={{ textAlign: "center" }}>
                <Title level={4} style={{ margin: 0 }}>
                  <RiseOutlined style={{ color: "#52c41a" }} /> Tendencia
                </Title>
                <Text type="secondary">
                  Tu contenido está creciendo un <Text strong style={{ color: "#52c41a" }}>12.5%</Text> esta semana
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage; 