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
  Form,
  Rate,
  Upload,
  message
} from "antd";
import {
  SoundOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DownloadOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  UserOutlined,
  GlobalOutlined,
  StarOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const mockVoices = [
  {
    id: 1,
    name: "María Fernández",
    description: "Voz femenina profesional, ideal para narraciones dramáticas",
    language: "Español",
    accent: "España",
    gender: "Femenina",
    age: "Adulta",
    style: "Dramática",
    rating: 4.8,
    samples: 12,
    duration: "2:45",
    category: "Profesional",
    popularity: "Alta",
    price: "Premium"
  },
  {
    id: 2,
    name: "Carlos Vega",
    description: "Voz masculina versátil para todo tipo de contenido",
    language: "Español",
    accent: "México", 
    gender: "Masculina",
    age: "Joven",
    style: "Versátil",
    rating: 4.6,
    samples: 8,
    duration: "3:12",
    category: "Estándar",
    popularity: "Media",
    price: "Gratis"
  },
  {
    id: 3,
    name: "Isabella Santos",
    description: "Voz dulce y emotiva, perfecta para romances",
    language: "Español",
    accent: "Argentina",
    gender: "Femenina", 
    age: "Joven",
    style: "Romántica",
    rating: 4.9,
    samples: 15,
    duration: "1:58",
    category: "Premium",
    popularity: "Alta",
    price: "Premium"
  },
  {
    id: 4,
    name: "Roberto Silva",
    description: "Voz grave y autoritaria para thrillers",
    language: "Español",
    accent: "Colombia",
    gender: "Masculina",
    age: "Mayor",
    style: "Autoritaria",
    rating: 4.7,
    samples: 6,
    duration: "2:23",
    category: "Profesional",
    popularity: "Media",
    price: "Premium"
  }
];

const VoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [styleFilter, setStyleFilter] = useState("all");
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const getGenderColor = (gender: string) => {
    return gender === "Femenina" ? "pink" : gender === "Masculina" ? "blue" : "default";
  };

  const getStyleColor = (style: string) => {
    const colors = {
      "Dramática": "red",
      "Versátil": "green", 
      "Romántica": "pink",
      "Autoritaria": "orange"
    };
    return colors[style as keyof typeof colors] || "default";
  };

  const handlePlayPause = (voiceId: number) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      message.info("Reproducción pausada");
    } else {
      setPlayingVoice(voiceId);
      message.success("Reproduciendo muestra de voz");
    }
  };

  const handleAction = (action: string, voice: any) => {
    switch (action) {
      case "edit":
        message.info(`Editando voz "${voice.name}"`);
        break;
      case "delete":
        Modal.confirm({
          title: "¿Estás seguro?",
          content: `¿Deseas eliminar la voz "${voice.name}"?`,
          onOk: () => message.success("Voz eliminada"),
        });
        break;
      case "download":
        message.success(`Descargando "${voice.name}"`);
        break;
    }
  };

  const columns = [
    {
      title: "Voz",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ backgroundColor: getGenderColor(record.gender) }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.description}
            </Text>
            <div style={{ marginTop: 4 }}>
              <Tag color={getGenderColor(record.gender)}>
                {record.gender}
              </Tag>
              <Tag color={getStyleColor(record.style)}>
                {record.style}
              </Tag>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Idioma/Acento",
      key: "language",
      render: (record: any) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <GlobalOutlined />
            <Text strong>{record.language}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.accent}
          </Text>
        </div>
      ),
    },
    {
      title: "Calificación",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div>
          <Rate disabled defaultValue={rating} style={{ fontSize: "14px" }} />
          <div style={{ fontSize: "12px", color: "#666" }}>
            {rating}/5.0
          </div>
        </div>
      ),
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
    {
      title: "Muestras",
      key: "samples",
      render: (record: any) => (
        <div>
          <div style={{ fontSize: "14px", fontWeight: 500 }}>
            {record.samples} muestras
          </div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Duración: {record.duration}
          </Text>
        </div>
      ),
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
      render: (category: string, record: any) => (
        <div>
          <Tag color={record.price === "Premium" ? "gold" : "green"}>
            {category}
          </Tag>
          <div style={{ fontSize: "12px", marginTop: 2 }}>
            <Text type={record.price === "Premium" ? "warning" : "success"}>
              {record.price}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button
            size="small"
            type={playingVoice === record.id ? "primary" : "default"}
            icon={playingVoice === record.id ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={() => handlePlayPause(record.id)}
          />
          <Button 
            size="small" 
            icon={<DownloadOutlined />}
            onClick={() => handleAction("download", record)}
          />
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleAction("edit", record)}
          />
          <Button 
            size="small" 
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleAction("delete", record)}
          />
        </Space>
      ),
    },
  ];

  // Filtrar datos
  const filteredData = mockVoices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = languageFilter === "all" || voice.language === languageFilter;
    const matchesGender = genderFilter === "all" || voice.gender === genderFilter;
    const matchesStyle = styleFilter === "all" || voice.style === styleFilter;
    
    return matchesSearch && matchesLanguage && matchesGender && matchesStyle;
  });

  // Calcular estadísticas
  const stats = {
    total: mockVoices.length,
    premium: mockVoices.filter(v => v.price === "Premium").length,
    free: mockVoices.filter(v => v.price === "Gratis").length,
    avgRating: (mockVoices.reduce((sum, v) => sum + v.rating, 0) / mockVoices.length).toFixed(1)
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <SoundOutlined /> Biblioteca de Locuciones
            </Title>
            <Text type="secondary">
              Explora y usa voces profesionales para tus proyectos
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<UploadOutlined />}>Subir Voz</Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setUploadModalVisible(true)}
              >
                Generar Voz IA
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
              title="Total Voces"
              value={stats.total}
              prefix={<SoundOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Voces Premium"
              value={stats.premium}
              prefix={<StarOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Voces Gratuitas"
              value={stats.free}
              prefix={<SoundOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Calificación Promedio"
              value={stats.avgRating}
              prefix={<StarOutlined style={{ color: "#722ed1" }} />}
              suffix="/5.0"
            />
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Search
              placeholder="Buscar voces por nombre o descripción..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col>
            <Select
              placeholder="Idioma"
              size="large"
              style={{ width: 120 }}
              value={languageFilter}
              onChange={setLanguageFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="Español">Español</Option>
              <Option value="English">English</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Género"
              size="large"
              style={{ width: 120 }}
              value={genderFilter}
              onChange={setGenderFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="Femenina">Femenina</Option>
              <Option value="Masculina">Masculina</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Estilo"
              size="large"
              style={{ width: 140 }}
              value={styleFilter}
              onChange={setStyleFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="Dramática">Dramática</Option>
              <Option value="Versátil">Versátil</Option>
              <Option value="Romántica">Romántica</Option>
              <Option value="Autoritaria">Autoritaria</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Tabla de Voces */}
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
              `${range[0]}-${range[1]} de ${total} voces`,
          }}
        />
      </Card>

      {/* Modal de Subida */}
      <Modal
        title="Subir Nueva Voz"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Nombre de la Voz" required>
            <Input placeholder="Ej: María Rodríguez" />
          </Form.Item>
          
          <Form.Item label="Descripción">
            <Input.TextArea 
              rows={3}
              placeholder="Describe el estilo y características de la voz..."
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Género">
                <Select>
                  <Option value="femenina">Femenina</Option>
                  <Option value="masculina">Masculina</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Idioma">
                <Select>
                  <Option value="español">Español</Option>
                  <Option value="english">English</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Archivo de Audio">
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <SoundOutlined />
              </p>
              <p className="ant-upload-text">
                Haz clic o arrastra archivos aquí para subirlos
              </p>
              <p className="ant-upload-hint">
                Soporta: MP3, WAV, M4A (máx. 10MB)
              </p>
            </Upload.Dragger>
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setUploadModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary">
                Subir Voz
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default VoicesPage; 