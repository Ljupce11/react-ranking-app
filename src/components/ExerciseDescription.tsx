import { Box, H2, P, VStack } from "@northlight/ui";
import React from "react";

import { ExternalLink } from "./ExternalLink";

export const ExerciseDescription = () => {
	return (
		<VStack align="left" marginBottom={5}>
			<Box>
				<H2>Initial site</H2>
				<P>
					Drop the excel file scores.xlsx that you will find in this repo in the
					area to the left and watch the log output in the console. We hope this
					is enough to get you started with the import.
				</P>
			</Box>
			<Box>
				<H2>Styling and Northlight</H2>
				<P>
					Styling is optional for this task and not a requirement. The styling
					for this app is using our own library Northligth which in turn is
					based on Chakra UI. You <i>may</i> use it to give some style to the
					application but again, it is entierly optional.
				</P>
				<P>
					Checkout{" "}
					<ExternalLink href="https://chakra-ui.com/">Chackra UI</ExternalLink>{" "}
					for layout components such as{" "}
					<ExternalLink href="https://chakra-ui.com/docs/components/box">
						Box
					</ExternalLink>
					,{" "}
					<ExternalLink href="https://chakra-ui.com/docs/components/stack">
						Stack
					</ExternalLink>
					,{" "}
					<ExternalLink href="https://chakra-ui.com/docs/components/grid">
						Grid
					</ExternalLink>
					,{" "}
					<ExternalLink href="https://chakra-ui.com/docs/components/flex">
						Flex
					</ExternalLink>{" "}
					and others.
				</P>
				<P>
					Checkout{" "}
					<ExternalLink href="https://northlight.dev/">Northlight</ExternalLink>{" "}
					for some of our components.
				</P>
			</Box>
		</VStack>
	);
};
