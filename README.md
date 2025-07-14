# RHOAI Assistant MCP Server

An MCP (Model Context Protocol) server for Red Hat OpenShift AI (RHOAI) that enables LLMs to interact with RHOAI deployments for model management, monitoring, and operations.

## Overview

This MCP server provides a simplified, template-driven API for managing RHOAI resources. It exposes RHOAI capabilities through tools organized by RHOAI concepts rather than raw Kubernetes objects, making it easy for LLMs to deploy models, manage workbenches, and handle data science projects.

## Features

### 🚀 Model Serving
- **ModelCar Deployment** - Simplified model serving using KServe infrastructure
- **GPU Acceleration** - Support for NVIDIA GPU-accelerated model serving with vLLM
- **OpenAI Compatibility** - Chat completion endpoints compatible with OpenAI API
- **External Access** - Automatic route creation for external model access

### 📊 Data Science Projects
- **Project Management** - Create and manage RHOAI data science projects
- **Namespace Configuration** - Proper RHOAI labels and ModelMesh enablement
- **Resource Organization** - Organize resources by project boundaries

### 💻 Workbenches
- **Jupyter Environments** - Create GPU-enabled notebook workbenches
- **Resource Configuration** - Customizable CPU, memory, and GPU allocations
- **Image Selection** - Support for various notebook images and frameworks

### 🔗 Data Connections
- **S3 Integration** - Manage S3-compatible storage connections
- **Secret Management** - Secure credential storage for data sources
- **Model Storage** - Support for models stored in object storage

## Architecture

```
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐
│                     │    │                      │    │                     │
│   LLM Client        │◄──►│   RHOAI MCP Server   │◄──►│   OpenShift AI      │
│   (Claude, etc.)    │    │                      │    │   (Kubernetes API)  │
│                     │    │                      │    │                     │
└─────────────────────┘    └──────────────────────┘    └─────────────────────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │                      │
                            │   Template System    │
                            │   (YAML + Defaults)  │
                            │                      │
                            └──────────────────────┘
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Access to an OpenShift AI cluster
- Kubernetes configuration (kubeconfig) with appropriate permissions

### Installation

```bash
# Clone the repository
git clone https://github.com/cfchase/rhoai-assistant-mcp.git
cd rhoai-assistant-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Start the MCP server
npm run start
```

### Configuration

The server uses your default Kubernetes configuration. Ensure your `kubeconfig` is set up with access to your OpenShift AI cluster.

## Usage

### Available Tools

#### Data Science Projects
- `projects_list` - List all data science projects
- `projects_get` - Get project details
- `projects_create` - Create new data science project
- `projects_delete` - Delete data science project

#### Model Serving
- `models_deploy_modelcar` - Deploy model using ModelCar pattern
- `models_list` - List deployed models
- `models_get` - Get model details
- `models_delete` - Remove model deployment

#### Workbenches
- `workbenches_list` - List notebook workbenches
- `workbenches_create` - Create new workbench
- `workbenches_get` - Get workbench details
- `workbenches_delete` - Remove workbench

#### Data Connections
- `data_connections_list` - List data connections
- `data_connections_create` - Create S3 data connection
- `data_connections_get` - Get connection details

### Example: Deploy a Model

```typescript
// The MCP server handles the complexity of KServe InferenceService creation
await mcpClient.callTool('models_deploy_modelcar', {
  name: 'my-llm-model',
  modelUri: 's3://my-bucket/models/llama-2-7b',
  runtime: 'vllm-gpu',
  resources: {
    cpu: '4',
    memory: '16Gi',
    gpu: 1
  }
});
```

## Development

See [CLAUDE.md](./CLAUDE.md) for detailed development guidance.

```bash
# Development commands
npm run dev          # Build and start with watch
npm test            # Run tests
npm test:watch      # Watch tests
npm run clean       # Clean build artifacts
```

## Integration

### With Claude Code
This server is designed to work seamlessly with Claude Code. The CLAUDE.md file provides comprehensive guidance for AI assistants working on this codebase.

### With OpenShift AI
The server integrates with OpenShift AI through:
- **Kubernetes API** for resource management
- **KServe** for model serving infrastructure
- **OpenShift Routes** for external access
- **GPU Operator** for accelerated workloads

## Contributing

1. Create a feature branch from `main`
2. Implement your changes with tests
3. Commit frequently with descriptive messages
4. Ensure all tests pass
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0. See [LICENSE](./LICENSE) for details.