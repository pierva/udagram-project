import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './sequelize';

import {filterImageFromURL, deleteLocalFiles, validateExtension} from './util/util';
import validUrl from 'valid-url';
import { findEdges } from './util/child-process';

import { IndexRouter } from './controllers/v0/index.router';
import { V0MODELS } from './controllers/v0/model.index';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.use('/api/v0/', IndexRouter)

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /api/v0/filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
