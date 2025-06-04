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
  Switch,
  Divider,
  Alert,
  Upload,
  Avatar,
  Slider,
  Radio,
  Tabs,
  List,
  Badge,
  notification,
  Modal,
  Tag,
  Statistic
} from "antd";
import {
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  SecurityScanOutlined,
  CreditCardOutlined,
  TeamOutlined,
  RobotOutlined,
  UploadOutlined,
  KeyOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  SaveOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async (values: any) => {
    setLoading(true);
    // Simular guardado
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: "Configuración Guardada",
        description: "Tus cambios han sido guardados exitosamente",
      });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    Modal.confirm({
      title: "¿Estás seguro de eliminar tu cuenta?",
      icon: <ExclamationCircleOutlined />,
      content: "Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        notification.success({
          message: "Cuenta programada para eliminación",
          description: "Tu cuenta será eliminada en 30 días. Puedes cancelar esta acción antes de ese tiempo.",
        });
      },
    });
  };

  const ProfileTab = () => (
    <Form form={form} layout="vertical" onFinish={handleSave}>
      <Card title="Información Personal" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={24} style={{ textAlign: "center", marginBottom: 24 }}>
            <Avatar size={100} icon={<UserOutlined />} />
            <div style={{ marginTop: 16 }}>
              <Upload>
                <Button icon={<UploadOutlined />}>Cambiar Foto</Button>
              </Upload>
            </div>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nombre" name="firstName" initialValue="María">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Apellido" name="lastName" initialValue="González">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email" initialValue="demo@guionix.com">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Teléfono" name="phone" initialValue="+34 666 777 888">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Biografía" name="bio">
          <TextArea 
            rows={4} 
            placeholder="Cuéntanos un poco sobre ti y tu trabajo..."
            defaultValue="Creadora de contenido especializada en guiones románticos y dramáticos."
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="País" name="country" initialValue="España">
              <Select>
                <Option value="España">España</Option>
                <Option value="México">México</Option>
                <Option value="Argentina">Argentina</Option>
                <Option value="Colombia">Colombia</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Zona Horaria" name="timezone" initialValue="Europe/Madrid">
              <Select>
                <Option value="Europe/Madrid">Madrid (GMT+1)</Option>
                <Option value="America/Mexico_City">Ciudad de México (GMT-6)</Option>
                <Option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</Option>
                <Option value="America/Bogota">Bogotá (GMT-5)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card title="Preferencias de Trabajo">
        <Form.Item label="Géneros Favoritos" name="favoriteGenres">
          <Select mode="multiple" placeholder="Selecciona tus géneros favoritos">
            <Option value="romance">Romance</Option>
            <Option value="comedy">Comedia</Option>
            <Option value="drama">Drama</Option>
            <Option value="thriller">Thriller</Option>
            <Option value="scifi">Ciencia Ficción</Option>
            <Option value="fantasy">Fantasía</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Plataformas Preferidas" name="preferredPlatforms">
          <Select mode="multiple" placeholder="¿Dónde publicas principalmente?">
            <Option value="youtube">YouTube</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="dramabox">DramaBox</Option>
          </Select>
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Duración Preferida de Videos" name="preferredDuration">
              <Slider
                range
                min={1}
                max={30}
                defaultValue={[3, 10]}
                marks={{
                  1: "1min",
                  10: "10min",
                  20: "20min",
                  30: "30min"
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Nivel de Experiencia" name="experienceLevel" initialValue="intermediate">
              <Radio.Group>
                <Radio.Button value="beginner">Principiante</Radio.Button>
                <Radio.Button value="intermediate">Intermedio</Radio.Button>
                <Radio.Button value="expert">Experto</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
            Guardar Cambios
          </Button>
        </div>
      </Card>
    </Form>
  );

  const NotificationsTab = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Notificaciones por Email">
        <List>
          <List.Item
            actions={[<Switch defaultChecked />]}
          >
            <List.Item.Meta
              title="Nuevos guiones generados"
              description="Recibir notificación cuando se complete la generación de un guión"
            />
          </List.Item>
          <List.Item
            actions={[<Switch defaultChecked />]}
          >
            <List.Item.Meta
              title="Videos procesados"
              description="Notificar cuando un video haya terminado de procesarse"
            />
          </List.Item>
          <List.Item
            actions={[<Switch />]}
          >
            <List.Item.Meta
              title="Nuevas funciones"
              description="Informar sobre nuevas características y actualizaciones"
            />
          </List.Item>
          <List.Item
            actions={[<Switch defaultChecked />]}
          >
            <List.Item.Meta
              title="Resumen semanal"
              description="Estadísticas y resumen de actividad semanal"
            />
          </List.Item>
        </List>
      </Card>

      <Card title="Notificaciones Push">
        <List>
          <List.Item
            actions={[<Switch defaultChecked />]}
          >
            <List.Item.Meta
              title="Generación completada"
              description="Notificación instantánea cuando termine un proceso"
            />
          </List.Item>
          <List.Item
            actions={[<Switch />]}
          >
            <List.Item.Meta
              title="Colaboraciones"
              description="Cuando alguien comparta un proyecto contigo"
            />
          </List.Item>
          <List.Item
            actions={[<Switch defaultChecked />]}
          >
            <List.Item.Meta
              title="Límites de uso"
              description="Avisar cuando estés cerca del límite mensual"
            />
          </List.Item>
        </List>
      </Card>

      <Card title="Frecuencia de Notificaciones">
        <Form layout="vertical">
          <Form.Item label="Resumen de actividad" name="summaryFrequency" initialValue="weekly">
            <Radio.Group>
              <Radio.Button value="daily">Diario</Radio.Button>
              <Radio.Button value="weekly">Semanal</Radio.Button>
              <Radio.Button value="monthly">Mensual</Radio.Button>
              <Radio.Button value="never">Nunca</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );

  const AISettingsTab = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Configuración de IA">
        <Form layout="vertical">
          <Form.Item label="Creatividad de la IA" name="creativity">
            <Slider
              min={0}
              max={100}
              defaultValue={70}
              marks={{
                0: "Conservador",
                50: "Balanceado",
                100: "Muy Creativo"
              }}
            />
            <Text type="secondary">
              Controla qué tan creativa y experimental quieres que sea la IA
            </Text>
          </Form.Item>

          <Form.Item label="Longitud de Descripciones" name="descriptionLength" initialValue="medium">
            <Radio.Group>
              <Radio.Button value="short">Cortas</Radio.Button>
              <Radio.Button value="medium">Medias</Radio.Button>
              <Radio.Button value="long">Detalladas</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Estilo de Diálogos" name="dialogueStyle" initialValue="natural">
            <Select>
              <Option value="formal">Formal</Option>
              <Option value="natural">Natural</Option>
              <Option value="casual">Casual</Option>
              <Option value="poetic">Poético</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Incluir por defecto" name="defaultIncludes">
            <Space direction="vertical">
              <Switch defaultChecked /> Descripciones de escena
              <Switch defaultChecked /> Indicaciones de dirección
              <Switch /> Notas de música/sonido
              <Switch /> Sugerencias de vestuario
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Plantillas Personalizadas">
        <Alert
          message="Próximamente"
          description="Pronto podrás crear y guardar tus propias plantillas de IA personalizadas"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Button disabled>Crear Plantilla Personalizada</Button>
      </Card>
    </Space>
  );

  const SecurityTab = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Cambiar Contraseña">
        <Form layout="vertical">
          <Form.Item label="Contraseña Actual" name="currentPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Nueva Contraseña" name="newPassword">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirmar Nueva Contraseña" name="confirmPassword">
            <Input.Password />
          </Form.Item>
          <Button type="primary" icon={<KeyOutlined />}>
            Actualizar Contraseña
          </Button>
        </Form>
      </Card>

      <Card title="Autenticación de Dos Factores">
        <div style={{ marginBottom: 16 }}>
          <Badge status="error" text="Desactivada" />
        </div>
        <Paragraph>
          Añade una capa extra de seguridad a tu cuenta activando la autenticación de dos factores.
        </Paragraph>
        <Button type="primary">Activar 2FA</Button>
      </Card>

      <Card title="Sesiones Activas">
        <List>
          <List.Item
            actions={[<Button danger size="small">Cerrar</Button>]}
          >
            <List.Item.Meta
              title="MacBook Pro - Chrome"
              description="Madrid, España • Sesión actual"
            />
          </List.Item>
          <List.Item
            actions={[<Button danger size="small">Cerrar</Button>]}
          >
            <List.Item.Meta
              title="iPhone - Safari"
              description="Madrid, España • Hace 2 horas"
            />
          </List.Item>
        </List>
      </Card>

      <Card title="Zona de Peligro" style={{ borderColor: "#ff4d4f" }}>
        <Alert
          message="Eliminar Cuenta"
          description="Una vez eliminada tu cuenta, no podrás recuperar tus datos. Esta acción es irreversible."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Button 
          danger 
          icon={<DeleteOutlined />}
          onClick={handleDeleteAccount}
        >
          Eliminar Cuenta
        </Button>
      </Card>
    </Space>
  );

  const BillingTab = () => (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Card title="Plan Actual">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Tag color="gold" style={{ fontSize: "16px", padding: "8px 16px" }}>
            Plan Pro
          </Tag>
          <Title level={3} style={{ margin: "16px 0" }}>€29.99/mes</Title>
          <Text type="secondary">Renovación automática el 15 de julio</Text>
        </div>
        
        <Divider />
        
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Guiones Generados este Mes" value="47" suffix="/ 100" />
          </Col>
          <Col span={12}>
            <Statistic title="Almacenamiento Usado" value="2.3" suffix="GB / 10 GB" />
          </Col>
        </Row>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Space>
            <Button>Cambiar Plan</Button>
            <Button>Ver Facturas</Button>
          </Space>
        </div>
      </Card>

      <Card title="Método de Pago">
        <List>
          <List.Item
            actions={[<Button>Editar</Button>]}
          >
            <List.Item.Meta
              avatar={<CreditCardOutlined style={{ fontSize: 24 }} />}
              title="**** **** **** 4242"
              description="Visa • Expira 12/26"
            />
          </List.Item>
        </List>
        <Button type="dashed" style={{ marginTop: 16 }}>
          Añadir Método de Pago
        </Button>
      </Card>

      <Card title="Historial de Facturación">
        <List>
          <List.Item
            actions={[<Button type="link">Descargar</Button>]}
          >
            <List.Item.Meta
              title="Plan Pro - Junio 2024"
              description="€29.99 • Pagado el 15 de junio"
            />
          </List.Item>
          <List.Item
            actions={[<Button type="link">Descargar</Button>]}
          >
            <List.Item.Meta
              title="Plan Pro - Mayo 2024"
              description="€29.99 • Pagado el 15 de mayo"
            />
          </List.Item>
        </List>
      </Card>
    </Space>
  );

  return (
    <div style={{ padding: "24px" }}>
      <Card style={{ marginBottom: "24px" }}>
        <Title level={2} style={{ margin: 0 }}>
          <SettingOutlined /> Configuración
        </Title>
        <Text type="secondary">
          Personaliza tu experiencia en GUIONIX
        </Text>
      </Card>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        tabPosition="left"
        style={{ minHeight: "600px" }}
      >
        <TabPane 
          tab={<span><UserOutlined />Perfil</span>} 
          key="profile"
        >
          <ProfileTab />
        </TabPane>
        
        <TabPane 
          tab={<span><BellOutlined />Notificaciones</span>} 
          key="notifications"
        >
          <NotificationsTab />
        </TabPane>
        
        <TabPane 
          tab={<span><RobotOutlined />IA y Generación</span>} 
          key="ai"
        >
          <AISettingsTab />
        </TabPane>
        
        <TabPane 
          tab={<span><SecurityScanOutlined />Seguridad</span>} 
          key="security"
        >
          <SecurityTab />
        </TabPane>
        
        <TabPane 
          tab={<span><CreditCardOutlined />Facturación</span>} 
          key="billing"
        >
          <BillingTab />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingsPage; 