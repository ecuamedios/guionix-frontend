"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Modal,
  Form,
  Rate,
  Badge,
  Tooltip,
  Grid,
  Divider,
  List,
  Empty,
  message
} from "antd";
import {
  SkinOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  EditOutlined,
  StarOutlined,
  CrownOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TagsOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { useBreakpoint } = Grid;

const mockTemplates = [
  {
    id: 1,
    title: "Romance en la Ciudad",
    description: "Plantilla perfecta para historias románticas modernas con escenarios urbanos",
    preview: "/templates/romance-city.jpg",
    category: "Romance",
    duration: "5-8 min",
    difficulty: "Principiante",
    rating: 4.8,
    downloads: 1234,
    isPremium: false,
    isFavorite: false,
    author: "GUIONIX",
    tags: ["Romance", "Urbano", "Moderno", "Jóvenes"],
    scenes: 8,
    characters: 2,
    lastUpdated: "2024-06-01"
  },
  {
    id: 2,
    title: "Thriller Psicológico",
    description: "Estructura completa para crear suspense y tensión psicológica efectiva",
    preview: "/templates/thriller-psychological.jpg",
    category: "Thriller",
    duration: "12-15 min",
    difficulty: "Avanzado",
    rating: 4.9,
    downloads: 892,
    isPremium: true,
    isFavorite: true,
    author: "ExperoThrillers",
    tags: ["Thriller", "Psicológico", "Suspense", "Misterio"],
    scenes: 15,
    characters: 4,
    lastUpdated: "2024-05-28"
  },
  {
    id: 3,
    title: "Comedia Familiar",
    description: "Situaciones divertidas para toda la familia con humor sano y entretenido",
    preview: "/templates/family-comedy.jpg",
    category: "Comedia",
    duration: "6-10 min",
    difficulty: "Intermedio",
    rating: 4.6,
    downloads: 2156,
    isPremium: false,
    isFavorite: false,
    author: "ComedyMaster",
    tags: ["Comedia", "Familia", "Divertido", "Todo Público"],
    scenes: 10,
    characters: 3,
    lastUpdated: "2024-06-03"
  },
  {
    id: 4,
    title: "Aventura Épica",
    description: "Viaje heroico con estructura de tres actos para grandes aventuras",
    preview: "/templates/epic-adventure.jpg",
    category: "Aventura",
    duration: "15-20 min",
    difficulty: "Avanzado",
    rating: 4.7,
    downloads: 567,
    isPremium: true,
    isFavorite: false,
    author: "EpicStories",
    tags: ["Aventura", "Héroe", "Épico", "Acción"],
    scenes: 20,
    characters: 6,
    lastUpdated: "2024-05-25"
  },
  {
    id: 5,
    title: "Drama Histórico",
    description: "Narrativa emotiva ambientada en períodos históricos significativos",
    preview: "/templates/historical-drama.jpg",
    category: "Drama",
    duration: "18-25 min",
    difficulty: "Avanzado",
    rating: 4.5,
    downloads: 789,
    isPremium: true,
    isFavorite: true,
    author: "HistoryTales",
    tags: ["Drama", "Histórico", "Emotivo", "Período"],
    scenes: 12,
    characters: 5,
    lastUpdated: "2024-05-30"
  },
  {
    id: 6,
    title: "Ciencia Ficción Corta",
    description: "Conceptos futuristas y tecnológicos para historias de ciencia ficción",
    preview: "/templates/scifi-short.jpg",
    category: "Sci-Fi",
    duration: "8-12 min",
    difficulty: "Intermedio",
    rating: 4.4,
    downloads: 456,
    isPremium: false,
    isFavorite: false,
    author: "FutureVisions",
    tags: ["Sci-Fi", "Futuro", "Tecnología", "Innovador"],
    scenes: 9,
    characters: 3,
    lastUpdated: "2024-06-02"
  }
];

const TemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const screens = useBreakpoint();

  const getCategoryColor = (category: string) => {
    const colors = {
      Romance: "pink",
      Thriller: "red",
      Comedia: "yellow",
      Aventura: "orange",
      Drama: "blue",
      "Sci-Fi": "purple"
    };
    return colors[category as keyof typeof colors] || "default";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Principiante: "green",
      Intermedio: "orange",
      Avanzado: "red"
    };
    return colors[difficulty as keyof typeof colors] || "default";
  };

  const handleUseTemplate = (template: any) => {
    message.success(`Usando plantilla "${template.title}"`);
  };

  const handleFavoriteToggle = (templateId: number) => {
    message.success("Favorito actualizado");
  };

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
    setPreviewModalVisible(true);
  };

  // Filtrar plantillas
  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || template.difficulty === difficultyFilter;
    const matchesFavorites = !showFavoritesOnly || template.isFavorite;
    const matchesPremium = !showPremiumOnly || template.isPremium;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorites && matchesPremium;
  });

  const categories = ["Romance", "Thriller", "Comedia", "Aventura", "Drama", "Sci-Fi"];
  const difficulties = ["Principiante", "Intermedio", "Avanzado"];

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <SkinOutlined /> Plantillas de Guiones
            </Title>
            <Text type="secondary">
              Acelera tu proceso creativo con plantillas profesionales
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<HeartOutlined />}>Mis Favoritas</Button>
              <Button type="primary" icon={<PlusOutlined />}>
                Crear Plantilla
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Filtros y Búsqueda */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} lg={8}>
            <Search
              placeholder="Buscar plantillas..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <Select
              placeholder="Categoría"
              size="large"
              style={{ width: "100%" }}
              value={categoryFilter}
              onChange={setCategoryFilter}
            >
              <Option value="all">Todas</Option>
              {categories.map(cat => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <Select
              placeholder="Dificultad"
              size="large"
              style={{ width: "100%" }}
              value={difficultyFilter}
              onChange={setDifficultyFilter}
            >
              <Option value="all">Todas</Option>
              {difficulties.map(diff => (
                <Option key={diff} value={diff}>{diff}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} lg={8}>
            <Space wrap>
              <Button 
                type={showFavoritesOnly ? "primary" : "default"}
                icon={<HeartOutlined />}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              >
                Solo Favoritas
              </Button>
              <Button 
                type={showPremiumOnly ? "primary" : "default"}
                icon={<CrownOutlined />}
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              >
                Solo Premium
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Grid de Plantillas */}
      {filteredTemplates.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredTemplates.map((template) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={template.id}>
              <Card
                hoverable
                cover={
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        background: `linear-gradient(45deg, ${getCategoryColor(template.category)} 0%, #f0f0f0 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "48px"
                      }}
                    >
                      <SkinOutlined />
                    </div>
                    {template.isPremium && (
                      <Badge.Ribbon text="Premium" color="gold">
                        <div />
                      </Badge.Ribbon>
                    )}
                    <div style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      gap: 8
                    }}>
                      <Button
                        size="small"
                        type="text"
                        icon={template.isFavorite ? <HeartFilled style={{ color: "#ff4d4f" }} /> : <HeartOutlined />}
                        onClick={() => handleFavoriteToggle(template.id)}
                        style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                      />
                    </div>
                  </div>
                }
                actions={[
                  <Tooltip title="Vista Previa">
                    <EyeOutlined onClick={() => handlePreview(template)} />
                  </Tooltip>,
                  <Tooltip title="Usar Plantilla">
                    <PlayCircleOutlined onClick={() => handleUseTemplate(template)} />
                  </Tooltip>,
                  <Tooltip title="Descargar">
                    <DownloadOutlined />
                  </Tooltip>,
                  <Tooltip title="Compartir">
                    <ShareAltOutlined />
                  </Tooltip>
                ]}
              >
                <Meta
                  title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Text strong style={{ fontSize: "14px" }}>{template.title}</Text>
                      <Rate disabled defaultValue={template.rating} style={{ fontSize: "12px" }} />
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph
                        ellipsis={{ rows: 2, expandable: false }}
                        style={{ fontSize: "12px", margin: "8px 0" }}
                      >
                        {template.description}
                      </Paragraph>
                      
                      <div style={{ marginBottom: 8 }}>
                        <Tag color={getCategoryColor(template.category)}>{template.category}</Tag>
                        <Tag color={getDifficultyColor(template.difficulty)}>{template.difficulty}</Tag>
                      </div>

                      <div style={{ fontSize: "11px", color: "#666" }}>
                        <div>⏱️ {template.duration}</div>
                        <div>🎬 {template.scenes} escenas • 👥 {template.characters} personajes</div>
                        <div>📥 {template.downloads} descargas</div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Empty
            description="No se encontraron plantillas"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" icon={<PlusOutlined />}>
              Crear Nueva Plantilla
            </Button>
          </Empty>
        </Card>
      )}

      {/* Modal de Vista Previa */}
      <Modal
        title={selectedTemplate?.title}
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setPreviewModalVisible(false)}>
            Cerrar
          </Button>,
          <Button key="use" type="primary" onClick={() => handleUseTemplate(selectedTemplate)}>
            Usar esta Plantilla
          </Button>
        ]}
      >
        {selectedTemplate && (
          <div>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <div style={{
                  height: 200,
                  background: `linear-gradient(45deg, ${getCategoryColor(selectedTemplate.category)} 0%, #f0f0f0 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  color: "white",
                  fontSize: "64px"
                }}>
                  <SkinOutlined />
                </div>
              </Col>
              <Col span={12}>
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Categoría: </Text>
                    <Tag color={getCategoryColor(selectedTemplate.category)}>
                      {selectedTemplate.category}
                    </Tag>
                  </div>
                  <div>
                    <Text strong>Dificultad: </Text>
                    <Tag color={getDifficultyColor(selectedTemplate.difficulty)}>
                      {selectedTemplate.difficulty}
                    </Tag>
                  </div>
                  <div>
                    <Text strong>Duración: </Text>
                    <Text>{selectedTemplate.duration}</Text>
                  </div>
                  <div>
                    <Text strong>Escenas: </Text>
                    <Text>{selectedTemplate.scenes}</Text>
                  </div>
                  <div>
                    <Text strong>Personajes: </Text>
                    <Text>{selectedTemplate.characters}</Text>
                  </div>
                  <div>
                    <Text strong>Valoración: </Text>
                    <Rate disabled defaultValue={selectedTemplate.rating} style={{ fontSize: "14px" }} />
                    <Text style={{ marginLeft: 8 }}>({selectedTemplate.rating})</Text>
                  </div>
                  <div>
                    <Text strong>Descargas: </Text>
                    <Text>{selectedTemplate.downloads}</Text>
                  </div>
                </Space>
              </Col>
            </Row>

            <Divider />

            <div>
              <Title level={4}>Descripción</Title>
              <Paragraph>{selectedTemplate.description}</Paragraph>
            </div>

            <div>
              <Title level={4}>Etiquetas</Title>
              <Space wrap>
                {selectedTemplate.tags.map((tag: string) => (
                  <Tag key={tag} icon={<TagsOutlined />}>
                    {tag}
                  </Tag>
                ))}
              </Space>
            </div>

            <div style={{ marginTop: 16 }}>
              <Title level={4}>Autor</Title>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Text>{selectedTemplate.author}</Text>
              </Space>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TemplatesPage; 