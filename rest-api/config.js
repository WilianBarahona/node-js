'use strict'
module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || `mongodb://localhost:27017/shop`,
    SECRET_TOKEN: 'secrettoken' // se suelen colocar cadenas hash, o cadenas mas largas
  
}