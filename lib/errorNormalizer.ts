import { AppError } from '@/components/AppError';
import * as z from 'zod';

export const errNormalize = (err: Error): AppError => {
    if (err instanceof AppError) return err;

    if (err instanceof z.ZodError) {
        console.error('Zod Error Issues:', JSON.stringify(err.issues, null, 2))
        return new AppError(
            'Validation failed',
            400,
            400
        );
    }

    // Fallback for any other Error
    console.error('Unexpected error:', err)
    return new AppError(
        err.message ?? 'An unexpected error occurred',
        500,
        500
    );
}