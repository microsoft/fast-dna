export default {
    /** Globs to analyze */
    globs: ['src/**/*.ts'],
    /** Globs to exclude */
    exclude: ['src/*.ts','src/__test__/*','src/di/*','src/**/*.md','src/**/*.spec.ts','src/**/index.ts'],
    /** Directory to output CEM to */
    outdir: 'dist',
    /** Run in dev mode, provides extra logging */
    dev: true,
    /** Enable special handling for fast */
    fast: true,
}
