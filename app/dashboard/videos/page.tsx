"use client";

import React, { useState } from "react";
import {
  Card,
  Table,
  Space,
  Button,
  Input,
  Select,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
  Upload,
  Form,
  Progress,
  Tooltip,
  Image,
  Badge,
  Dropdown,
  message
} from "antd";
import {
  PlayCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  InstagramOutlined,
  FacebookOutlined,
  MoreOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  UserOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const mockVideos = [
  {
    id: 1,
    title: "Romance en París - Episodio Final",
    description: "El desenlace romántico de nuestra historia parisina",
    thumbnail: "/thumbnails/romance-paris.jpg",
    duration: "8:45",
    status: "published",
    platform: "YouTube",
    views: 125430,
    likes: 3421,
    shares: 234,
    uploadDate: "2024-06-03",
    size: "245 MB",
    resolution: "1080p",
    format: "MP4",
    genre: "Romance"
  },
  {
    id: 2,
    title: "Aventura Espacial - Capítulo 1",
    description: "Primer episodio de la saga espacial",
    thumbnail: "/thumbnails/space-adventure.jpg",
    duration: "12:30",
    status: "processing",
    platform: "TikTok",
    views: 89340,
    likes: 2156,
    shares: 445,
    uploadDate: "2024-06-02",
    size: "189 MB",
    resolution: "720p",
    format: "MP4",
    genre: "Sci-Fi"
  },
  {
    id: 3,
    title: "Comedia Familiar - Momentos Divertidos",
    description: "Los mejores momentos de comedia familiar",
    thumbnail: "/thumbnails/family-comedy.jpg",
    duration: "6:20",
    status: "draft",
    platform: "Instagram",
    views: 0,
    likes: 0,
    shares: 0,
    uploadDate: "2024-06-01",
    size: "156 MB",
    resolution: "1080p",
    format: "MP4",
    genre: "Comedia"
  },
  {
    id: 4,
    title: "Thriller Nocturno - Trailer",
    description: "Avance del próximo thriller psicológico",
    thumbnail: "/thumbnails/night-thriller.jpg",
    duration: "2:15",
    status: "published",
    platform: "YouTube",
    views: 456789,
    likes: 8923,
    shares: 1234,
    uploadDate: "2024-05-31",
    size: "89 MB",
    resolution: "4K",
    format: "MP4",
    genre: "Thriller"
  }
];

const VideosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const getStatusTag = (status: string) => {
    const statusMap = {
      published: { color: "green", text: "Publicado" },
      processing: { color: "blue", text: "Procesando" },
      draft: { color: "default", text: "Borrador" },
      failed: { color: "red", text: "Error" }
    };
    return statusMap[status as keyof typeof statusMap] || { color: "default", text: status };
  };

  const getPlatformIcon = (platform: string) => {
    const icons = {
      YouTube: <YoutubeOutlined style={{ color: "#ff0000" }} />,
      TikTok: <TikTokOutlined style={{ color: "#000000" }} />,
      Instagram: <InstagramOutlined style={{ color: "#e4405f" }} />,
      Facebook: <FacebookOutlined style={{ color: "#1877f2" }} />
    };
    return icons[platform as keyof typeof icons] || <PlayCircleOutlined />;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleAction = (action: string, record: any) => {
    switch (action) {
      case "edit":
        message.info(`Editando "${record.title}"`);
        break;
      case "view":
        message.info(`Visualizando "${record.title}"`);
        break;
      case "download":
        message.success(`Descargando "${record.title}"`);
        break;
      case "share":
        message.success(`Compartiendo "${record.title}"`);
        break;
      case "delete":
        Modal.confirm({
          title: "¿Estás seguro?",
          content: `¿Deseas eliminar el video "${record.title}"?`,
          onOk: () => message.success("Video eliminado"),
        });
        break;
    }
  };

  const actionMenuItems = (record: any) => [
    {
      key: "edit",
      label: "Editar",
      icon: <EditOutlined />,
      onClick: () => handleAction("edit", record)
    },
    {
      key: "view",
      label: "Ver Detalles",
      icon: <EyeOutlined />,
      onClick: () => handleAction("view", record)
    },
    { type: 'divider' as const },
    {
      key: "download",
      label: "Descargar",
      icon: <DownloadOutlined />,
      onClick: () => handleAction("download", record)
    },
    {
      key: "share",
      label: "Compartir",
      icon: <ShareAltOutlined />,
      onClick: () => handleAction("share", record)
    },
    { type: 'divider' as const },
    {
      key: "delete",
      label: "Eliminar",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleAction("delete", record)
    }
  ];

  const columns = [
    {
      title: "Video",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Space>
          <div style={{ position: "relative" }}>
            <Avatar 
              size={60}
              shape="square"
              src={record.thumbnail}
              icon={<PlayCircleOutlined />}
              style={{ backgroundColor: "#1890ff" }}
            />
            <div style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "2px 4px",
              borderRadius: "2px",
              fontSize: "10px"
            }}>
              {record.duration}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: "14px", maxWidth: "200px" }}>
              {text}
            </div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.description}
            </Text>
            <div style={{ marginTop: 4 }}>
              <Tag color="blue">{record.genre}</Tag>
              <Tag>{record.resolution}</Tag>
            </div>
          </div>
        </Space>
      ),
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => {
        const { color, text } = getStatusTag(status);
        return (
          <div>
            <Tag color={color}>{text}</Tag>
            {status === "processing" && (
              <div style={{ marginTop: 4 }}>
                <Progress percent={65} size="small" />
              </div>
            )}
          </div>
        );
      },
      filters: [
        { text: "Publicado", value: "published" },
        { text: "Procesando", value: "processing" },
        { text: "Borrador", value: "draft" },
        { text: "Error", value: "failed" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: "Plataforma",
      dataIndex: "platform",
      key: "platform",
      render: (platform: string) => (
        <Space>
          {getPlatformIcon(platform)}
          <span>{platform}</span>
        </Space>
      ),
    },
    {
      title: "Estadísticas",
      key: "stats",
      render: (record: any) => (
        <div>
          <div style={{ fontSize: "12px" }}>
            <EyeOutlined style={{ marginRight: 4 }} />
            {formatNumber(record.views)} visualizaciones
          </div>
          <div style={{ fontSize: "12px", marginTop: 2 }}>
            👍 {formatNumber(record.likes)} • 📤 {formatNumber(record.shares)}
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: "Detalles Técnicos",
      key: "technical",
      render: (record: any) => (
        <div>
          <div style={{ fontSize: "12px" }}>
            <Text type="secondary">Tamaño: {record.size}</Text>
          </div>
          <div style={{ fontSize: "12px" }}>
            <Text type="secondary">Formato: {record.format}</Text>
          </div>
          <div style={{ fontSize: "12px" }}>
            <Text type="secondary">Subido: {record.uploadDate}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Tooltip title="Reproducir">
            <Button size="small" icon={<PlayCircleOutlined />} type="primary" />
          </Tooltip>
          <Tooltip title="Editar">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleAction("edit", record)}
            />
          </Tooltip>
          <Dropdown
            menu={{ items: actionMenuItems(record) }}
            trigger={["click"]}
          >
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filtrar datos
  const filteredData = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || video.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || video.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  // Calcular estadísticas
  const stats = {
    total: mockVideos.length,
    published: mockVideos.filter(v => v.status === "published").length,
    processing: mockVideos.filter(v => v.status === "processing").length,
    total_views: mockVideos.reduce((sum, v) => sum + v.views, 0),
    total_size: mockVideos.reduce((sum, v) => sum + parseFloat(v.size.replace(" MB", "")), 0)
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <PlayCircleOutlined /> Videos Generados
            </Title>
            <Text type="secondary">
              Gestiona y publica tus videos creados con IA
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<CloudUploadOutlined />}>Subir Video</Button>
              <Button 
                type="primary" 
                icon={<ThunderboltOutlined />}
                onClick={() => setUploadModalVisible(true)}
              >
                Generar Video
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Estadísticas */}
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Videos"
              value={stats.total}
              prefix={<PlayCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Publicados"
              value={stats.published}
              prefix={<PlayCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Visualizaciones"
              value={formatNumber(stats.total_views)}
              prefix={<EyeOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Almacenamiento"
              value={`${stats.total_size.toFixed(1)} MB`}
              prefix={<CloudUploadOutlined style={{ color: "#722ed1" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Search
              placeholder="Buscar videos..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col>
            <Select
              placeholder="Estado"
              size="large"
              style={{ width: 150 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="published">Publicados</Option>
              <Option value="processing">Procesando</Option>
              <Option value="draft">Borradores</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Plataforma"
              size="large"
              style={{ width: 150 }}
              value={platformFilter}
              onChange={setPlatformFilter}
            >
              <Option value="all">Todas</Option>
              <Option value="YouTube">YouTube</Option>
              <Option value="TikTok">TikTok</Option>
              <Option value="Instagram">Instagram</Option>
              <Option value="Facebook">Facebook</Option>
            </Select>
          </Col>
          <Col>
            <Button icon={<FilterOutlined />} size="large">
              Más Filtros
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Tabla de Videos */}
      <Card>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} videos`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* Modal de Subida/Generación */}
      <Modal
        title="Generar Nuevo Video"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        width={600}
      >
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <CloudUploadOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
          <Title level={4} style={{ marginTop: 16 }}>
            Genera tu video con IA
          </Title>
          <Text type="secondary">
            Selecciona un guión existente o crea uno nuevo para generar tu video
          </Text>
          <div style={{ marginTop: 32 }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Button 
                type="primary" 
                size="large" 
                icon={<ThunderboltOutlined />}
                block
              >
                Crear desde Guión Existente
              </Button>
              <Button 
                size="large" 
                icon={<PlusOutlined />}
                block
              >
                Crear Nuevo Guión y Video
              </Button>
              <Button 
                size="large" 
                icon={<UploadOutlined />}
                block
              >
                Subir Video Manual
              </Button>
            </Space>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideosPage; 