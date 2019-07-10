import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, validateExtension} from './util/util';
import validUrl from 'valid-url';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  app.get("/filteredimage/", async (req, res) => {
    try {
      let { image_url } = req.query;
      // Check if the user has entered any query parameter
      if (!image_url) {
        return res.status(400)
          .send({error: 'Please specify image_url as query parameter'});
      }

      // If we have a query parameter, check if it is a valid url
      if(!validUrl.isUri(image_url)){
        return res.status(400).send({error: 'Please enter a valid url'});
      }

      // Check if the file is an image
      if (!validateExtension(image_url)) {
        return res.status(415).send({error: 'Invalid media type'});
      }

      // Process the image
      const imgPath = await filterImageFromURL(image_url);
      if(imgPath) {
        await res.status(200).sendFile(imgPath);
      } else {
        res.status(500).send({error: 'Unable to process your request'});
      }

    } catch (e) {
      console.log(e)
      res.status(500).send({error: 'Unable to process your request'})
    }
  });
  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
