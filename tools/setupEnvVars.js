import globalEnv from '@build/setupEnv';

const envVars = globalEnv();

Object.keys(envVars).forEach(key => {
  global[key] = process.env[key];
});
