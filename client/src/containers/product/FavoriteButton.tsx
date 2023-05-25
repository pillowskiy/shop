import type {FC, HTMLAttributes} from 'react';
import {Toggle} from "@ui/Toggle";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {useProfile} from "@hooks/useProfile";
import {Heart} from "lucide-react";
import {cn} from "@lib/utils";

interface FavoriteButtonProps extends HTMLAttributes<HTMLButtonElement> {
    productId: number;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
    children,
    productId,
    className,
    ...props
}) => {
    const queryClient = useQueryClient();
    const {profile} = useProfile();
    const isFavorite = profile ? profile.favorites.some(product => product.id === productId) : false;

    const {mutate} = useMutation(['toggle favorite', productId], () => {
        return UserService.toggleFavorite(productId);
    }, {
        onSuccess: () => queryClient.invalidateQueries(['get profile']),
    });

    return (
        <Toggle className={className} {...props} pressed={false} onClick={() => mutate()} disabled={!profile}>
            <Heart className={cn("h-4 w-4 text-primary", {
                'fill-destructive text-destructive': isFavorite,
            })}/>
        </Toggle>
    );
};