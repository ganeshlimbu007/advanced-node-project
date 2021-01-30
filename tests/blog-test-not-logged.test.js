const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
})

afterEach(async () => {
    await page.close();
});

describe('User is not logged in', async () => {
    test('User cannot create blog posts', async () => {
        const result = await page.evaluate(() => {
            return fetch('/api/blogs', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: 'title', content: 'Content' })
            }).then(res => res.json())
        })

        expect(result).toEqual({ error: 'You must log in!' });
    });

    test('User cannot create blog posts', async () => {
        const result = await page.evaluate(() => {
            return fetch('/api/blogs', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
        })

        expect(result).toEqual({ error: 'You must log in!' });
    });
})