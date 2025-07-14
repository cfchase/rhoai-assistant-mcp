# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server for Red Hat OpenShift AI (RHOAI) that provides LLMs with tools to interact with RHOAI deployments for model management, monitoring, and operations.

## Architecture

The MCP server exposes RHOAI capabilities through a simple, template-driven API optimized for LLM interactions. It uses:
- **TypeScript** with `@modelcontextprotocol/sdk` for MCP server implementation
- **Kubernetes Client** (`@kubernetes/client-node`) for API interactions
- **Template System** with YAML templates and sane defaults
- **RHOAI-Centric Tools** organized by RHOAI concepts, not raw Kubernetes objects

## Key Components

### Tool Categories
- **Data Science Projects** - Create/manage OpenShift AI project namespaces
- **Model Serving** - Deploy models using ModelCars (simplified KServe approach)
- **Workbenches** - Create/manage Jupyter notebook environments
- **Data Connections** - Manage S3-compatible storage connections

### Core Dependencies
- `@modelcontextprotocol/sdk` - MCP server framework
- `@kubernetes/client-node` - Kubernetes API client
- `js-yaml` - YAML template processing
- `zod` - Input validation
- `jest` - Testing framework

## Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run the MCP server
npm run start

# Development build and run
npm run dev

# Run tests
npm test

# Watch tests
npm test:watch

# Clean build artifacts
npm run clean
```

## Development Approach

### Incremental Development
- Work in feature branches, commit after each tested feature
- Add tests as you go for each component
- Build one RHOAI concept at a time (projects → models → workbenches)

### Testing Strategy
- Unit tests for individual tools and components
- Integration tests with actual Kubernetes cluster
- Test with real RHOAI deployments when possible

### Template System
- YAML templates in `templates/` directory with placeholder substitution
- Sane defaults for common RHOAI configurations
- User customization of key fields (model URI, resources, runtime type)

## Important RHOAI Concepts

### ModelCar Approach
Uses a simplified model deployment pattern with:
- vLLM runtime for efficient GPU-accelerated serving
- OpenAI-compatible endpoints for chat completions
- External route creation for model access

### Data Science Projects
OpenShift namespaces with specific RHOAI labels:
- `opendatahub.io/dashboard: 'true'` - Marks as RHOAI project
- `modelmesh-enabled: 'true/false'` - Controls ModelMesh enablement

### Key Kubernetes Resources
- **InferenceService** - KServe model deployments
- **ServingRuntime** - Model serving runtime definitions
- **Notebook** - Workbench/Jupyter environments
- **Namespace** - Data science projects
- **Secret** - Data connections

## Integration Points

- **Kubernetes API** - Primary interface for RHOAI resource management
- **KServe** - Underlying model serving infrastructure
- **OpenShift Routes** - External model access
- **GPU Resources** - NVIDIA GPU operator integration
- **Red Hat Model Registry** - Granite model access


## Git Commit Guidelines

When creating commits in this repository:
- **DO NOT** include Claude Code attribution in commit messages
- **DO NOT** include Claude-specific references in commit messages
- **DO NOT** mention "Generated with Claude Code" or similar attributions
- **DO NOT** add Co-Authored-By references to Claude
- Focus commit messages on the technical changes made
- Use conventional commit format when appropriate (feat:, fix:, docs:, etc.)

## License

This project is licensed under the Apache License 2.0.