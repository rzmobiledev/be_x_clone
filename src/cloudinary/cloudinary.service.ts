import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import getEnv from 'src/utils/commons/get.env';

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
      api_key: getEnv('CLOUDINARY_API_KEY'),
      api_secret: getEnv('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      void v2.uploader.upload(
        file.path,
        { folder: 'posts', overwrite: true },
        (error, result) => {
          if (error) reject(new Error('Failed to upload'));
          resolve(result!);
        },
      );
    });
  }
}
