import { Express } from 'express';

export class UploadToCloudinary {
  constructor(private readonly file: Express.Multer.File) {}

  base64Image() {
    if (!this.file || !this.file.mimetype || !this.file.buffer) {
      throw new Error('Invalid file object');
    }
    return `data:${this.file.mimetype};base64,${this.file.buffer.toString('base64')}`;
  }
}
