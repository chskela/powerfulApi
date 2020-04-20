const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
require('dotenv').config();


const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return `<h1>My modern api</h1>`;
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (request, h) => {
        return Painting.find();
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (request, h) => {
        const { name, url, techniques } = request.payload;

        const painting = new Painting({
          name,
          url,
          techniques
        });

        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();


mongoose.connect(`mongodb+srv://chskela:${process.env.PASSWORD}@cluster0-gl1x3.mongodb.net/Paint`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

mongoose.connection.once('open', () => {
  console.log('connected to cluster');

});

