import { getCodeSandboxHost } from '@codesandbox/utils';

export const getApiUrl = () => {
  const codeSandboxHost = getCodeSandboxHost(3001);
  return codeSandboxHost
    ? `https://${codeSandboxHost}`
    : 'http://localhost:3001';
};

export const API_URL = getApiUrl();
