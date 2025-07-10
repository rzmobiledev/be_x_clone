import getEnv from 'src/utils/commons/get.env';

export const Cloudinary = {
  PROVIDER: 'Cloudinary',
  CLOUD_NAME: getEnv('CLOUDINARY_CLOUD_NAME'),
  API_KEY: getEnv('CLOUDINARY_API_KEY'),
  API_SECRET: getEnv('CLOUDINARY_API_SECRET'),
};

export const CloudinaryFolder = {
  RECIPE_IMAGES: 'recipe_images',
  USER_AVATARS: 'user_avatars',
};
