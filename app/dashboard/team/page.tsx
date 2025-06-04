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
  Switch,
  Divider,
  message,
  Badge,
  Tooltip
} from "antd";
import {
  TeamOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SettingOutlined,
  EyeOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const mockTeamMembers = [
  {
    id: 1,
    name: "María González",
    email: "maria@guionix.com",
    role: "Admin",
    department: "Dirección",
    status: "active",
    lastLogin: "Hace 2 horas",
    joinDate: "2024-01-15",
    avatar: "/avatars/maria.jpg",
    permissions: ["read", "write", "admin"],
    projects: 15,
    scriptsCreated: 45
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos@guionix.com",
    role: "Editor",
    department: "Contenido",
    status: "active",
    lastLogin: "Hace 5 horas",
    joinDate: "2024-02-01",
    avatar: "/avatars/carlos.jpg",
    permissions: ["read", "write"],
    projects: 8,
    scriptsCreated: 23
  },
  {
    id: 3,
    name: "Ana López",
    email: "ana@guionix.com",
    role: "Writer",
    department: "Creativo",
    status: "active",
    lastLogin: "Hace 1 día",
    joinDate: "2024-03-10",
    avatar: "/avatars/ana.jpg",
    permissions: ["read", "write"],
    projects: 12,
    scriptsCreated: 67
  },
  {
    id: 4,
    name: "Luis Moreno",
    email: "luis@guionix.com",
    role: "Viewer",
    department: "Marketing",
    status: "inactive",
    lastLogin: "Hace 1 semana",
    joinDate: "2024-04-05",
    avatar: "/avatars/luis.jpg",
    permissions: ["read"],
    projects: 3,
    scriptsCreated: 5
  }
];

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const getRoleColor = (role: string) => {
    const colors = {
      "Admin": "red",
      "Editor": "blue",
      "Writer": "green",
      "Viewer": "default"
    };
    return colors[role as keyof typeof colors] || "default";
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "green" : "default";
  };

  const getRoleIcon = (role: string) => {
    const icons = {
      "Admin": <CrownOutlined />,
      "Editor": <EditOutlined />,
      "Writer": <UserOutlined />,
      "Viewer": <EyeOutlined />
    };
    return icons[role as keyof typeof icons] || <UserOutlined />;
  };

  const handleAction = (action: string, member: any) => {
    switch (action) {
      case "edit":
        setSelectedMember(member);
        setEditModalVisible(true);
        break;
      case "delete":
        Modal.confirm({
          title: "¿Estás seguro?",
          content: `¿Deseas eliminar a "${member.name}" del equipo?`,
          onOk: () => message.success("Miembro eliminado del equipo"),
        });
        break;
      case "toggle_status":
        const newStatus = member.status === "active" ? "inactive" : "active";
        message.success(`Estado cambiado a ${newStatus === "active" ? "activo" : "inactivo"}`);
        break;
    }
  };

  const columns = [
    {
      title: "Miembro",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space>
          <Badge dot={record.status === "active"} color={getStatusColor(record.status)}>
            <Avatar 
              src={record.avatar}
              icon={<UserOutlined />}
              size={40}
            />
          </Badge>
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              <MailOutlined /> {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Rol y Departamento",
      key: "role_dept",
      render: (record: any) => (
        <div>
          <div style={{ marginBottom: 4 }}>
            <Tag color={getRoleColor(record.role)} icon={getRoleIcon(record.role)}>
              {record.role}
            </Tag>
          </div>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            {record.department}
          </Text>
        </div>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <div>
          <Tag 
            color={getStatusColor(status)}
            icon={status === "active" ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          >
            {status === "active" ? "Activo" : "Inactivo"}
          </Tag>
          <div style={{ fontSize: "12px", color: "#666", marginTop: 2 }}>
            Último acceso: {record.lastLogin}
          </div>
        </div>
      ),
    },
    {
      title: "Estadísticas",
      key: "stats",
      render: (record: any) => (
        <div>
          <div style={{ fontSize: "12px", marginBottom: 2 }}>
            <strong>{record.projects}</strong> proyectos
          </div>
          <div style={{ fontSize: "12px" }}>
            <strong>{record.scriptsCreated}</strong> guiones
          </div>
        </div>
      ),
    },
    {
      title: "Miembro desde",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (date: string) => (
        <Text type="secondary">{date}</Text>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Tooltip title="Editar miembro">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleAction("edit", record)}
            />
          </Tooltip>
          <Tooltip title={record.status === "active" ? "Desactivar" : "Activar"}>
            <Switch
              size="small"
              checked={record.status === "active"}
              onChange={() => handleAction("toggle_status", record)}
            />
          </Tooltip>
          <Tooltip title="Eliminar miembro">
            <Button 
              size="small" 
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleAction("delete", record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Filtrar datos
  const filteredData = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  // Calcular estadísticas
  const stats = {
    total: mockTeamMembers.length,
    active: mockTeamMembers.filter(m => m.status === "active").length,
    admins: mockTeamMembers.filter(m => m.role === "Admin").length,
    editors: mockTeamMembers.filter(m => m.role === "Editor").length
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <Card style={{ marginBottom: "24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              <TeamOutlined /> Gestión de Equipo
            </Title>
            <Text type="secondary">
              Administra los miembros de tu equipo y sus permisos
            </Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<SettingOutlined />}>Configurar Roles</Button>
              <Button 
                type="primary" 
                icon={<UserAddOutlined />}
                onClick={() => setInviteModalVisible(true)}
              >
                Invitar Miembro
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
              title="Total Miembros"
              value={stats.total}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Miembros Activos"
              value={stats.active}
              prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Administradores"
              value={stats.admins}
              prefix={<CrownOutlined style={{ color: "#f5222d" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Editores"
              value={stats.editors}
              prefix={<EditOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card style={{ marginBottom: "24px" }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Search
              placeholder="Buscar por nombre o email..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col>
            <Select
              placeholder="Rol"
              size="large"
              style={{ width: 120 }}
              value={roleFilter}
              onChange={setRoleFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="Admin">Admin</Option>
              <Option value="Editor">Editor</Option>
              <Option value="Writer">Writer</Option>
              <Option value="Viewer">Viewer</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Departamento"
              size="large"
              style={{ width: 140 }}
              value={departmentFilter}
              onChange={setDepartmentFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="Dirección">Dirección</Option>
              <Option value="Contenido">Contenido</Option>
              <Option value="Creativo">Creativo</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Col>
          <Col>
            <Select
              placeholder="Estado"
              size="large"
              style={{ width: 120 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">Todos</Option>
              <Option value="active">Activos</Option>
              <Option value="inactive">Inactivos</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Tabla de Miembros */}
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
              `${range[0]}-${range[1]} de ${total} miembros`,
          }}
        />
      </Card>

      {/* Modal de Invitación */}
      <Modal
        title="Invitar Nuevo Miembro"
        open={inviteModalVisible}
        onCancel={() => setInviteModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Email" required>
            <Input placeholder="nombre@empresa.com" />
          </Form.Item>
          
          <Form.Item label="Nombre Completo" required>
            <Input placeholder="Ej: María González" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Rol">
                <Select>
                  <Option value="viewer">Viewer</Option>
                  <Option value="writer">Writer</Option>
                  <Option value="editor">Editor</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Departamento">
                <Select>
                  <Option value="creativo">Creativo</Option>
                  <Option value="contenido">Contenido</Option>
                  <Option value="marketing">Marketing</Option>
                  <Option value="direccion">Dirección</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mensaje de Invitación">
            <Input.TextArea 
              rows={3}
              placeholder="¡Únete a nuestro equipo de GUIONIX! Te invitamos a colaborar en la creación de contenido..."
            />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setInviteModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary">
                Enviar Invitación
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Modal de Edición */}
      <Modal
        title="Editar Miembro"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedMember && (
          <Form layout="vertical" initialValues={selectedMember}>
            <Form.Item label="Nombre" name="name">
              <Input />
            </Form.Item>
            
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Rol" name="role">
                  <Select>
                    <Option value="Viewer">Viewer</Option>
                    <Option value="Writer">Writer</Option>
                    <Option value="Editor">Editor</Option>
                    <Option value="Admin">Admin</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Departamento" name="department">
                  <Select>
                    <Option value="Creativo">Creativo</Option>
                    <Option value="Contenido">Contenido</Option>
                    <Option value="Marketing">Marketing</Option>
                    <Option value="Dirección">Dirección</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => setEditModalVisible(false)}>
                  Cancelar
                </Button>
                <Button type="primary">
                  Guardar Cambios
                </Button>
              </Space>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TeamPage; 