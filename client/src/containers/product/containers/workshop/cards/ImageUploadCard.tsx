import type {FC, ChangeEvent} from 'react';
import {Card} from "@common/Card";
import Image from "next/image";
import {Badge} from "@ui/Badge";
import {cn} from "@lib/utils";
import {Input} from "@ui/Input";
import {useContext} from "react";
import {WorkShopContext} from "@containers/product/containers/workshop";

interface ImageUploadCardProps {
    setImages: (files: FileList) => void;
    deleteImage: (src: string) => void;
    images: string[];
}

export const ImageUploadCard: FC<ImageUploadCardProps> = ({setImages, images, deleteImage}) => {
    const {errors} = useContext(WorkShopContext);

    const onImagesUpload = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (!target.files?.length) return;
        setImages(target.files);
    }

    return (
        <Card className="bg-popover shadow-md p-4 pb-8">
            <form className="text-center border rounded-lg bg-white h-4/6 py-4">
                <h2 className="text-xl font-medium">Upload an image</h2>
                <p className="underline hidden md:block">Recommended format 4:3</p>
                <div className="flex gap-2 justify-center mt-2 flex-shrink">
                    <Badge variant="secondary">🖼️ .png</Badge>
                    <Badge variant="secondary">🖼️ .jpg</Badge>
                </div>
                <Input
                    type="file"
                    className="mt-4 max-w-[180px] md:max-w-[300px] mx-auto cursor-pointer"
                    multiple
                    accept="image/,.png,.jpg,.jpeg,.webp"
                    onChange={onImagesUpload}
                    disabled={images.length > 10}
                />
                {images.length > 10 && (
                    <p className="text-destructive">
                        We are sorry, but you have reached the maximum number of images
                    </p>
                )}
                {errors.images && <p className="text-destructive">{errors.images}</p>}
            </form>
            <section className={cn(
                "flex flex-card gap-4 my-4 max-h-fit overflow-x-auto h-2/6", {
                    "border bg-white rounded-lg": !images.length
                }
            )}>
                {images.length ?
                    images.map(src => (
                        <Image
                            className="rounded-lg cursor-pointer border h-[96px] w-auto hover:border-destructive transition-all object-cover object-top"
                            key={Math.random() * Date.now()}
                            onClick={() => deleteImage(src)}
                            src={src}
                            alt={"product image"}
                            width={164}
                            height={164}
                        />
                    )): (
                        <h2 className="m-auto font-medium">🙅 There are not images yet.</h2>
                    )
                }
            </section>
        </Card>
    );
};