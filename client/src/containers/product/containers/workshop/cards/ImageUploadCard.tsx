import type {FC, ChangeEvent} from 'react';
import {Card} from "@common/Card";
import Image from "next/image";
import {Badge} from "@ui/Badge";
import {FormInput} from "@components/FormInput";
import {cn} from "@lib/utils";

interface ImageUploadCardProps {
    setImages: (files: FileList) => void;
    images: string[];
}

export const ImageUploadCard: FC<ImageUploadCardProps> = ({setImages, images}) => {
    const onImagesUpload = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (!target.files?.length) return;
        setImages(target.files);
    }

    return (
        <Card className="bg-popover shadow-md p-4 pb-8">
            <form className="text-center border rounded-lg bg-white h-4/6 pb-4">
                <h2 className="text-xl font-medium sm:mt-4">Upload an image</h2>
                <p className="underline">Recommended format 4:3</p>
                <div className="flex gap-2 justify-center mt-2 flex-shrink">
                    <Badge variant="secondary">🖼️ .png</Badge>
                    <Badge variant="secondary">🖼️ .jpg</Badge>
                </div>
                <FormInput
                    className="mt-4 max-w-[180px] md:max-w-[300px] mx-auto cursor-pointer"
                    type="file"
                    id="fileElem"
                    multiple
                    accept="image/,.png,.jpg,.jpeg"
                    onChange={onImagesUpload}
                    disabled={images.length > 10}
                />
                {images.length > 10 && (
                    <p className="text-destructive">
                        We are sorry, but you have reached the maximum number of images
                    </p>
                )}
            </form>
            <section className={cn(
                "flex flex-card gap-4 my-4 max-h-fit overflow-x-auto h-2/6", {
                    "border bg-white rounded-lg": !images.length
                }
            )}>
                {images.length ?
                    images.map(src => (
                        <Image
                            className="rounded-lg cursor-pointer border h-[96px] w-auto"
                            key={Math.random() * Date.now()}
                            src={src}
                            alt={"product image"}
                            width={64}
                            height={64}
                        />
                    )): (
                        <h2 className="m-auto font-medium">🙅 There are not images yet.</h2>
                    )
                }
            </section>
        </Card>
    );
};