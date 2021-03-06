import {Db} from 'mongodb';
import {ImageRepository} from '../repositories/image-repository';
import {IImage} from '../models/image';

export class ImageService implements IImageService {
    // TODO Use DI
    private readonly imageRepository: ImageRepository;

    public constructor(db: Db) {
        this.imageRepository = new ImageRepository(db, 'images');
    }

    public async getImage(imageId: string): Promise<IImage> {
        return await this.imageRepository.findByImageId(imageId);
    }

    public async getCoverImage(imageId: string): Promise<IImage> {
        return await this.imageRepository.findAllByTripId(imageId)
            .then((res) => {
                if(res.length > 0 ){
                    return res[0];
                }
                return undefined;
            });

    }

    public async getImages(tripId: string): Promise<IImage[]> {
        return await this.imageRepository.findAllByTripId(tripId);
    }

    public async uploadImage(tripId: string, image: IImage): Promise<string> {
        console.log("tripId" + tripId);
        image.tripId = tripId;
        // image.source = image.source.slice(image.source.indexOf(",") + 1 );

        const imageId: string = await this.imageRepository.create(image);

        return imageId;
    }

    public async deleteImage(imageId: string): Promise<boolean> {
        console.log(imageId);
        const isDeleted: boolean = await this.imageRepository.delete(imageId);

        return isDeleted;
    }
}

export interface IImageService {
    getImage(imageId: string): Promise<IImage>;

    getImages(tripId: string): Promise<IImage[]>;

    getCoverImage(tripId: string): Promise<IImage>;

    uploadImage(tripId: string, image: IImage): Promise<string>;

    deleteImage(imageId: string): Promise<boolean>;
}
