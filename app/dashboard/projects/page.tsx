"use client";

import React, { useState } from "react";
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import {
  Table,
  Space,
  Card,
  Button,
  Input,
  Select,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  Modal,
  Form,
  DatePicker,
  Switch,
  Divider,
  Dropdown,
  message
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  FileTextOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
  MoreOutlined,
  ExportOutlined,
  CopyOutlined,
  FolderOpenOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// Datos simulados de proyectos
const mockProjects = [
  {
    id: 1,
    title: "Romance en París",
    description: "Una historia de amor contemporánea ambientada en la ciudad de la luz",
    genre: "Romance",
    status: "completed",
    duration: "8:45",
    createdAt: "2024-06-03",
    updatedAt: "2024-06-03",
    author: "María González",
    platform: "YouTube",
    views: 12543,
    progress: 100,
    thumbnail: "romance-paris.jpg"
  },
  {
    id: 2,
    title: "Aventura Espacial",
    description: "Ciencia ficción sobre la exploración de un nuevo planeta",
    genre: "Sci-Fi",
    status: "in_progress",
    duration: "12:30",
    createdAt: "2024-06-02",
    updatedAt: "2024-06-04",
    author: "Carlos Ruiz",
    platform: "TikTok",
    views: 8934,
    progress: 75,
    thumbnail: "space-adventure.jpg"
  },
  {
    id: 3,
    title: "Comedia Familiar",
    description: "Situaciones divertidas en el hogar de una familia típica",
    genre: "Comedia",
    status: "draft",
    duration: "6:20",
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
    author: "Ana López",
    platform: "Instagram",
    views: 0,
    progress: 30,
    thumbnail: "family-comedy.jpg"
  },
  {
    id: 4,
    title: "Thriller Nocturno",
    description: "Suspenso psicológico en una noche tormentosa",
    genre: "Thriller",
    status: "review",
    duration: "15:15",
    createdAt: "2024-05-31",
    updatedAt: "2024-06-02",
    author: "Luis Martín",
    platform: "DramaBox",
    views: 25678,
    progress: 90,
    thumbnail: "night-thriller.jpg"
  },
  {
    id: 5,
    title: "Drama Histórico",
    description: "Recreación de eventos importantes del siglo XVIII",
    genre: "Drama",
    status: "completed",
    duration: "18:45",
    createdAt: "2024-05-30",
    updatedAt: "2024-05-30",
    author: "Elena Sánchez",
    platform: "YouTube",
    views: 45123,
    progress: 100,
    thumbnail: "historical-drama.jpg"
  }
];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getStatusTag = (status: string) => {
    const statusMap = {
      completed: { color: "green", text: "Completado" },
      in_progress: { color: "blue", text: "En Progreso" },
      draft: { color: "default", text: "Borrador" },
      review: { color: "orange", text: "En Revisión" }
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

  const getPlatformIcon = (platform: string) => {
    const icons = {
      YouTube: "📺",
      TikTok: "🎵",
      Instagram: "📸",
      DramaBox: "🎬",
      Facebook: "👥"
    };
    return icons[platform as keyof typeof icons] || "📱";
  };

  const handleActionClick = (action: string, record: any) => {
    switch (action) {
      case "edit":
        message.info(`Editando "${record.title}"`);
        break;
      case "view":
        message.info(`Visualizando "${record.title}"`);
        break;
      case "delete":
        Modal.confirm({
          title: "¿Estás seguro?",
          content: `¿Deseas eliminar el proyecto "${record.title}"?`,
          onOk: () => message.success("Proyecto eliminado"),
        });
        break;
      case "duplicate":
        message.success(`"${record.title}" duplicado`);
        break;
      case "export":
        message.success(`"${record.title}" exportado`);
        break;
      case "share":
        message.success(`"${record.title}" compartido`);
        break;
    }
  };

  const divider = { type: 'divider' as const };

  const actionItems = (record: any) => [
    {
      key: "edit",
      label: "Editar",
      icon: <EditOutlined />,
      onClick: () => handleActionClick("edit", record)
    },
    {
      key: "view",
      label: "Ver Detalles",
      icon: <EyeOutlined />,
      onClick: () => handleActionClick("view", record)
    },
    divider,
    {
      key: "duplicate",
      label: "Duplicar",
      icon: <CopyOutlined />,
      onClick: () => handleActionClick("duplicate", record)
    },
    {
      key: "export",
      label: "Exportar",
      icon: <ExportOutlined />,
      onClick: () => handleActionClick("export", record)
    },
    {
      key: "share",
      label: "Compartir",
      icon: <ShareAltOutlined />,
      onClick: () => handleActionClick("share", record)
    },
    divider,
    {
      key: "delete",
      label: "Eliminar",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleActionClick("delete", record)
    }
  ];

  const columns = [
    {
      title: "Proyecto",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <Space>
          <Avatar 
            icon={<FileTextOutlined />} 
            style={{ 
              backgroundColor: getGenreColor(record.genre) === "default" ? "#1890ff" : undefined,
              color: getGenreColor(record.genre) === "default" ? "white" : undefined
            }}
          />
          <div>
            <div style={{ fontWeight: 500, fontSize: "14px" }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.description}
            </Text>
          </div>
        </Space>
      ),
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Género",
      dataIndex: "genre",
      key: "genre",
      render: (genre: string) => (
        <Tag color={getGenreColor(genre)}>{genre}</Tag>
      ),
      filters: [
        { text: "Romance", value: "Romance" },
        { text: "Comedia", value: "Comedia" },
        { text: "Drama", value: "Drama" },
        { text: "Thriller", value: "Thriller" },
        { text: "Sci-Fi", value: "Sci-Fi" },
      ],
      onFilter: (value: any, record: any) => record.genre === value,
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
            {status === "in_progress" && (
              <div style={{ marginTop: 4 }}>
                <Progress percent={record.progress} size="small" strokeWidth={3} />
              </div>
            )}
          </div>
        );
      },
      filters: [
        { text: "Completado", value: "completed" },
        { text: "En Progreso", value: "in_progress" },
        { text: "Borrador", value: "draft" },
        { text: "En Revisión", value: "review" },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: "Plataforma",
      dataIndex: "platform",
      key: "platform",
      render: (platform: string) => (
        <span>{getPlatformIcon(platform)} {platform}</span>
      ),
    },
    {
      title: "Duración",
      dataIndex: "duration",
      key: "duration",
      sorter: (a: any, b: any) => {
        const [aMin, aSec] = a.duration.split(":").map(Number);
        const [bMin, bSec] = b.duration.split(":").map(Number);
        return (aMin * 60 + aSec) - (bMin * 60 + bSec);
      },
    },
    {
      title: "Visualizaciones",
      dataIndex: "views",
      key: "views",
      render: (views: number) => (
        <span>
          <PlayCircleOutlined style={{ marginRight: 4, color: "#1890ff" }} />
          {views.toLocaleString()}
        </span>
      ),
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span>
          <CalendarOutlined style={{ marginRight: 4 }} />
          {date}
        </span>
      ),
      sorter: (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => handleActionClick("edit", record)}
          />
          <Button 
            size="small" 
            icon={<EyeOutlined />} 
            onClick={() => handleActionClick("view", record)}
          />
          <Dropdown
            menu={{ items: actionItems(record) }}
            trigger={["click"]}
          >
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filtrar datos según los filtros aplicados
  const filteredData = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesGenre = genreFilter === "all" || project.genre === genreFilter;
    
    return matchesSearch && matchesStatus && matchesGenre;
  });

  // Calcular estadísticas
  const stats = {
    total: mockProjects.length,
    completed: mockProjects.filter(p => p.status === "completed").length,
    in_progress: mockProjects.filter(p => p.status === "in_progress").length,
    total_views: mockProjects.reduce((sum, p) => sum + p.views, 0)
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <FolderOpenOutlined /> Mis Proyectos
            </Title>
            <Text type="secondary">
              Gestiona todos tus guiones y proyectos de video
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<DownloadOutlined />}>Exportar Todo</Button>
              <Button type="primary" icon={<PlusOutlined />}>
                Nuevo Proyecto
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
              title="Total Proyectos"
              value={stats.total}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completados"
              value={stats.completed}
              prefix={<FileTextOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="En Progreso"
              value={stats.in_progress}
              prefix={<FileTextOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Visualizaciones"
              value={stats.total_views}
              prefix={<PlayCircleOutlined style={{ color: "#722ed1" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filtros y Búsqueda */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Search
              placeholder="Buscar proyectos..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
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
              <Option value="completed">Completados</Option>
              <Option value="in_progress">En Progreso</Option>
              <Option value="draft">Borradores</Option>
              <Option value="review">En Revisión</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Género"
              size="large"
              style={{ width: 150 }}
              value={genreFilter}
              onChange={setGenreFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="Romance">Romance</Option>
              <Option value="Comedia">Comedia</Option>
              <Option value="Drama">Drama</Option>
              <Option value="Thriller">Thriller</Option>
              <Option value="Sci-Fi">Sci-Fi</Option>
            </Select>
          </Col>
          <Col>
            <Button icon={<FilterOutlined />} size="large">
              Más Filtros
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Tabla de Proyectos */}
      <Card>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} de ${total} proyectos`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default ProjectsPage; 