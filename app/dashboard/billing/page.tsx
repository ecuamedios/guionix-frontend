"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Tag,
  Progress,
  List,
  Space,
  Divider,
  Table,
  Modal,
  Alert,
  Statistic,
  Badge,
  Switch
} from "antd";
import {
  DollarOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UpOutlined,
  DownloadOutlined,
  CalendarOutlined,
  StarOutlined,
  CrownOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  SafetyOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const BillingPage = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);

  // Datos de la suscripción actual
  const currentPlan = {
    name: "Professional",
    price: 49,
    currency: "USD",
    period: "mes",
    nextBilling: "2024-07-15",
    status: "active",
    usage: {
      scripts: { used: 127, limit: 500 },
      videos: { used: 45, limit: 100 },
      storage: { used: 12.5, limit: 50 }, // GB
      teamMembers: { used: 3, limit: 10 }
    }
  };

  // Planes disponibles
  const plans = [
    {
      id: "free",
      name: "Gratuito",
      price: 0,
      period: "mes",
      popular: false,
      features: [
        "5 guiones por mes",
        "2 videos por mes", 
        "1 GB de almacenamiento",
        "1 usuario",
        "Soporte por email"
      ],
      limits: {
        scripts: 5,
        videos: 2,
        storage: 1,
        teamMembers: 1
      }
    },
    {
      id: "professional",
      name: "Professional",
      price: 49,
      period: "mes",
      popular: true,
      features: [
        "500 guiones por mes",
        "100 videos por mes",
        "50 GB de almacenamiento",
        "Hasta 10 usuarios",
        "Soporte prioritario",
        "Plantillas premium",
        "Análisis avanzados"
      ],
      limits: {
        scripts: 500,
        videos: 100,
        storage: 50,
        teamMembers: 10
      }
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 149,
      period: "mes",
      popular: false,
      features: [
        "Guiones ilimitados",
        "Videos ilimitados",
        "500 GB de almacenamiento",
        "Usuarios ilimitados",
        "Soporte 24/7",
        "API personalizada",
        "Integraciones avanzadas",
        "Onboarding dedicado"
      ],
      limits: {
        scripts: "unlimited",
        videos: "unlimited", 
        storage: 500,
        teamMembers: "unlimited"
      }
    }
  ];

  // Historial de facturación
  const billingHistory = [
    {
      id: 1,
      date: "2024-06-15",
      description: "Plan Professional - Junio 2024",
      amount: 49,
      status: "paid",
      invoice: "INV-2024-06-001"
    },
    {
      id: 2,
      date: "2024-05-15", 
      description: "Plan Professional - Mayo 2024",
      amount: 49,
      status: "paid",
      invoice: "INV-2024-05-001"
    },
    {
      id: 3,
      date: "2024-04-15",
      description: "Plan Professional - Abril 2024", 
      amount: 49,
      status: "paid",
      invoice: "INV-2024-04-001"
    }
  ];

  const getUsagePercentage = (used: number, limit: number | string) => {
    if (limit === "unlimited") return 0;
    return Math.round((used / (limit as number)) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return "#52c41a";
    if (percentage < 80) return "#faad14"; 
    return "#f5222d";
  };

  const billingColumns = [
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Descripción",
      dataIndex: "description", 
      key: "description",
    },
    {
      title: "Monto",
      key: "amount",
      render: (record: any) => (
        <Text strong>${record.amount} USD</Text>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status", 
      render: (status: string) => (
        <Tag 
          color={status === "paid" ? "green" : "orange"}
          icon={status === "paid" ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {status === "paid" ? "Pagado" : "Pendiente"}
        </Tag>
      ),
    },
    {
      title: "Factura",
      key: "actions",
      render: (record: any) => (
        <Button size="small" icon={<DownloadOutlined />}>
          Descargar
        </Button>
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
              <DollarOutlined /> Facturación y Suscripción
            </Title>
            <Text type="secondary">
              Gestiona tu plan, facturación y uso de recursos
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<CreditCardOutlined />}>
                Actualizar Tarjeta
              </Button>
              <Button 
                type="primary" 
                icon={<UpOutlined />}
                onClick={() => setUpgradeModalVisible(true)}
              >
                Cambiar Plan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={24}>
        {/* Panel Izquierdo - Plan Actual y Uso */}
        <Col span={16}>
          {/* Plan Actual */}
          <Card title="Plan Actual" style={{ marginBottom: "24px" }}>
            <Row gutter={16} align="middle">
              <Col span={16}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Badge.Ribbon 
                    text="Activo" 
                    color="green"
                  >
                    <Card size="small" style={{ width: 200 }}>
                      <div style={{ textAlign: "center" }}>
                        <RocketOutlined style={{ fontSize: 32, color: "#1890ff", marginBottom: 8 }} />
                        <div style={{ fontWeight: 600, fontSize: 18 }}>{currentPlan.name}</div>
                        <div style={{ color: "#666" }}>
                          ${currentPlan.price}/{currentPlan.period}
                        </div>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <CalendarOutlined style={{ marginRight: 8 }} />
                      Próxima facturación: <Text strong>{currentPlan.nextBilling}</Text>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Switch 
                        checked={autoRenewal}
                        onChange={setAutoRenewal}
                        size="small"
                      />
                      <Text style={{ marginLeft: 8 }}>Renovación automática</Text>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <Statistic
                  title="Gasto Mensual"
                  value={currentPlan.price}
                  prefix={<DollarOutlined />}
                  suffix="USD"
                />
              </Col>
            </Row>
          </Card>

          {/* Uso de Recursos */}
          <Card title="Uso de Recursos" style={{ marginBottom: "24px" }}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Guiones Generados</Text>
                    <Text strong>
                      {currentPlan.usage.scripts.used} / {currentPlan.usage.scripts.limit}
                    </Text>
                  </div>
                  <Progress 
                    percent={getUsagePercentage(currentPlan.usage.scripts.used, currentPlan.usage.scripts.limit)}
                    strokeColor={getUsageColor(getUsagePercentage(currentPlan.usage.scripts.used, currentPlan.usage.scripts.limit))}
                  />
                </div>
                
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Videos Exportados</Text>
                    <Text strong>
                      {currentPlan.usage.videos.used} / {currentPlan.usage.videos.limit}
                    </Text>
                  </div>
                  <Progress 
                    percent={getUsagePercentage(currentPlan.usage.videos.used, currentPlan.usage.videos.limit)}
                    strokeColor={getUsageColor(getUsagePercentage(currentPlan.usage.videos.used, currentPlan.usage.videos.limit))}
                  />
                </div>
              </Col>
              
              <Col span={12}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Almacenamiento</Text>
                    <Text strong>
                      {currentPlan.usage.storage.used} GB / {currentPlan.usage.storage.limit} GB
                    </Text>
                  </div>
                  <Progress 
                    percent={getUsagePercentage(currentPlan.usage.storage.used, currentPlan.usage.storage.limit)}
                    strokeColor={getUsageColor(getUsagePercentage(currentPlan.usage.storage.used, currentPlan.usage.storage.limit))}
                  />
                </div>
                
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <Text>Miembros del Equipo</Text>
                    <Text strong>
                      {currentPlan.usage.teamMembers.used} / {currentPlan.usage.teamMembers.limit}
                    </Text>
                  </div>
                  <Progress 
                    percent={getUsagePercentage(currentPlan.usage.teamMembers.used, currentPlan.usage.teamMembers.limit)}
                    strokeColor={getUsageColor(getUsagePercentage(currentPlan.usage.teamMembers.used, currentPlan.usage.teamMembers.limit))}
                  />
                </div>
              </Col>
            </Row>
          </Card>

          {/* Historial de Facturación */}
          <Card title="Historial de Facturación">
            <Table
              dataSource={billingHistory}
              columns={billingColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Panel Derecho - Planes y Alertas */}
        <Col span={8}>
          {/* Alertas */}
          {getUsagePercentage(currentPlan.usage.scripts.used, currentPlan.usage.scripts.limit) > 80 && (
            <Alert
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
              message="Límite casi alcanzado"
              description="Has usado más del 80% de tus guiones mensuales. Considera actualizar tu plan."
              action={
                <Button size="small" type="primary">
                  Actualizar
                </Button>
              }
            />
          )}

          {/* Método de Pago */}
          <Card title="Método de Pago" style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <CreditCardOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              <div>
                <div style={{ fontWeight: 500 }}>•••• •••• •••• 4532</div>
                <Text type="secondary">Expires 12/26</Text>
              </div>
            </div>
            <Button size="small" block>
              Actualizar Tarjeta
            </Button>
          </Card>

          {/* Próximas Funciones */}
          <Card title="Próximas Funciones" size="small">
            <List
              size="small"
              dataSource={[
                { title: "IA de Voz Mejorada", status: "coming" },
                { title: "Editor Visual", status: "coming" },
                { title: "Colaboración en Tiempo Real", status: "beta" },
                { title: "Exportación 4K", status: "coming" }
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <ThunderboltOutlined style={{ color: "#faad14" }} />
                    <Text>{item.title}</Text>
                    <Tag color={item.status === "beta" ? "blue" : "orange"}>
                      {item.status === "beta" ? "Beta" : "Próximamente"}
                    </Tag>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal de Planes */}
      <Modal
        title="Cambiar Plan de Suscripción"
        open={upgradeModalVisible}
        onCancel={() => setUpgradeModalVisible(false)}
        footer={null}
        width={1000}
      >
        <Row gutter={16}>
          {plans.map((plan) => (
            <Col span={8} key={plan.id}>
              <Card
                className={plan.popular ? "popular-plan" : ""}
                style={{ 
                  height: "100%",
                  border: plan.popular ? "2px solid #1890ff" : undefined
                }}
              >
                {plan.popular && (
                  <Badge.Ribbon text="Más Popular" color="blue">
                    <div />
                  </Badge.Ribbon>
                )}
                
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  {plan.id === "free" && <SafetyOutlined style={{ fontSize: 32, color: "#52c41a" }} />}
                  {plan.id === "professional" && <RocketOutlined style={{ fontSize: 32, color: "#1890ff" }} />}
                  {plan.id === "enterprise" && <CrownOutlined style={{ fontSize: 32, color: "#722ed1" }} />}
                  
                  <Title level={4} style={{ margin: "8px 0" }}>{plan.name}</Title>
                  <div style={{ fontSize: 32, fontWeight: 600, color: "#1890ff" }}>
                    ${plan.price}
                    <Text style={{ fontSize: 14, color: "#666" }}>/{plan.period}</Text>
                  </div>
                </div>

                <List
                  size="small"
                  dataSource={plan.features}
                  renderItem={(feature) => (
                    <List.Item>
                      <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                      {feature}
                    </List.Item>
                  )}
                  style={{ marginBottom: 24 }}
                />

                <Button 
                  type={plan.id === "professional" ? "default" : "primary"}
                  block
                  disabled={plan.id === "professional"}
                >
                  {plan.id === "professional" ? "Plan Actual" : "Seleccionar Plan"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

export default BillingPage; 