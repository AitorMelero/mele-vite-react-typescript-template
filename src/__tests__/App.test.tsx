import { describe, expect, test } from 'vitest';

import { render } from '@testing-library/react';

import App from '../App';

describe('App', () => {
    test('should render the default component', () => {
        render(<App />);

        expect(true).toBeTruthy();
    });
});
