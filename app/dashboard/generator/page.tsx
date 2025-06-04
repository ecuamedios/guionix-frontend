"use client";

import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Steps,
  Radio,
  Slider,
  Switch,
  Divider,
  Alert,
  Progress,
  Tag,
  List,
  Avatar,
  Modal,
  notification
} from "antd";
import {
  RobotOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  EditOutlined,
  DownloadOutlined,
  ShareAltOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const GeneratorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [form] = Form.useForm();
  const [generatedScript, setGeneratedScript] = useState("");

  const genres = [
    { value: "romance", label: "Romance", color: "pink" },
    { value: "comedy", label: "Comedia", color: "yellow" },
    { value: "drama", label: "Drama", color: "blue" },
    { value: "thriller", label: "Thriller", color: "red" },
    { value: "scifi", label: "Ciencia Ficción", color: "purple" },
    { value: "fantasy", label: "Fantasía", color: "green" },
    { value: "action", label: "Acción", color: "orange" },
    { value: "horror", label: "Terror", color: "volcano" }
  ];

  const tones = [
    "Profesional y Formal",
    "Casual y Amigable",
    "Emocionante y Dinámico",
    "Inspirador y Motivador",
    "Humorístico y Divertido",
    "Dramático e Intenso"
  ];

  const platforms = [
    { value: "youtube", label: "YouTube", icon: "📺" },
    { value: "tiktok", label: "TikTok", icon: "🎵" },
    { value: "instagram", label: "Instagram", icon: "📸" },
    { value: "dramabox", label: "DramaBox", icon: "🎬" },
    { value: "facebook", label: "Facebook", icon: "👥" }
  ];

  const steps = [
    {
      title: "Configuración Básica",
      description: "Define el tema y género"
    },
    {
      title: "Parámetros Avanzados",
      description: "Ajusta tono y duración"
    },
    {
      title: "Generación",
      description: "Crea tu guión con IA"
    },
    {
      title: "Resultado",
      description: "Revisa y descarga"
    }
  ];

  const templates = [
    {
      title: "Historia de Amor Moderna",
      description: "Romance contemporáneo en ciudad",
      genre: "romance",
      duration: "5-8 min",
      popularity: "Alta"
    },
    {
      title: "Comedia de Situación",
      description: "Situaciones divertidas cotidianas",
      genre: "comedy",
      duration: "3-5 min",
      popularity: "Media"
    },
    {
      title: "Thriller Psicológico",
      description: "Suspenso y tensión dramática",
      genre: "thriller",
      duration: "8-12 min",
      popularity: "Alta"
    }
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    setCurrentStep(2);

    // Simulación de generación
    setTimeout(() => {
      const sampleScript = `
FADE IN:

EXT. PARQUE DE LA CIUDAD - DÍA

Un hermoso día soleado. MARÍA (25), una joven artista con pincel en mano, pinta un paisaje frente a un lago. Su concentración es absoluta.

MARÍA
(susurrando para sí)
Los colores... nunca son suficientes para capturar la realidad.

De repente, una pelota de fútbol rueda hasta sus pies. CARLOS (27), un arquitecto en ropa deportiva, se acerca corriendo.

CARLOS
¡Disculpa! ¿Podrías...?

María levanta la vista. Sus miradas se cruzan. El tiempo se detiene.

MARÍA
(sonriendo)
Claro, aquí tienes.

Le devuelve la pelota. Sus dedos se rozan levemente.

CARLOS
Gracias... Tu pintura es increíble.

MARÍA
(ruborizada)
Aún no está terminada.

CARLOS
Como las mejores historias.

Se alejan lentamente, ambos volteando a mirarse una vez más.

FADE OUT.

--- FIN DEL GUIÓN ---

DURACIÓN ESTIMADA: 8 minutos
GÉNERO: Romance
TONO: Romántico y optimista
      `;

      setGeneratedScript(sampleScript);
      setGenerating(false);
      setCurrentStep(3);
      
      notification.success({
        message: "¡Guión Generado!",
        description: "Tu guión ha sido creado exitosamente",
        icon: <ThunderboltOutlined style={{ color: "#52c41a" }} />
      });
    }, 3000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="Configuración Básica" extra={<BulbOutlined />}>
            <Form form={form} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tema Principal"
                    name="topic"
                    rules={[{ required: true, message: "Por favor ingresa un tema" }]}
                  >
                    <Input 
                      placeholder="Ej: Una historia de amor en París"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Género"
                    name="genre"
                    rules={[{ required: true, message: "Selecciona un género" }]}
                  >
                    <Select placeholder="Selecciona un género" size="large">
                      {genres.map(genre => (
                        <Option key={genre.value} value={genre.value}>
                          <Tag color={genre.color}>{genre.label}</Tag>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Descripción Adicional" name="description">
                <TextArea
                  rows={4}
                  placeholder="Describe personajes, escenarios o elementos específicos que quieres incluir..."
                />
              </Form.Item>

              <Form.Item label="Plataforma de Destino" name="platform">
                <Radio.Group>
                  {platforms.map(platform => (
                    <Radio.Button key={platform.value} value={platform.value}>
                      {platform.icon} {platform.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
        );

      case 1:
        return (
          <Card title="Parámetros Avanzados" extra={<SettingOutlined />}>
            <Form form={form} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Duración Objetivo (minutos)" name="duration">
                    <Slider
                      range
                      min={1}
                      max={20}
                      defaultValue={[5, 8]}
                      marks={{
                        1: "1min",
                        5: "5min",
                        10: "10min",
                        15: "15min",
                        20: "20min"
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tono del Guión" name="tone">
                    <Select placeholder="Selecciona el tono" size="large">
                      {tones.map(tone => (
                        <Option key={tone} value={tone}>{tone}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Incluir Diálogos" name="includeDialogue" valuePropName="checked">
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Descripciones Detalladas" name="detailedDescriptions" valuePropName="checked">
                    <Switch defaultChecked />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Notas de Dirección" name="directionNotes" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Divider>Opciones Avanzadas</Divider>

              <Form.Item label="Número de Personajes" name="characterCount">
                <Radio.Group defaultValue="2-3">
                  <Radio.Button value="1">Solo</Radio.Button>
                  <Radio.Button value="2-3">2-3 personas</Radio.Button>
                  <Radio.Button value="4-6">4-6 personas</Radio.Button>
                  <Radio.Button value="many">Elenco grande</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Estilo Narrativo" name="narrativeStyle">
                <Select placeholder="Selecciona estilo narrativo" size="large">
                  <Option value="linear">Narrativa Lineal</Option>
                  <Option value="flashback">Con Flashbacks</Option>
                  <Option value="multiple">Múltiples Perspectivas</Option>
                  <Option value="experimental">Experimental</Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        );

      case 2:
        return (
          <Card title="Generando tu Guión..." extra={<RobotOutlined spin />}>
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Progress
                type="circle"
                percent={generating ? 75 : 100}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
              <div style={{ marginTop: 20 }}>
                <Title level={4}>
                  {generating ? "Analizando parámetros..." : "¡Generación Completada!"}
                </Title>
                <Text type="secondary">
                  {generating 
                    ? "Nuestra IA está creando tu guión personalizado"
                    : "Tu guión está listo para revisar"
                  }
                </Text>
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card 
            title="Tu Guión Generado" 
            extra={
              <Space>
                <Button icon={<EditOutlined />}>Editar</Button>
                <Button icon={<DownloadOutlined />} type="primary">Descargar</Button>
                <Button icon={<ShareAltOutlined />}>Compartir</Button>
              </Space>
            }
          >
            <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {generatedScript}
              </pre>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <RobotOutlined /> Generador de Guiones IA
            </Title>
            <Text type="secondary">
              Crea guiones profesionales en minutos usando inteligencia artificial
            </Text>
          </Col>
          <Col>
            <Space>
              <Button>Ver Historial</Button>
              <Button type="primary" ghost>Plantillas</Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {/* Panel Principal */}
        <Col xs={24} lg={16}>
          {/* Stepper */}
          <Card style={{ marginBottom: "16px" }}>
            <Steps current={currentStep} onChange={setCurrentStep}>
              {steps.map((step, index) => (
                <Step 
                  key={index}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </Steps>
          </Card>

          {/* Contenido del Step */}
          {renderStepContent()}

          {/* Botones de Navegación */}
          <Card style={{ marginTop: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <Space>
                {currentStep > 0 && currentStep < 3 && (
                  <Button size="large" onClick={() => setCurrentStep(currentStep - 1)}>
                    Anterior
                  </Button>
                )}
                {currentStep < 1 && (
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Siguiente
                  </Button>
                )}
                {currentStep === 1 && (
                  <Button 
                    type="primary" 
                    size="large"
                    icon={<ThunderboltOutlined />}
                    onClick={handleGenerate}
                    loading={generating}
                  >
                    Generar Guión
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={() => {
                      setCurrentStep(0);
                      setGeneratedScript("");
                      form.resetFields();
                    }}
                  >
                    Crear Nuevo Guión
                  </Button>
                )}
              </Space>
            </div>
          </Card>
        </Col>

        {/* Panel Lateral */}
        <Col xs={24} lg={8}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Plantillas Populares */}
            <Card title="Plantillas Populares" size="small">
              <List
                dataSource={templates}
                renderItem={(template) => (
                  <List.Item
                    actions={[
                      <Button type="link" size="small">Usar</Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<FileTextOutlined />} />}
                      title={template.title}
                      description={
                        <div>
                          <div>{template.description}</div>
                          <Space style={{ marginTop: 4 }}>
                            <Tag>{template.duration}</Tag>
                            <Tag color="blue">{template.popularity}</Tag>
                          </Space>
                        </div>
                      }
                    />
                  </List.Item>
                )}
                size="small"
              />
            </Card>

            {/* Tips de IA */}
            <Card title="💡 Tips para Mejores Resultados" size="small">
              <List
                size="small"
                dataSource={[
                  "Sé específico con los detalles del personaje",
                  "Define claramente el conflicto principal",
                  "Incluye el tono emocional deseado",
                  "Menciona el público objetivo"
                ]}
                renderItem={(tip) => (
                  <List.Item>
                    <Text style={{ fontSize: "12px" }}>{tip}</Text>
                  </List.Item>
                )}
              />
            </Card>

            {/* Estadísticas */}
            <Card title="Tu Progreso" size="small">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text>Guiones este mes</Text>
                  <Text strong>12</Text>
                </div>
                <Progress percent={75} strokeColor="#52c41a" size="small" />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text>Tiempo ahorrado</Text>
                  <Text strong>24h</Text>
                </div>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default GeneratorPage; 