//types
import { Request, Response } from 'express';

//service
import { NewsDeleteDTO } from '../../dto/news';
import { CustomError } from '../../exceptions/customError';
import { NewsService } from '../../services';

export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  create = async (req: Request, res: Response) => {
    try {
      const news = await this.newsService.create(req.body);
      return res.status(200).json(news);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  uploadFile = async (req: Request, res: Response) => {
    try {
      const file = req.file as Express.Multer.File;
      const uploadedFile = await this.newsService.uploadFile(file);
      return res.status(200).json({
        uploadedFile,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const news = await this.newsService.getAll(req.body);
      return res.status(200).json(news);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.newsService.delete(req.params as unknown as NewsDeleteDTO);
      return res.status(200).json();
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const news = await this.newsService.getOne(
        req.params as unknown as NewsDeleteDTO,
      );
      return res.status(200).json(news);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };

  edit = async (req: Request, res: Response) => {
    try {
      const news = await this.newsService.edit(req.body);
      return res.status(200).json(news);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
        return;
      }
      res.status(500).json({ msg: 'Internal Server' });
      return;
    }
  };
}
