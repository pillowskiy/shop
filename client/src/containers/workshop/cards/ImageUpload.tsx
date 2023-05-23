import type {FC, ChangeEvent} from 'react';
import {Card} from "@common/Card";
import Image from "next/image";
import {Badge} from "@ui/Badge";
import {FormInput} from "@components/FormInput";
import {cn} from "@lib/utils";

interface ImageUploadProps {
    setImages: (images: string[]) => void;
    images: string[];
}

export const ImageUpload: FC<ImageUploadProps> = ({setImages, images}) => {
    const onImagesUpload = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (!target.files?.length) return;
        const newImages = Array.from(target.files, (file => {
            return URL.createObjectURL(file);
        }));
        setImages(newImages);
    }

    return (
        <Card className="bg-popover shadow-md p-4 pb-8">
            <form className="text-center border rounded-lg bg-white h-4/6 pb-4">
                <h2 className="text-xl font-medium sm:mt-4">Upload an image</h2>
                <p>Recommended format 4:3</p>
                <div className="flex gap-2 justify-center mt-2 flex-shrink">
                    <Badge variant="secondary">🖼️ .jpg</Badge>
                    <Badge variant="secondary">🖼️ .png</Badge>
                    <Badge variant="secondary">🖼️ .svg</Badge>
                    <Badge variant="secondary">🖼️ .webp</Badge>
                </div>
                <FormInput
                    className="mt-4 max-w-[180px] md:max-w-[300px] mx-auto"
                    type="file"
                    id="fileElem"
                    multiple
                    accept="image/*"
                    onChange={onImagesUpload}
                />
            </form>
            <section className={cn(
                "flex flex-card gap-4 my-4 max-h-fit overflow-x-auto h-2/6", {
                    "border bg-white rounded-lg": !images.length
                }
            )}>
                {images.length ?
                    images.map(src => (
                        <Image
                            className="rounded-lg cursor-pointer border h-[64px]"
                            key={Math.random() * Date.now()}
                            src={src}
                            alt={"product image"}
                            width={256}
                            height={256}
                        />
                    )): (
                        <h2 className="m-auto font-medium">🙅 There are not images yet.</h2>
                    )
                }
            </section>
        </Card>
    );
};