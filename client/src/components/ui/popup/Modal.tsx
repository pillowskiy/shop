import Layout from "./layout";
import { useMount } from "@/hooks/useMount";
import type { IModalLayoutParams } from "./types";
import type { FC, PropsWithChildren } from "react";

export const Modal: FC<PropsWithChildren<IModalLayoutParams>> = ({
  active,
  onClose,
  children,
}) => {
	const mounted = useMount(active);
	if (!mounted) return null;

	return (
		<Layout onClose={onClose} active={active}>
			{children}
		</Layout>
	);
};