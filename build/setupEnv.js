const setupEnv = (prefix = 'MP2_') => {
  const envFiles = ['.env']
  const arrayPattern = /[^{}]*(?=\})/g
  const env = Object.assign({}, process.env)
  let variables = {}, value

  for(const key in env) {
    if(key.startsWith(prefix) && variables[key] === undefined) {
      value = env[key] === 'true' ? true : env[key] === 'false' ? false : env[key]
      
      if(typeof value !== 'boolean')
        value = (key === 'MP2_APP_PORT') ? parseInt(env[key]) 
        : (env[key].match(arrayPattern)) ? JSON.parse(env[key])
        : `'${value}'`
      
      variables[key] = value
    }
  }
  
  return variables
}

module.exports = setupEnv