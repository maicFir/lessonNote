const getOrigin = () => {
  const { origin, protocol, hostname, port } = window.location;
  if (!origin) {
    return `${protocol}//${hostname}${port ? ':' : ''}`;
  }
  return origin;
};
const locationOrigin = getOrigin();

export { locationOrigin };
