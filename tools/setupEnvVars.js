import globalEnv from '@build/setupEnv';

const envVars = globalEnv();

export default () => {
  Object.keys(envVars).forEach(key => {
    global[key] = process.env[key];
  });
};
