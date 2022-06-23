

export function watchEnv(env) {
  const num = Math.ceil(Math.random() * 10);
  if (num < 5) {
    env = 'development'
  }
  return env === 'production' ? '生产环境' : '测试开发环境'
}

