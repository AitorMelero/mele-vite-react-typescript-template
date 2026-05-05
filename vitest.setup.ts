import { afterEach } from 'vitest';

import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup(); // clean DOM after each test
});
