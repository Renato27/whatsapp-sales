export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: '127.0.0.1:8000',
    get url(){
      return `${this.protocol}://${this.host}/api`
    }
  }
};
