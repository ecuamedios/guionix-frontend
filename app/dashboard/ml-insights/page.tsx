"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  Progress,
  List,
  Space,
  Button,
  Select,
  Tag,
  Tabs,
  Modal,
  Form,
  Rate,
  Input,
  Alert,
  Divider
} from "antd";
import {
  RobotOutlined,
  TrophyOutlined,
  HeartOutlined,
  CommentOutlined,
  LineChartOutlined,
  ApiOutlined,
  StarOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  MessageOutlined,
  ExperimentOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import mlService from "@/lib/services/mlService";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const MLInsightsPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  
  // Estado para datos de ML
  const [mlInsights, setMlInsights] = useState<any>(null);
  const [scriptAnalyses, setScriptAnalyses] = useState<any[]>([]);
  const [successPredictions, setSuccessPredictions] = useState<any[]>([]);

  useEffect(() => {
    loadMLData();
  }, []);

  const loadMLData = async () => {
    try {
      setLoading(true);
      
      // Obtener insights generales
      const insights = await mlService.getMLInsights("demo-user");
      setMlInsights(insights);
      
      // Simular análisis de scripts recientes
      const mockAnalyses = [
        {
          id: "analysis-001",
          scriptTitle: "Digital Conspiracy",
          sentimentScore: 0.75,
          dialogueQuality: 0.82,
          characterDevelopment: 0.78,
          pacing: 0.85,
          createdAt: "2024-06-01"
        },
        {
          id: "analysis-002", 
          scriptTitle: "Romance en París",
          sentimentScore: 0.88,
          dialogueQuality: 0.91,
          characterDevelopment: 0.84,
          pacing: 0.77,
          createdAt: "2024-05-28"
        }
      ];
      setScriptAnalyses(mockAnalyses);
      
      // Simular predicciones de éxito
      const mockPredictions = [
        {
          scriptTitle: "Digital Conspiracy",
          commercialScore: 0.73,
          criticalScore: 0.81,
          recommendedBudget: { min: 2000000, max: 15000000 }
        },
        {
          scriptTitle: "Romance en París", 
          commercialScore: 0.85,
          criticalScore: 0.75,
          recommendedBudget: { min: 1000000, max: 8000000 }
        }
      ];
      setSuccessPredictions(mockPredictions);
      
    } catch (error) {
      console.error('Error loading ML data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "#52c41a";
    if (score >= 0.6) return "#faad14";
    return "#f5222d";
  };

  const handleFeedbackSubmit = async (values: any) => {
    try {
      if (!selectedAnalysis) return;
      
      await mlService.submitFeedback(selectedAnalysis, {
        accuracy: values.accuracy,
        usefulness: values.usefulness,
        comments: values.comments
      });
      setFeedbackModalVisible(false);
      setSelectedAnalysis(null);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <ApiOutlined style={{ color: "#722ed1" }} /> ML Insights
            </Title>
            <Text type="secondary">
              Análisis inteligente y predicciones para tus guiones
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<ExperimentOutlined />}>
                Nuevo Análisis
              </Button>
              <Button 
                type="primary" 
                icon={<MessageOutlined />}
                onClick={() => setFeedbackModalVisible(true)}
              >
                Enviar Feedback
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
              title="Análisis Realizados"
              value={mlInsights?.totalAnalyses || 0}
              prefix={<RobotOutlined />}
              suffix="guiones"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Score Promedio Comercial"
              value={(mlInsights?.averageScores?.commercial * 100) || 0}
              precision={1}
              suffix="%"
              prefix={<TrophyOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Score Promedio Crítico"
              value={(mlInsights?.averageScores?.critical * 100) || 0}
              precision={1}
              suffix="%"
              prefix={<StarOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Calidad de Diálogos"
              value={(mlInsights?.averageScores?.dialogue * 100) || 0}
              precision={1}
              suffix="%"
              prefix={<CommentOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Contenido Principal */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          
          {/* Resumen General */}
          <TabPane tab="Resumen" key="overview">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Géneros en Tendencia" size="small">
                  <List
                    dataSource={mlInsights?.trendingGenres || []}
                    renderItem={(genre: string, index: number) => (
                      <List.Item>
                        <Space>
                          <Tag color={['blue', 'green', 'orange'][index % 3]}>
                            #{index + 1}
                          </Tag>
                          <Text strong>{genre}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="Recomendaciones IA" size="small">
                  <List
                    dataSource={mlInsights?.recommendations || []}
                    renderItem={(recommendation: string) => (
                      <List.Item>
                        <Space>
                          <ThunderboltOutlined style={{ color: "#faad14" }} />
                          <Text>{recommendation}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Análisis de Scripts */}
          <TabPane tab="Análisis de Scripts" key="analysis">
            <List
              dataSource={scriptAnalyses}
              renderItem={(analysis: any) => (
                <List.Item>
                  <Card style={{ width: "100%" }} size="small">
                    <Row gutter={16} align="middle">
                      <Col span={6}>
                        <div>
                          <Text strong>{analysis.scriptTitle}</Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            {analysis.createdAt}
                          </Text>
                        </div>
                      </Col>
                      
                      <Col span={4}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Sentimiento</Text>
                          </div>
                          <Progress 
                            type="circle" 
                            size={60}
                            percent={Math.round(analysis.sentimentScore * 100)}
                            strokeColor={getScoreColor(analysis.sentimentScore)}
                          />
                        </div>
                      </Col>

                      <Col span={4}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Diálogos</Text>
                          </div>
                          <Progress 
                            type="circle" 
                            size={60}
                            percent={Math.round(analysis.dialogueQuality * 100)}
                            strokeColor={getScoreColor(analysis.dialogueQuality)}
                          />
                        </div>
                      </Col>

                      <Col span={4}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Personajes</Text>
                          </div>
                          <Progress 
                            type="circle" 
                            size={60}
                            percent={Math.round(analysis.characterDevelopment * 100)}
                            strokeColor={getScoreColor(analysis.characterDevelopment)}
                          />
                        </div>
                      </Col>

                      <Col span={4}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Ritmo</Text>
                          </div>
                          <Progress 
                            type="circle" 
                            size={60}
                            percent={Math.round(analysis.pacing * 100)}
                            strokeColor={getScoreColor(analysis.pacing)}
                          />
                        </div>
                      </Col>

                      <Col span={2}>
                        <Button 
                          size="small"
                          icon={<LineChartOutlined />}
                          onClick={() => {
                            setSelectedAnalysis(analysis.id);
                            setFeedbackModalVisible(true);
                          }}
                        >
                          Detalles
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>

          {/* Predicciones de Éxito */}
          <TabPane tab="Predicciones" key="predictions">
            <List
              dataSource={successPredictions}
              renderItem={(prediction: any) => (
                <List.Item>
                  <Card style={{ width: "100%" }}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Title level={4}>{prediction.scriptTitle}</Title>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div>
                            <Text type="secondary">Potencial Comercial</Text>
                            <Progress 
                              percent={Math.round(prediction.commercialScore * 100)}
                              strokeColor="#52c41a"
                            />
                          </div>
                          <div>
                            <Text type="secondary">Potencial Crítico</Text>
                            <Progress 
                              percent={Math.round(prediction.criticalScore * 100)}
                              strokeColor="#1890ff"
                            />
                          </div>
                        </Space>
                      </Col>

                      <Col span={8}>
                        <Card size="small" title="Presupuesto Recomendado">
                          <Statistic
                            title="Rango"
                            value={`$${(prediction.recommendedBudget.min / 1000000).toFixed(1)}M - $${(prediction.recommendedBudget.max / 1000000).toFixed(1)}M`}
                            prefix={<GlobalOutlined />}
                          />
                        </Card>
                      </Col>

                      <Col span={8}>
                        <Card size="small" title="Score Combinado">
                          <div style={{ textAlign: "center" }}>
                            <Progress 
                              type="dashboard"
                              percent={Math.round(((prediction.commercialScore + prediction.criticalScore) / 2) * 100)}
                              strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                              }}
                            />
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>

        </Tabs>
      </Card>

      {/* Modal de Feedback */}
      <Modal
        title="Feedback de Análisis ML"
        open={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          layout="vertical"
          onFinish={handleFeedbackSubmit}
        >
          <Alert
            message="Tu feedback nos ayuda a mejorar nuestros modelos de IA"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />

          <Form.Item label="¿Qué tan preciso fue el análisis?" name="accuracy">
            <Rate allowHalf count={5} />
          </Form.Item>

          <Form.Item label="¿Qué tan útil fue para tu trabajo?" name="usefulness">
            <Rate allowHalf count={5} />
          </Form.Item>

          <Form.Item label="Comentarios adicionales" name="comments">
            <Input.TextArea 
              rows={4}
              placeholder="Cuéntanos qué te pareció el análisis y cómo podemos mejorarlo..."
            />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setFeedbackModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Enviar Feedback
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MLInsightsPage; 