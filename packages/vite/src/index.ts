import { preserveDirectives } from "rollup-plugin-preserve-directives";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsconfigPaths from "vite-tsconfig-paths";

export type BuildConfigOptions = {
  outDir?: string;
  externalDeps?: Array<string | RegExp>;
  tsconfigPath?: string;
  srcDir: string;
  exclude?: Array<string>;
  entry: string | Array<string>;
};

export function buildConfig(options: BuildConfigOptions) {
  const outDir = options.outDir ?? "dist";

  return defineConfig({
    plugins: [
      externalizeDeps({ include: options.externalDeps ?? [] }),
      preserveDirectives() as any,
      tsconfigPaths({
        projects: options.tsconfigPath ? [options.tsconfigPath] : undefined,
      }),
      dts({
        outDir: outDir,
        entryRoot: options.srcDir,
        include: options.srcDir,
        exclude: options.exclude,
        tsconfigPath: options.tsconfigPath ?? "./tsconfig.json",
        compilerOptions: {
          module: 99, // ESNext
          declarationMap: true,
          tsBuildInfoFile: "tsconfig.build.tsbuildinfo",
          outDir: "dist",
          rootDir: "src",
          noEmit: false,
        },
        afterDiagnostic: (diagnostics) => {
          if (diagnostics.length > 0) {
            console.error("Please fix the above type errors");
            process.exit(1);
          }
        },
      }),
    ],

    build: {
      outDir,
      minify: false,
      sourcemap: true,
      lib: {
        entry: options.entry,
        formats: ["es"],
        fileName: () => "[name].js",
      },
      rollupOptions: {
        output: {
          preserveModules: true,
        },
      },
    },
  });
}
