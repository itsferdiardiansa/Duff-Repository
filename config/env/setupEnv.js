const setupEnv = (prefix = 'MP2_') => {
  const envFiles = ['.env']
  let variables = {}

  for(const key in process.env) {
    if(key.startsWith(prefix) && variables[key] === undefined)
      variables[key] = (key === 'MP2_APP_PORT') ? process.env[key] : JSON.stringify(process.env[key])
  }

  return variables
}

module.exports = setupEnv