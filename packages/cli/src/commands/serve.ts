import { Command } from "commander";
import { Console } from "console";
import { serve } from "@jsnote-caioaanolasco/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
	.command("serve [filename]")
	.description("Open a file for editing")
	.option("-p, --port <number>", "port to run server on", "4005")
	.action(async (filename = "notebook.js", options: { port: string }) => {
		const dir = path.join(process.cwd(), path.dirname(filename));

		try {
			await serve(
				parseInt(options.port),
				path.basename(filename),
				dir,
				!isProduction
			);
			console.log(
				`Opened ${filename}. Go to http://localhost:${options.port} to edit it.`
			);
		} catch (err: any) {
			if (err.code === "EADDRINUSE") {
				console.log("Port is in use, use a different port");
			} else {
				console.log("Here's the error ", err.message);
			}
			process.exit(1);
		}
	});
