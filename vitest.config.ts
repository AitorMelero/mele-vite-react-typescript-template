import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    // Example of relatives paths
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
        },
    },

    test: {
        environment: 'jsdom',
        globals: true,
        clearMocks: true,
        mockReset: true,
        restoreMocks: true,
        setupFiles: './vitest.setup.ts',

        coverage: {
            provider: 'v8',
            exclude: [
                '**/dist/**',
                '**/coverage/**',
                '**/node_modules/**',
                'src/**/index.ts',
                '**/main.tsx',
                '**/__mocks__/**',
                '**/.*.md',
            ],
            include: ['src/**'],
        },
    },
});
