import loadRouteFiles from 'load-route-files';

export default () =>
  loadRouteFiles({
    directory: 'src/domains'
  })