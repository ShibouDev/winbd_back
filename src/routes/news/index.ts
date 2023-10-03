//libs
import { Router } from 'express';

//controller
import { NewsController } from '../../controllers';

//DTO
import {
    NewsCreateDTO,
    NewsDeleteDTO,
    NewsEditDTO,
    NewsGetDTO,
    NewsGetOneDTO,
} from '../../dto/news';

//middlewares
import {
    authMiddleware,
    upload,
    validateBodyDTOMiddleware,
    validateQueryParamsDTO,
} from '../../middlewares';

export class NewsRoutes {
  path = '/api/news';
  router = Router();

  constructor(newsController: NewsController) {
    this.router.post(
      '/create',
      authMiddleware,
      validateBodyDTOMiddleware(NewsCreateDTO),
      newsController.create,
    );
    this.router.post(
      '/uploadFile',
      authMiddleware,
      upload.single('file'),
      newsController.uploadFile,
    );
    this.router.post(
      '/getAll',
      authMiddleware,
      validateBodyDTOMiddleware(NewsGetDTO),
      newsController.getAll,
    );
    this.router.post(
      '/edit',
      authMiddleware,
      validateBodyDTOMiddleware(NewsEditDTO),
      newsController.edit,
    );
    this.router.get(
      '/:id',
      authMiddleware,
      validateQueryParamsDTO(NewsGetOneDTO),
      newsController.getOne,
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      validateQueryParamsDTO(NewsDeleteDTO),
      newsController.delete,
    );
  }
}
