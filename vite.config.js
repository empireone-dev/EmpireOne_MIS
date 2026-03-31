import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 99999999999,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/js/app/pages/admin/recruitment/applicants/applicant_records/page.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
