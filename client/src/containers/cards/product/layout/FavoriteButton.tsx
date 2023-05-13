import type {FC, HTMLAttributes} from 'react';
import {Toggle} from "@ui/Toggle";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import UserService from "@api/services/user.service";
import {useProfile} from "@hooks/useProfile";
import {ReactComponent as Heart} from "@assets/images/heart.svg";
import {ReactComponent as FilledHeart} from "@assets/images/heart_filled.svg";

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
            {isFavorite ?
                <FilledHeart className="h-4 w-4 fill-destructive"/> :
                <Heart className="h-4 w-4 fill-primary"/>}
        </Toggle>
    );
};