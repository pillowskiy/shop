import type {FC, HTMLAttributes} from 'react';
import {Heart} from 'lucide-react';
import {Toggle} from "@ui/Toggle";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {useProfile} from "@hooks/useProfile";
import {useToast} from "@common/toast/useToast";
import {isAxiosError} from "axios";
import {useRouter} from "next/router";

interface FavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
    productId: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
    children,
    productId,
    className,
    ...props
}) => {
    const {invalidateQueries} = useQueryClient();
    const {profile} = useProfile();
    const isFavorite = profile ? profile.favorites.some(product => product.id === productId) : false;

    const {mutate} = useMutation(['toggle favorite', productId], () => {
        return UserService.toggleFavorite(productId);
    }, {
        onSuccess: () => invalidateQueries(['get profile']),
    });

    return (
        <Toggle className={className} {...props} pressed={isFavorite} onClick={() => mutate()} disabled={!profile}>
            <Heart className="h-4 w-4" />
        </Toggle>
    );
};