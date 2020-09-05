const config=  require('./config')
const app = require('./server')
app.listen(config.PORT, config.HOST, () => {
    console.log(`Listing on port ${config.PORT}`);
});
