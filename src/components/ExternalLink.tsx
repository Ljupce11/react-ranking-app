import { Link } from "@chakra-ui/react";
import { palette } from "@northlight/tokens";
import React, { type ReactNode } from "react";

type ExternalLinkProps = {
	href: string;
	children: ReactNode;
};

export const ExternalLink = ({ href, children }: ExternalLinkProps) => (
	<Link
		isExternal
		href={href}
		sx={{ color: palette.blue["500"], textDecoration: "underline" }}
	>
		{children}
	</Link>
);
