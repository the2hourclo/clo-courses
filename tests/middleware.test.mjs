import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

// Import the deployed middleware source without changing the repository's module type.
const source = readFileSync(new URL('../middleware.js', import.meta.url), 'utf8');
const { default: middleware } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const origin = 'https://course.chiefleverageofficers.com';
// Any fetch a test didn't mock fails the suite, so no test can reach production.
const originalFetch = async (url) => { throw new Error(`unmocked fetch: ${url}`); };
globalThis.fetch = originalFetch;

function request(path, cookie) {
  return new Request(origin + path, {
    headers: cookie ? { cookie } : {}
  });
}

function assertSignIn(response, path) {
  assert.equal(response.status, 302);
  const target = new URL(response.headers.get('location'));
  assert.equal(target.origin + target.pathname, origin + '/clo-course/sign-in.html');
  assert.equal(target.searchParams.get('next'), path);
}

test('both setup doors are open to signed-out buyers with any query', async () => {
  for (const path of [
    '/clo-course/get-access-aieb.html?claim=X',
    '/clo-course/get-access-aieb.html?wizard=1',
    '/clo-course/get-access-aieb.html?activate=CODE',
    '/clo-course/get-access-aieb.html',
    '/clo-course/get-access.html?claim=X',
    '/clo-course/get-access.html?wizard=1',
    '/clo-course/get-access.html?activate=CODE',
    '/clo-course/get-access.html'
  ]) {
    assert.equal(await middleware(request(path)), undefined, path);
  }
});

test('checkpoint, board and course entry still send signed-out visitors to sign-in', async () => {
  for (const path of [
    '/clo-course/checkpoint-map.html?step=1',
    '/clo-course/ai-employee-board.html',
    '/clo-course/',
    '/clo-course/index.html',
    '/clo-course'
  ]) {
    const next = ['/clo-course/', '/clo-course/index.html', '/clo-course'].includes(path)
      ? '/clo-course/ai-employee-board.html' : path;
    assertSignIn(await middleware(request(path)), next);
  }
});

test('invalid session cookies still ask the API and are rejected', async () => {
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.chiefleverageofficers.com/course-progress');
    assert.equal(options.headers.cookie, 'clo_course_session=invalid');
    assert.equal(options.cache, 'no-store');
    return Response.json({ signed_in: false }, { status: 200 });
  };
  try {
    assertSignIn(await middleware(request('/clo-course/checkpoint-first-skill.html', 'clo_course_session=invalid')),
      '/clo-course/checkpoint-first-skill.html');
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('valid sessions still pass and course entry still routes to the board', async () => {
  globalThis.fetch = async () => Response.json({ signed_in: true }, { status: 200 });
  try {
    assert.equal(await middleware(request('/clo-course/checkpoint-map.html', 'clo_course_session=valid')), undefined);
    const response = await middleware(request('/clo-course/', 'clo_course_session=valid'));
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), origin + '/clo-course/ai-employee-board.html');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('assets, sign-in and activation links retain their open behavior', async () => {
  for (const path of [
    '/clo-course/shell.css',
    '/clo-course/progress.js?v=5',
    '/clo-course/kit/tile-memory.png',
    '/clo-course/sign-in.html?next=%2Fclo-course%2Fcheckpoint-map.html',
    '/clo-course/checkpoint-map.html?activate=CODE'
  ]) {
    assert.equal(await middleware(request(path)), undefined, path);
  }
});

test('near misses of the door paths still hit the wall when signed out', async () => {
  for (const path of [
    '/clo-course/get-access-aieb.html/',
    '/clo-course/GET-ACCESS-AIEB.HTML',
    '/clo-course/get-access-aieb.htmlx',
    '/clo-course/get-access-aieb.html.bak',
    '/clo-course/get-access-aieb%2Ehtml'
  ]) {
    assertSignIn(await middleware(request(path)), path);
  }
});
