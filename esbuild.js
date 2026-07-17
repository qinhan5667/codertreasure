const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

function copyGameHtmlPlugin() {
	return {
		name: 'copy-game-html',
		setup(build) {
			build.onEnd(() => {
				const src = path.resolve('src/game.html');
				const snippetsPath = path.resolve('src/snippets.json');
				const outDir = path.dirname(build.initialOptions.outfile || 'dist/extension.js');
				const dest = path.join(path.resolve(outDir), 'game.html');
				if (fs.existsSync(src)) {
					fs.mkdirSync(path.dirname(dest), { recursive: true });
					let html = fs.readFileSync(src, 'utf8');
					if (fs.existsSync(snippetsPath)) {
						const snippets = fs.readFileSync(snippetsPath, 'utf8');
						html = html.replace(/__SNIPPETS_DATA__/g, snippets);
						console.log('[copy] injected snippets into game.html');
					} else {
						console.warn('[copy] src/snippets.json not found, placeholder left unsubstituted');
					}
					fs.writeFileSync(dest, html);
					console.log('[copy] game.html ->', dest);
				}
			});
		}
	};
}

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
	name: 'esbuild-problem-matcher',

	setup(build) {
		build.onStart(() => {
			console.log('[watch] build started');
		});
		build.onEnd((result) => {
			result.errors.forEach(({ text, location }) => {
				console.error(`✘ [ERROR] ${text}`);
				console.error(`    ${location.file}:${location.line}:${location.column}:`);
			});
			console.log('[watch] build finished');
		});
	},
};

async function main() {
	const ctx = await esbuild.context({
		entryPoints: [
			'src/extension.ts'
		],
		bundle: true,
		format: 'cjs',
		minify: production,
		sourcemap: !production,
		sourcesContent: false,
		platform: 'node',
		outfile: 'dist/extension.js',
		external: ['vscode'],
		logLevel: 'silent',
		plugins: [
			/* add to the end of plugins array */
			esbuildProblemMatcherPlugin,
			copyGameHtmlPlugin(),
		],
	});
	if (watch) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		await ctx.dispose();
	}
}

main().catch(e => {
	console.error(e);
	process.exit(1);
});
