module.exports = {
  // publicPath: "/textbook/",
  publicPath: process.env.NODE_ENV === 'production' ?
    '/user-crm-vue/' :
    '/'
  // используется для продакшена '/textbook/' имя репозитория
};
