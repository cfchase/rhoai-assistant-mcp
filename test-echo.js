import { spawn } from 'child_process';

// Start the MCP server
const server = spawn('node', ['build/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Handle server stderr (for console.error messages)
server.stderr.on('data', (data) => {
  console.log('Server:', data.toString().trim());
});

// Send initialization
const initRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'test-client',
      version: '1.0.0'
    }
  }
};

server.stdin.write(JSON.stringify(initRequest) + '\n');

// Wait a bit then list tools
setTimeout(() => {
  const listToolsRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {}
  };
  
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 100);

// Call echo tool
setTimeout(() => {
  const callToolRequest = {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'echo',
      arguments: {
        message: 'Hello from McpServer!'
      }
    }
  };
  
  server.stdin.write(JSON.stringify(callToolRequest) + '\n');
}, 200);

// Handle responses
server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    try {
      const response = JSON.parse(line);
      console.log('Response:', JSON.stringify(response, null, 2));
    } catch (e) {
      // Ignore parse errors
    }
  });
});

// Clean up after 1 second
setTimeout(() => {
  server.kill();
  process.exit(0);
}, 1000);