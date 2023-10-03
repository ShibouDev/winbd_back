//DTO
import {
  NewsCreateDTO,
  NewsDeleteDTO,
  NewsEditDTO,
  NewsGetDTO,
  NewsGetOneDTO,
} from '../../dto/news';

//Model
import { NewsModel } from '../../models';

export class NewsService {
  constructor() {
    this.publishPostAfterTime()
  }

  create = async (dto: NewsCreateDTO) => {
    console.log('🚀 ~ file: index.ts:11 ~ NewsService ~ create= ~ dto:', dto);
    try {
      const newsModel = new NewsModel(dto);
      const news = await newsModel.save();
      return news;
    } catch (error) {
      console.log(error);
    }
  };

  uploadFile = async (dto: Express.Multer.File) => {
    const uploadedFile = dto.filename;
    return uploadedFile;
  };

  getAll = async (dto: NewsGetDTO) => {
    try {
      const news = await NewsModel.find(dto);
      return news;
    } catch (error) {
      console.log(error);
    }
  };

  getOne = async (dto: NewsGetOneDTO) => {
    try {
      const news = await NewsModel.findOne({
        _id: dto.id,
      });
      return news;
    } catch (error) {
      console.log(error);
    }
  };

  edit = async (dto: NewsEditDTO) => {
    try {
      const news = await NewsModel.findOneAndUpdate(
        {
          _id: dto._id,
          user: dto.user,
        },
        {
          rawText: dto.rawText,
        },
      );
      return news;
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (dto: NewsDeleteDTO) => {
    try {
      const news = await NewsModel.deleteOne({
        _id: dto.id,
      });
      return news;
    } catch (error) {
      console.log(error);
    }
  };

  publishPostAfterTime = () => {
    try {
      setInterval(async () => {
        const news = await NewsModel.updateMany(
          {
            publicTime: { $lt: new Date() },
          },
          {
            publish: true,
          },
        );
      }, 6000);
    } catch (error) {
      console.log(error);
    }
  };
}
