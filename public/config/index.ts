const envConfig = process.env;
let envName = '';
switch (process.env.NODE_ENV) {
    case 'development':
        envName = '开发';
        break;
    case 'production':
        envName = '生产';
        break;
    case 'test':
        envName = '测试';
        break;
}
export default { envConfig, envName };

