//types
import { Request, Response } from 'express';

//service
import { NewsService } from '../../services';

export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  create = async (req: Request, res: Response) => {
    const news = this.newsService.create(req.body);
  };
}
