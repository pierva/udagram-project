import { Router, Request, Response } from 'express';
import { requireAuth } from '../../users/routes/auth.router';

const router: Router = Router();


// endpoint to get the image, process it and return the filtered image
router.get("/filteredimage/", async (req: Request, res: Response) => {
  try {
    let { image_url } = req.query;
    let { lower } = req.query;
    let { upper } = req.query;

    // Check if the user has entered any image query parameter
    if (!image_url) {
      return res.status(422)
        .send({error: 'Please specify image_url as query parameter'});
    }

    // If we have a query parameter, check if it is a valid url
    if(!validUrl.isUri(image_url)){
      return res.status(415).send({error: 'Please enter a valid url'});
    }

    // Process the image
    let imgPath = await filterImageFromURL(image_url);
    if(imgPath) {
      const newPath = await findEdges(imgPath, lower, upper);
      res.on('finish', () => deleteLocalFiles([imgPath, newPath.trim()]));
      return res.status(200).sendFile(newPath.trim());
    } else {
      return res.status(500).send({error: 'Unable to elaborate your image'});
    }
  } catch {
    return res.status(500).send({error: 'Unable to process your request'})
  }
});

export const FilterRouter: Router = router;
